// create min-express app
import exp from 'express';
import User from '../models/UserModel.js';

export const userApp = exp.Router();

// Create new user
userApp.post('/users', async (req, res) => {
    
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: savedUser
        });
});

// Read all users
userApp.get('/users', async (req, res) => {
    try {
        const users = await User.find({ status: true });
        res.status(200).json({
            message: "Users retrieved successfully",
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
});

// Read user by ID
userApp.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, status: true });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User retrieved successfully",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
});

// SOFT Delete user by ID
userApp.delete('/users/:id', async (req, res) => {
    try {
        const softDeletedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { status: false },
            { new: true } 
        );

        if (!softDeletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User soft-deleted successfully",
            user: softDeletedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user status",
            error: error.message
        });
    }
});

//activate the user( change the status to true)
userApp.patch('/users/:id', async (req, res) => {
    try {
        const softDeletedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { status: true},
            { new: true } 
        );

        if (!softDeletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User activated successfully",
            user: softDeletedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user status",
            error: error.message
        });
    }
});
//put (complete change) and patch(partial change)


//update user by id