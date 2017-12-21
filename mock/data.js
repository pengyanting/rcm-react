import mockjs from 'mockjs';

export const groupData = mockjs.mock({
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

export const userData = mockjs.mock({
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

  export const systemData = mockjs.mock({
    data: [{
      code: "USER_CENTER",
      enabled: 'true',
      id: 1,
      name: "用户中心",
      remark: null,
    }, {
      code: "CRM",
      enabled: 'true',
      id: 2,
      name: "CRM",
      remark: null,
    }, {
      code: "PCS",
      enabled: 'true',
      id: 3,
      name: "PCS",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 4,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 5,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 6,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 7,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 8,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 9,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 10,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 11,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 12,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 13,
      name: "实名认证",
      remark: null,
    }, {
      code: "LAKALA_REALNAMEAUTH",
      enabled: 'false',
      id: 14,
      name: "实名认证",
      remark: null,
    }],
    page: {
      total: 15,
      current: 1,
    },
  });