import qs from 'qs';
import tool from '../src/utils/tool'
import * as data from './data.js';

const { groupDataLevel1, groupDataLevel2, groupDataLevel3 } = data;
const groupData = {
  data: [...groupDataLevel1.data, ...groupDataLevel2.data, ...groupDataLevel3.data],
  page: {
    total: 60,
    current: 1,
  }
};
groupData.data.forEach((item, index) => {  // id重新排序
  item.id = index + 1;
});
module.exports = {
  'GET /api/userGroup/queryList'(req, res) {
    res.json({
      success: true,
      data: groupData.data,
      page: {
        total: groupData.data.length,
      },
    });
  },
  'GET /api/userGroup/detail'(req, res) {
    const id = parseInt(qs.parse(req.query).id);
    const index = tool.getIndex(id, groupData.data);
    res.json({
      success: true,
      data: [groupData.data[index]],
      page: {
        total: 1,
      },
    });
  },
  'GET /api/userGroup/child'(req, res) {
    const id = parseInt(qs.parse(req.query).id);
    groupData.page.current = parseInt(qs.parse(req.query).current);
    const arr = [];
    groupData.data.forEach((item) => {
      if (item.parentNode) {
        if (item.parentNode.id === id) {
          arr.push(item)
        }
      }
    })
    res.json({
      success: true,
      data: arr.slice((groupData.page.current - 1) * 10, groupData.page.current * 10),
      page: {
        total:arr.length,
        current: groupData.page.current,
      },
    });
  },
  'GET /api/userGroup/del'(req, res) {
    const id = qs.parse(req.query).id;
    const idArr = id.split(',');
    let index;
    idArr.forEach((item, i) => {
      index = tool.getIndex(idArr[i], groupData.data);
      groupData.data.splice(index, 1);
    })
    res.json({
      success: true,
    });
  },
  'POST /api/userGroup/changeStatus'(req, res) {
    const id = req.body.id + '';
    const idArr = id.split(',');
    let index;
    idArr.forEach((item, i) => {
      index = tool.getIndex(idArr[i], groupData.data);
      groupData.data[index].enabled = qs.parse(req.body).enabled;
    })
    res.json({
      success: true,
    })
  },
  'POST /api/userGroup/add'(req, res) {
    const id = groupData.data[groupData.data.length -1 ].id + 1;
    const parentId = !req.body.parentId ? null : parseInt(req.body.parentId);
    let parentNode = null;
    if (parentId !== null) {
      groupData.data.forEach((item, index) => {
        if (item.id === parentId) {
          parentNode = item;
          return;
        }
      });
    }
    const newData = {
      id: id,
      name: req.body.name,
      code: req.body.code,
      enabled: req.body.enabled,
      type: req.body.type,
      parentNode: parentNode,
      remark: req.body.remark,
    }
    groupData.data.push(newData);
     res.json({
      success: true,
      data: newData,
    })
  },
  'POST /api/userGroup/update'(req, res) {
    const index = tool.getIndex(req.body.id, groupData.data);
    groupData.data[index] = Object.assign(groupData.data[index], {
      name: req.body.name,
      code: req.body.code,
      enabled: req.body.enabled,
      type: req.body.type,
      remark: req.body.remark,
    })
    res.json({
      success: true,
      data: groupData.data[index],
      page: {
        total: groupData.data.length,
        current: groupData.page.current,
      }
    });
  }
};

