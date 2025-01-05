const express = require('express');
const jwt = require('jsonwebtoken');
const Secret = require('../models/Secret');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

if (!process.env.SECRET_ENCRYPTION_KEY) {
  throw new Error('SECRET_ENCRYPTION_KEY is not defined in environment variables');
}


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }
    req.user = user;
    next();
  });
};

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.SECRET_ENCRYPTION_KEY, 'salt', 32);
const iv = crypto.randomBytes(16);

const encryptContent = (content) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encryptedContent: encrypted, iv: iv.toString('hex') };
};

const decryptContent = (encryptedContent, ivHex) => {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encryptedContent, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, content } = req.body;
    const { encryptedContent, iv } = encryptContent(content);

    const secret = new Secret({
      user: req.user.userId,
      name,
      content: encryptedContent,
      iv,
    });

    await secret.save();
    res.status(201).json({ message: 'Secret stored successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store secret', details: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const secrets = await Secret.find({ user: req.user.userId }).select('name');
    res.json(secrets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch secrets', details: error.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const secret = await Secret.findOne({ _id: req.params.id, user: req.user.userId });

    if (!secret) {
      return res.status(404).json({ error: 'Secret not found' });
    }

    const decryptedContent = decryptContent(secret.content, secret.iv);
    res.json({ name: secret.name, content: decryptedContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch secret', details: error.message });
  }
});

module.exports = router;
