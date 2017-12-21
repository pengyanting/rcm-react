import tool from '../src/utils/tool';
import * as data from './data';

const { userData } = data;
const qs = require('qs');

module.exports = {
  'GET /api/users'(req, res) {
    userData.page.current = parseInt(qs.parse(req.query).current);
    res.json({
      success: true,
      data: userData.data.slice((userData.page.current - 1) * 10, userData.page.current * 10),
      page: {
        total: userData.data.length,
        current: userData.page.current,
      },
    });
  },
  'POST /api/users/add'(req, res) {
    userData.data.push({
      id: userData.data.length + 1,
      name: req.body.userName,
      age: req.body.age,
      address: req.body.address,
    });
    res.json({
      success: true,
      data: userData.data,
      page: {
        total: userData.data.length + 1,
        current: userData.page.current,
      },
    });
  },
  'POST /api/users/update'(req, res) {
    const index = tool.getIndex(req.body.id, userData.data);
    userData.data[index] = {
      id: req.body.id,
      name: req.body.userName,
      age: req.body.age,
      address: req.body.address,
    };
    res.json({
      success: true,
      data: userData.data,
      page: {
        total: userData.data.length,
        current: userData.page.current,
      }
    });
  },
  'GET /api/users/del'(req, res) {
    const id = qs.parse(req.query).id;
    const index = tool.getIndex(id, userData.data)
    userData.data.splice(index, 1);
    res.json({
      success: true,
      userData: userData.data,
      page: {
        total: userData.data.length,
        current: userData.page.current,
      }
    });
  }
};
