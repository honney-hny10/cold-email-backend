import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Email } from '../entities/Email';
import { MoreThan } from 'typeorm';  // <-- import MoreThan here

const router = Router();
const userRepository = AppDataSource.getRepository(User);
const emailRepository = AppDataSource.getRepository(Email);

const EMAIL_LIMIT_PER_HOUR = 5;

router.post('/send', async (req, res) => {
  const { userEmail, subject, body } = req.body;

  if (!userEmail || !subject || !body) {
    return res.status(400).json({ message: 'userEmail, subject and body are required' });
  }

  try {
    const user = await userRepository.findOneBy({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const emailCount = await emailRepository.count({
      where: {
        user: { id: user.id },
        sentAt: MoreThan(oneHourAgo),   // <-- Use MoreThan directly
      },
    });

    if (emailCount >= EMAIL_LIMIT_PER_HOUR) {
      return res.status(429).json({ message: 'Email limit exceeded. Please try later.' });
    }

    const email = emailRepository.create({
      subject,
      body,
      user,
    });

    await emailRepository.save(email);

    return res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
