
const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderControllers');

const admin = require('../app/http/middlewares/admin');
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const statusController = require('../app/http/controllers/admin/statusController');
function initRoutes(app){

    app.get('/', homeController().index);   
    app.get('/cart', cartController().index);
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)    
    app.post('/update-cart', cartController().update)    
    app.post('/logout', authController().logout)
    ///Customer Routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index);
    ///Admin Routes
    //app.get('/admin/order', auth, AdminOrderController().index);
    app.get('/admin/order', admin, AdminOrderController().index);
    app.post('/admin/order/status', admin, statusController().update);
    app.get('/:id', auth, orderController().show);
    //admin/order/status
}

module.exports = initRoutes