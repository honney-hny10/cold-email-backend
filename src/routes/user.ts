// src/routes/user.ts
import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.post('/register', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = userRepository.create({ email });
    await userRepository.save(user);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
