import axios from 'axios'
import notie from 'notie'
import {initAdmin} from './admin'
import moment from 'moment'
import { io } from "socket.io-client";

let addToCart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res=>{
        console.log(res);
        cartCounter.innerText = res.data.totalQty
        notie.alert({
            type:'success',
            text: "Item added to cart",
          }).show();
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
    })
})

const alertMsg = document.querySelector('#success-alert');

if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();   
    }, 2000)
}


let order = (document.querySelector('#hiddenInput')? document.querySelector('#hiddenInput').value:null);
order = JSON.parse(order)
console.log(order);

let statuses = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector('#hiddenInput');
let time = document.createElement('small');

function updateStatus(order){
    console.log('Hello\n');
    console.log(statuses);
    let stepCompleted = true;
    statuses.forEach((status)=>{
        status.classList.remove('step-completed');
        status.classList.remove('current');
    })

    statuses.forEach((status)=>{
        let dataProp = status.dataset.status;
        console.log(status);
        //console.log(order.updatedAt);
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
               stepCompleted = false;
               time.innerText = moment(order.updatedAt).format('hh:mm A');
               console.log(time);
               status.appendChild(time);
               if(status.nextElementSibling){
                    status.nextElementSibling.classList.add('current');
               }
        }
    });
}
updateStatus(order);
// Socket
let socket = io();
initAdmin(socket);
//Join
if(order){
    socket.emit('join', `order_${order._id}`);
}

socket.on('orderUpdated', (data)=>{
    console.log('I am being emitted');
    const updatedOrder = {...order};
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status = data.status;
    updateStatus(updatedOrder);
})