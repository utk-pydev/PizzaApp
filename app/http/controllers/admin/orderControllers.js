const order = require("../../../models/order")

const Order = require('../../../models/order')

function AdminOrderController() {
    return {
        index(req, res) {
         
           order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('CustomerId', '-password').exec((err, orders) => {
            //console.log(orders);  
            if(req.xhr) {
                   return res.json(orders)
               } else {
                return res.render('admin/order')
               }
           })
        }
    }
}

module.exports = AdminOrderController