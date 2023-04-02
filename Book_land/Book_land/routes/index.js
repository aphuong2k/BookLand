const ProfileRouter = require('./user/profile');
const UserRouter = require('./user/auth');
const HomeRouter = require('./user/user');
const Admin_Author_Router = require('./admin/admin_author');
const Admin_Category_Router = require('./admin/admin_category');
const Admin_Genre_Router = require('./admin/admin_genre');
const Admin_Publish_Router = require('./admin/admin_publish');
const Admin_Product_Router = require('./admin/admin_product');
const Admin_Order_Input_Router = require('./admin/admin_order_input');
const Admin_Order_Router = require('./admin/admin_order');
const Admin_Account_Router = require('./admin/admin_account');
const Admin_Statistic_Router = require('./admin/admin_statistic');







function route(app){
    app.use('/admin',Admin_Statistic_Router)
    app.use('/admin',Admin_Account_Router)
    app.use('/admin',Admin_Order_Router)
    app.use('/admin',Admin_Order_Input_Router)
    app.use('/admin',Admin_Product_Router)
    app.use('/admin',Admin_Publish_Router)
    app.use('/admin',Admin_Genre_Router)
    app.use('/admin',Admin_Category_Router)
    app.use('/admin',Admin_Author_Router)
    app.use('/profile',ProfileRouter);
    app.use('/auth',UserRouter);
    app.use('/',HomeRouter);
}
module.exports = route;