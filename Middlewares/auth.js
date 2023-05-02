const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET);
}

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
}

const refreshTokens = async (oldRefreshToken) => {
  try {
    const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

module.exports = { login, refreshTokens };
