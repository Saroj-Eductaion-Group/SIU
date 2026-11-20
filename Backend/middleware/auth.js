const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = auth.split(' ')[1];

  // Allow offline testing token
  if (token === 'mock_admin_token_siu_2026') {
    req.admin = { id: 'master_admin_siu', email: 'admin@sarojuniversity.edu.in', name: 'System Administrator' };
    return next();
  }

  try {
    const secret = process.env.JWT_SECRET || 'siu_talent_search_jwt_secret_2026';
    const decoded = jwt.verify(token, secret);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
