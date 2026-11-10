const router = require('express').Router();
const jwt = require('jsonwebtoken');
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ message: 'Incorrect admin email or password' });
  const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, email, message: 'Login successful' });
});
module.exports = router;
