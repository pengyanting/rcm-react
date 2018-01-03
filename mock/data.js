import mockjs from 'mockjs';

export const groupDataLevel1 = mockjs.mock({
  'data|5': [{
    'id|+1': 1,
    name: `@cword(${4,6})机构`,
    code: `@string(${'lower', 5})_@character(${'number'})`,
    'type|1': ['ORGANIZATION', 'USERGROUP', 'POSITION'],
    enabled: '@boolean',
    'parentNode': null,
    remark: `@paragraph(${1})`,
  }],
  page: {
    total: 33,
    current: 1,
  },
});
export const groupDataLevel2 = mockjs.mock({
  'data|30': [{
    'id|+1': 1,
    name: `@cword(${4,6})机构`,
    code: `@string(${'lower', 5})_@character(${'number'})`,
    'type|1': ['ORGANIZATION', 'USERGROUP', 'POSITION'],
    enabled: '@boolean',
    'parentNode|1': groupDataLevel1.data,
    remark: `@paragraph(${1})`,
  }],
  page: {
    total: 33,
    current: 1,
  },
});
export const groupDataLevel3 = mockjs.mock({
  'data|15': [{
    'id|+1': 1,
    name: `@cword(${4,6})机构`,
    code: `@string(${'lower', 5})_@character(${'number'})`,
    'type|1': ['ORGANIZATION', 'USERGROUP', 'POSITION'],
    enabled: '@boolean',
    'parentNode|1': groupDataLevel2.data,
    remark: `@paragraph(${1})`,
  }],
  page: {
    total: 33,
    current: 1,
  },
});
export const userData = mockjs.mock({
    'data|15': [{
      'id|+1': 1,
      loginName: '@name',
      realName: '@cname',
      gender: `@character(${'FMN'})`,
      'mobileNumber|11': `@character(${'number'})`,
      enabled: '@boolean',
      birthday: '@date',
      email: '@email',
      'password|6': `@character(${'number'})`,
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