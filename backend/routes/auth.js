import { Router } from 'express';
import userSchema from '../models/userModel.js';

const router = Router();

router.post('/login', (req, res) => {
    const { error } = userSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if(!user || user.password !== password){
        return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }

    global.user = user; 

    res.status(200).json({
        success: true,
        message: 'Login successful',
        user: user
    });
});

router.post('/register', (req, res) => {
    const { error } = userSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if(user){
        return res.status(409).json({
            success: false,
            message: 'Username already exists'
        });
    }

    const newUser = { username, password };
    users.push(newUser);

    const response = {
        success: true,
        message: 'User created successfully',
        user: newUser
    }

    res.json(response);
});

router.post('/logout', (req, res) => {
    global.user = null;
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

const users = [
    {
        username: 'jesper',
        password: 'arsenal123',
    },
    {
        username: 'johnny',
        password: 'legobitar123'
    }
];

export default router;