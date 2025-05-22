const { AppDataSource } = require('../config/database');
const { User } = require('../entities/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const userRepository = AppDataSource.getRepository(User);

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      username,
      password: hashedPassword,
      role: 'Employee',
    });

    await userRepository.save(user);
    const token = generateToken(user);
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error during signup' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userRepository.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
};

module.exports = { signup, login };