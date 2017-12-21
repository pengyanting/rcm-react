import tool from '../src/utils/tool';
import * as data from './data';
import { userData } from './data';

const { systemData } = data;
const qs = require('qs');

module.exports = {
    'GET /api/systemList'(req, res) {
        systemData.page.current = parseInt(qs.parse(req.query).current);
        const name = qs.parse(req.query).name;
        const code = qs.parse(req.query).code;
        const conditions = {
          name: name,
          code: code
        }
        let list = tool.doFilter(systemData.data, conditions);
        const total = list.length;
        list = list.slice((systemData.page.current - 1) * 10, systemData.page.current * 10)
        res.json({
            success: true,
            data: list,
            page: {
                total: total,
                current: systemData.page.current,
            },
        });
    },
    'GET /api/system/del'(req, res) {
        const id = qs.parse(req.query).id;
        const idArr = id.split(',');
        const list = systemData.data;
        let index;
        idArr.forEach((item, i) => {
            index = tool.getIndex(idArr[i], systemData.data);
            systemData.data.splice(index, 1);
        })
        res.json({
            success: true
        })
    },
    'POST /api/system/add'(req, res) {
        const id = systemData.data[systemData.data.length - 1].id + 1;
        systemData.data.push(Object.assign(req.body, { id: id }));
        res.json({
            success: true,
            data: Object.assign(req.body, { id: id })
        })
    },
    'POST /api/system/changeStatus'(req, res) {
        const id = req.body.id;
        const idArr = id.split(',');
        const list = systemData.data;
        let index;
        idArr.forEach((item, i) => {
            index = tool.getIndex(idArr[i], systemData.data);
            systemData.data[index].enabled = req.body.enabled;
        })
        res.json({
            success: true
        })
    }
};