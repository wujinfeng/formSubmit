//路由主入口
module.exports = function (app) {

    app.use('/contact', require('./appEvent'));                //app事件路由

    // not found 404 page
    app.use(function (req, res, next) {
        if (!res.headersSent) {
            next(new Error('请输入正确的路径'));
        }
    });
};
