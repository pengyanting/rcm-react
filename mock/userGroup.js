import qs from 'qs';
import tool from '../src/utils/tool'
import * as data from './data.js';

const { groupData } = data;

module.exports = {
  'GET /api/userGroup/query'(req, res) {
    groupData.page.current = parseInt(qs.parse(req.query).current);
    res.json({
      success: true,
      data: groupData.data.slice((groupData.page.current - 1) * 10, groupData.page.current * 10),
      page: {
        total: groupData.data.length,
        current: groupData.page.current,
      },
    });
  },
};
