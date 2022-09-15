import axios from 'axios'
import notie from 'notie'
import {initAdmin} from './admin'
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
initAdmin();