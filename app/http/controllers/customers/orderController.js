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
         
                order.save().then((result)=>{
                    Order.populate(result, {path:'customerId'}, (err, placedOrder)=>{
                        req.flash('success', 'Order Placed Successfully')
                        delete req.session.cart;
        
                        const eventEmitter = req.app.get('eventEmitter');
                        eventEmitter.emit('orderPlaced', placedOrder, (res)=>{
                            console.log('orderPlaced');
                        });
        
                        return res.redirect('/customer/orders');
                    });
                }).catch(err=>{
                    console.log(err);
                    req.flash('error', 'Something Went Wrong')
                    return res.redirect('/cart')  
                })
                
        },
        
         
        async index(req, res){
           try{
            const orders = await Order.find({CustomerId:req.user._id}, null, {sort:{'createdAt':-1}})
            console.log(orders);
            res.header('Cache-Control', 'no-cache, privatem no-store, must-revalidate, max-stale = 0, post-check = 0, pre-check = 0')
            res.render('customers/orders', {orders:orders, moment:moment});
           }catch(error){
                console.log(error);
           }
        },
        async show(req, res){
            const order = await Order.findById(req.params.id);
            if(req.user._id.toString() === order.CustomerId.toString()){
                return res.render('customers/singleOrder', {order});
            }
            return res.redirect('/');
        }
    }
}
module.exports = orderController;