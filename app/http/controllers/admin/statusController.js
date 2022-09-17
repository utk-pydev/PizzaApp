const Order = require('../../../models/order')
function statusController(){
    return {
        update(req, res){
            Order.updateOne({_id:req.body.orderId}, {status:req.body.status}, (err, data)=>{
                if(err)
                    return res.redirect('/admin/order')
                console.log('I am in Update');
                const eventEmitter = req.app.get('eventEmitter');
                console.log(eventEmitter);
                eventEmitter.emit('orderUpdated', {id:req.body.orderId, status:req.body.status});
                return res.redirect('/admin/order')
            })
        }
    }
}
module.exports = statusController