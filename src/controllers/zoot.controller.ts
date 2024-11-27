import { Request, Response } from 'express';

// Mock data
const users = [{ id: 1, name: 'John Doe' }];

// Get all users
export const getUsers = (req: Request, res: Response): void => {
    res.json(users);
};

// Create a new user
export const createUser = (req: Request, res: Response): void => {
    const { name } = req.body;
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
};