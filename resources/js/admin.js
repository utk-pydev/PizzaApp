import axios from "axios";
import moment from "moment";
import notie from 'notie';

function initAdmin(socket){
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = [];
    let markUp;
    axios.get('/admin/order', {
        headers:{
            'X-Requested-With':'XMLHttpRequest'
        }
    }).then(res=>{
        orders = res.data;
        //console.log("Hello123\n");
        //console.log(JSON.stringify(res));
        //console.log("Hello2");
        markUp = generateMarkUp(orders);
        orderTableBody.innerHTML = markUp;

    }).catch(err=>{
        console.log(err);
    })
}

function renderItems(items){
    let parsedItems = Object.values(items);
    return parsedItems.map((menuItem)=>{
        console.log(menuItem);
      ///  console.log(menuItem.items.name);
        return `<p>${menuItem.item.name}-${menuItem.qty} pcs</p>`
    }).join('')
}

function generateMarkUp(orders){
  //  console.log(orders);
    return orders.map(order=>{
        return `
            <tr>
            <td class = "border px-4 py-2 text-green-900">
                <p>${order._id}</p>
                <div>${renderItems(order.items)}</div>
            </td>
            <td class = "border px-4 py-2">${order.CustomerId.name}</td>
            <td class = "border px-4 py-2">${order.address}</td>
            <td class = "border px-4 py-2">
                <div class = "inline-block relative w-64">
                    <form action = "/admin/order/status" method = "POST">
                        <input type = "hidden" name = "orderId" value = "${order._id}"> 
                        <select name = "status" onchange = "this.form.submit()"
                            class = "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value = "order_placed"
                        ${order.status == 'order placed' ? 'selected':''}>
                        Placed</option>
                        <option value = "confirmed" ${order.status === 'confirmed' ? 'selected':''}>
                        Confirmed</option>
                        <option value = "prepared" ${order.status === 'prepared' ? 'selected':''}>
                        Prepared</option>
                        <option value = "delivered" ${order.status === 'delivered' ? 'selected':''}>
                        Delivered</option>
                        <option value = "completed" ${order.status === 'completed' ? 'selected':''}>
                        Completed</option>
                    </select>
                    </form>
                    <div
                        class = "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                      </svg>
                </td>
                <td class = "border px-4 py-2">
                    ${moment(order.createdAt).format('hh:mm A')}
                </td>
            </tr>
        `
    }).join('')
}
const socket = io();
socket.on('orderPlaced', (order)=>{
    notie.alert({
        type:'success',
        text: "New Order",
      }).show();
      orders.unshift(order);
      orderTableBody.innerHTML = '';
      orderTableBody.innerHTML = generateMarkUp(orders);
});

export{ initAdmin}