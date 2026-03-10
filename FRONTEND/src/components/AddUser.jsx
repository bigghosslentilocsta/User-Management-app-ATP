import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const API_URL = 'http://localhost:5000/user-api/users';

function AddUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        mobileNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    // Validate form data on client side
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.trim().length < 4) {
            newErrors.name = 'Name must be at least 4 characters';
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        }

        if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
            newErrors.mobileNumber = 'Mobile number must be at least 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const onUserCreate = async (e) => {
        e.preventDefault();
        setApiError('');

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const userData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                dob: formData.dob,
                mobileNumber: parseInt(formData.mobileNumber, 10)
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Failed to create user');
            }

            console.log('User created successfully:', data);

            // Reset form
            setFormData({
                name: '',
                email: '',
                dob: '',
                mobileNumber: ''
            });
            setErrors({});

            // Navigate to UserList after successful creation
            navigate('/UserList');
        } catch (err) {
            setApiError(err.message || 'An error occurred while creating the user');
            console.error('Error creating user:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className='w-full max-w-md'>
                <h1 className='text-4xl font-bold text-center mb-10 text-gray-800'>ADD NEW USER</h1>

                {apiError && (
                    <div className='bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6'>
                         {apiError}
                    </div>
                )}

                <form onSubmit={onUserCreate} className='space-y-4'>
                    {/* Name Field */}
                    <div>
                        <label className='block text-gray-700 font-semibold mb-2'>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full border-2 p-3 rounded-lg focus:outline-none transition ${
                                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            placeholder='Enter your full name'
                        />
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className='block text-gray-700 font-semibold mb-2'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full border-2 p-3 rounded-lg focus:outline-none transition ${
                                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            placeholder='Enter your email'
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                        <label className='block text-gray-700 font-semibold mb-2'>Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`w-full border-2 p-3 rounded-lg focus:outline-none transition ${
                                errors.dob ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                        />
                        {errors.dob && <p className='text-red-500 text-sm mt-1'>{errors.dob}</p>}
                    </div>

                    {/* Mobile Number Field */}
                    <div>
                        <label className='block text-gray-700 font-semibold mb-2'>Mobile Number</label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className={`w-full border-2 p-3 rounded-lg focus:outline-none transition ${
                                errors.mobileNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            placeholder='Enter your 10-digit mobile number'
                        />
                        {errors.mobileNumber && <p className='text-red-500 text-sm mt-1'>{errors.mobileNumber}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-300 mt-6'
                    >
                        {loading ? '⏳ CREATING...' : ' CREATE USER'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;