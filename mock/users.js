import tool from '../src/utils/tool';
import * as data from './data';

const { userData } = data;
const qs = require('qs');

module.exports = {
  'GET /api/users'(req, res) {
    userData.page.current = parseInt(qs.parse(req.query).current);
    const conditions = {
      loginName: qs.parse(req.query).loginName,
      realName: qs.parse(req.query).realName,
      mobileNumber: qs.parse(req.query).mobileNumber,
    };
    let list = tool.doFilter(userData.data, conditions);
    res.json({
      success: true,
      data: list.slice((userData.page.current - 1) * 10, userData.page.current * 10),
      page: {
        total: list.length,
        current: userData.page.current,
      },
    });
  },
  'POST /api/users/add'(req, res) {
    const id = userData.data[userData.data.length - 1].id + 1;
    userData.data.push(Object.assign(req.body, { id: id }));
    res.json({
      success: true,
      data: Object.assign(req.body, { id: id }),
      page: {
        total: userData.data.length + 1,
        current: userData.page.current,
      },
    });
  },
  'POST /api/users/update'(req, res) {
    const index = tool.getIndex(req.body.id, userData.data);
    userData.data[index].loginName = req.body.loginName;
    userData.data[index].realName = req.body.realName;
    userData.data[index].gender = req.body.gender;
    userData.data[index].enabled = req.body.enabled;
    userData.data[index].birthday = req.body.birthday;
    userData.data[index].email = req.body.email;
    userData.data[index].componeyNumber = req.body.componeyNumber;
    res.json({
      success: true,
      data: userData.data[index],
      page: {
        total: userData.data.length,
        current: userData.page.current,
      }
    });
  },
  'GET /api/users/del'(req, res) {
    const id = qs.parse(req.query).id;
    const idArr = id.split(',');
    let index;
    idArr.forEach((item, i) => {
      index = tool.getIndex(idArr[i], userData.data);
      userData.data.splice(index, 1);
    })
    res.json({
      success: true,
    });
  },
  'POST /api/users/changeStatus'(req, res) {
    const id = req.body.id + '';
    const idArr = id.split(',');
    let index;
    idArr.forEach((item, i) => {
      index = tool.getIndex(idArr[i], userData.data);
      userData.data[index].enabled = qs.parse(req.body).enabled;
    })
    res.json({
      success: true,
    })
  }
};
