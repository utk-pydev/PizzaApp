
const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middlewares/guest')
const orderController = require('../app/http/controllers/customers/orderController');
const auth = require('../app/http/middlewares/auth')
const AdminOrderController = require('../app/http/controllers/admin/orderControllers');
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
    app.get('/admin/order', auth, AdminOrderController().index);
  //  app.get('/admin/orders', auth, AdminOrderController().index);
}

module.exports = initRoutes