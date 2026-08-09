
const jwt = require('jsonwebtoken');
const token = process.env.MY_TOKEN;
const secret = process.env.SECRET;
console.log('Token length:', token.length);
console.log('Secret:', secret);
try {
  const decoded = jwt.verify(token, secret);
  console.log('Token is valid:', decoded);
} catch (err) {
  console.error('Token verification failed:', err.message);
}

