import qs from 'qs';
import mockjs from 'mockjs';
import tool from '../src/utils/tool'

const data = mockjs.mock({
  'data|33': [{
    'id|+1': 1,
    name: `@cword(${4,6})机构`,
    code: `@string(${'lower', 5})_@character(${'number'})`,
    'type|1': ['ORGANIZATION', 'USERGROUP', 'POSITION'],
    enabled: '@boolean',
    parentId: null,
    remark: `@paragraph(${2})`,
  }],
  page: {
    total: 100,
    current: 1,
  },
});

module.exports = {
  'GET /api/userGroup/query'(req, res) {
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
};
