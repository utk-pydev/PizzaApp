const { reset } = require('nodemon');
const Order = require('../../../models/order')
const moment = require('moment')
function orderController(){
    return{
       async store(req, res){
            const{phone, address} = req.body;
          
            if(!phone || !address){
                req.flash('error', 'All fields are required');
                return res.redirect('/cart')   
            }
            const order = new Order({
                CustomerId:req.user._id,
                items:req.session.cart.items,
                phone,
                address
            })
            console.log(order);
            try{
                const Save = await order.save();
                
                req.flash('success', 'Order Placed Successfully')
                delete req.session.cart;
                return res.redirect('/customer/orders');

            }
            catch(error){
                console.log(err);
                req.flash('error', 'Something Went Wrong')
                return res.redirect('/cart')  
            }
        },
        
         
        async index(req, res){
           try{
            const orders = await Order.find({CustomerId:req.user._id}, null, {sort:{'createdAt':-1}})
            console.log(orders);
         // res.render('customers/orders');
            res.render('customers/orders', {orders:orders, moment:moment});
           }catch(error){
                console.log(error);
           }
        }
        
    }
}
module.exports = orderController;