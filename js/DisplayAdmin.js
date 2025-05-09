import indexedDB from './indexedDb.js';
import { successAlert, RemoveAlert, FailAlert } from './date.js'; 

let OrderstArr = [];
let OrdersProtArr = [];
let UsersArr = [];
var userId;
let changeUserId;
let roleInput=document.getElementById('roleInput');
if (sessionStorage.getItem('LogedUser')) {
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
if (localStorage.getItem('usersData')) {
    UsersArr = JSON.parse(localStorage.getItem('usersData'));
}

async function initialize() {
    const OrdersData = await indexedDB.getItem('Orders');
    const OrdersProData = await indexedDB.getItem('OrdersProducts');
    
    if (OrdersData) {
        OrderstArr = OrdersData;
        DisplayOrders();
    }
  
    
    if (OrdersProData) {
        OrdersProtArr = OrdersProData;  
    }
}

const TableOrdersDis = document.getElementById('TableOrdersDis');
const OrdersContainer = document.getElementById('tOrdersContainer');

// Display Orders 
function DisplayOrders() {
    if (!OrdersContainer) return;
    
    OrdersContainer.innerHTML = '';
   
    
    if (OrderstArr.length === 0) {
        TableOrdersDis.innerHTML = `
            <section class="mt-0 pt-0">
                <div class="d-flex justify-content-center">
                    <img style="max-width:280px;" src="../imgs/Noorders.png" class="w-50" alt="lock">
                </div>
            </section>
        `;
        return;
    }

    OrderstArr.forEach((order) => {
        OrdersContainer.innerHTML += `
            <tr>
                <td>${order.name}</td>
                <td>${order.phone}</td>
                <td>${order.address}</td>
                <td>${order.note}</td>
                <td>${order.TotalPrice}</td>
                <td><span class="badge bg-danger">pending</span></td>
                <td>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <button data-orderId="${order.orderId}" class="btn btn-sm btn-new btn-new1 ShowDetailsBtn">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-new btn-new2 delete-btn DEleteOrder" data-orderId="${order.orderId}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

async function deleteOrder(orderId) {
    try {
        orderId = parseInt(orderId);
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Delete this Order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            OrderstArr = OrderstArr.filter(order => parseInt(order.orderId) !== orderId);
            
            if (OrdersProtArr && OrdersProtArr.length) {
                OrdersProtArr = OrdersProtArr.filter(item => parseInt(item.OrderId) !== orderId);
            }

            await indexedDB.setItem('Orders', OrderstArr);
            if (OrdersProtArr) {
                await indexedDB.setItem('OrdersProducts', OrdersProtArr);
            }

            await initialize();

            await Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success"
            });
        }
    } catch (error) {
        await Swal.fire({
            title: "Error!",
            text: "Failed to delete the order.",
            icon: "error"
        });
    }
}

async function showOrderProducts(orderId) {
    try {
        const orderProducts = OrdersProtArr.filter(item => item.OrderId == orderId);
        
        if (!orderProducts || orderProducts.length === 0) {
            await Swal.fire({
                title: "No Products!",
                text: "No products found for this order.",
                icon: "info"
            });
            return;
        }
        
        const modalBody = document.getElementById('modalProductsBody');
        modalBody.innerHTML = '';
        
        let totalOrderPrice = 0;
        
        orderProducts.forEach((product) => {
            const productTotal = product.EndPrice * product.qty;
            totalOrderPrice += productTotal;
            
            modalBody.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex justify-content-start">
                            <img src="${product.imageCover}" width="60" height="60" class="me-2 rounded">
                        </div>
                    </td>
                    <td>${product.name.split(" ", 2).join(" ")}</td>
                    <td>${product.EndPrice} EGP</td>
                    <td>${product.qty}</td>
                    <td>${productTotal.toFixed(2)} EGP</td>
                </tr>`;
        });
        
        modalBody.innerHTML += `
            <tr class="table-active">
                <td colspan="4" class="text-end fw-bold">Total:</td>
                <td class="fw-bold">${totalOrderPrice.toFixed(2)} EGP</td>
            </tr>`;
        
        // Initialize modal
        const modalElement = document.getElementById('orderProductsModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
    } catch (error) {
        console.error("Error showing order products:", error);
        await Swal.fire({
            title: "Error!",
            text: "Failed to load order details.",
            icon: "error"
        });
    }
}

document.addEventListener('click', async function(e) {
    if (e.target.closest('.DEleteOrder')) {
        const btn = e.target.closest('.DEleteOrder');
        const orderId = btn.dataset.orderid;
        await deleteOrder(orderId);
    }

    if (e.target.closest('.ShowDetailsBtn')) {
        const btn = e.target.closest('.ShowDetailsBtn');
        console.log(btn);
        
        const orderId = btn.dataset.orderid;
        await showOrderProducts(orderId);
        
    }
    if (e.target.closest('.DeleteUserBtn')) {
         const btn = e.target.closest('.DeleteUserBtn');
        const userDelId = Number(btn.dataset.userid);
      
   deleteUser(userDelId);
    }
    if (e.target.closest('.ChangeUserRoleBtn')) {
         const btn = e.target.closest('.ChangeUserRoleBtn');
         changeUserId= Number(btn.dataset.userid);
    }
    if (e.target.id === 'ChangeUserRoleBtn') {
     if (roleInput.value!='') {
        
if (roleInput.value=='customer'||roleInput.value=='admin'||roleInput.value=='seller') {
    changeUserRole(roleInput.value)
    $('#exampleModalToggle2').modal('hide');
}
else{
  
    FailAlert("Fail Process","invalid User Role !!!");
    roleInput.value=''
}


     }
     else{
        FailAlert("you should to choose Role !!!");
        roleInput.value=''
     }
    }
});

// Initialize the application
initialize();



const ContainerTableUserAdmin = document.getElementById('ContainerTableUserAdmin');
const TableUserAdmin = document.getElementById('TableUserAdmin');

// Display Users 
function DisplayUsers() {
    if (!TableUserAdmin) return;
    
    TableUserAdmin.innerHTML = '';
   
    console.log(UsersArr);
    
    if (UsersArr.length === 0) {
        ContainerTableUserAdmin.innerHTML = `
            <section class="mt-0 pt-0">
                <div class="d-flex justify-content-center">
                    <img style="max-width:280px;" src="../imgs/Noorders.png" class="w-50" alt="lock">
                </div>
            </section>
        `;
        return;
    }

    UsersArr.forEach((user) => {
        TableUserAdmin.innerHTML += `
           <tr>
                                <td>${user.name}</td>
                                <td>${user.Email}</td>
                                <td>${user.role}</td>

                               <td>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <button data-userid="${user.userId}" class="btn btn-sm btn-new btn-new1 ChangeUserRoleBtn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                           <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                   <button data-userid="${user.userId}" class="btn btn-sm btn-new btn-new2 delete-btn DeleteUserBtn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
                            </tr>
        `;
    });
}
DisplayUsers();


function deleteUser(id) {
    Swal.fire({
        title: "Are you sure?",
            text: "You won't be able to Delete this User!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
     
            UsersArr = UsersArr.filter(user => user.userId !== id); 
            localStorage.setItem('usersData', JSON.stringify(UsersArr));
            DisplayUsers();
            
            Swal.fire(
                 "Deleted!",
                 "This User has been deleted.",
                 "success"
            );
        }
    });
}






async function changeUserRole(role) {
    const userIndex = UsersArr.findIndex(user => user.userId === changeUserId);
    
    if (userIndex !== -1) {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to update this user's role?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel'
        });

        if (isConfirmed) {
            UsersArr[userIndex].role = role;
            localStorage.setItem('usersData', JSON.stringify(UsersArr));
            console.log(UsersArr);
        
            Swal.fire(
                'Updated!',
                "User's role has been updated.",
                'success'
            );
            roleInput.value=''
            DisplayUsers();
        }
    }
}


















