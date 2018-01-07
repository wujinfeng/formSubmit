const express = require('express');
const router = express.Router();
const config = require('../config/config');
const PageModel = require('../models/PageModel');
const logger = config.logger;
// const cors = require('cors');


/**
 * 页面事件
 * 返回格式 字符串 200：成功，其他失败
 */

router.post('/collect', (req, res) => {
    let data = {
        content: req.body.content,
        ip: req.ip
    };
    let page = new PageModel(data);
    if (!page.init()) {
        logger.error('数据初始化出错');
        return res.json({code: 400, msg: '参数有误'});
    }
    page.add((err) => {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err.message});
        }
        res.json({code: 200, msg: ''});
    });
});

// jsonp 跨域请求
/*
router.get('/collect', function (req, res) {
    let page = new PageModel(req);
    if (!page.init()) {
        logger.error('数据初始化出错');
        return res.jsonp({code: 400, msg: '参数有误'});
    }
    page.add(function (err) {
        if (err) {
            logger.error(err);
            return res.jsonp({code: 500, msg: '服务器错误'});
        }
        return res.jsonp({code: 200, msg: 'ok'});
    });
});
*/

// cors 跨域请求
/*router.get('/cors/collect', cors(), function (req, res) {
    let page = new PageModel(req);
    if (!page.init()) {
        logger.error('数据初始化出错');
        return res.json({code: 400, msg: '参数有误'});
    }
    page.add(function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: '服务器错误'});
        }
        return res.json({code: 200, msg: 'ok'});
    });
});*/


module.exports = router;
