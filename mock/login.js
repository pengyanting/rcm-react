import qs from 'qs';
import mockjs from 'mockjs';

module.exports = {
  'POST /api/login'(req, res) {
    const { userName, password } = req.body;
    if (userName === 'admin' && password === '123456') {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  }
}