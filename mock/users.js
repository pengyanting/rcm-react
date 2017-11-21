import tool from '../src/utils/tool';

const qs = require('qs');

// 引入 mock js
const mockjs = require('mockjs');

const data = mockjs.mock({
  'data|100': [{
    'id|+1': 1,
    loginName: '@cname',
    realName: '@name',
    gender: `@character(${'FMN'})`,
    'mobileNumber|11': `@character(${'number'})`,
    enabled:'@boolean',
    birthday: '@date',
    email: '@email',
    'password|6': 'number',
    'componeyNumber|11': `@character(${'number'})`,
  }],
  page: {
    total: 100,
    current: 1,
  },
});

module.exports = {
  'GET /api/users'(req, res) {
    data.page.current = parseInt(qs.parse(req.query).current);
    res.json({
      success: true,
      data: data.data.slice((data.page.current - 1) * 10, data.page.current * 10),
      page: {
        total: data.data.length,
        current: data.page.current,
      },
    });
  },
  'POST /api/users/add'(req, res) {
    data.data.push({
      id: data.data.length + 1,
      name: req.body.userName,
      age: req.body.age,
      address: req.body.address,
    });
    res.json({
      success: true,
      data: data.data,
      page: {
        total: data.data.length + 1,
        current: data.page.current,
      },
    });
  },
  'POST /api/users/update'(req, res) {
    const index = tool.getIndex(req.body.id, data.data);
    data.data[index] = {
      id: req.body.id,
      name: req.body.userName,
      age: req.body.age,
      address: req.body.address,
    };
    res.json({
      success: true,
      data: data.data,
      page: {
        total: data.data.length,
        current: data.page.current,
      }
    });
  },
  'GET /api/users/del'(req, res) {
    const id = qs.parse(req.query).id;
    const index = tool.getIndex(id, data.data)
    data.data.splice(index, 1);
    res.json({
      success: true,
      data: data.data,
      page: {
        total: data.data.length,
        current: data.page.current,
      }
    });
  }
};
