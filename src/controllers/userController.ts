// src/controllers/userController.ts
import { Request, Response } from 'express';
import { getUserById } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user by id' });
  }
};
