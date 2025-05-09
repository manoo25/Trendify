import indexedDB from './indexedDb.js';
import { successAlert, RemoveAlert, FailAlert } from './date.js'; 
const TableOrdersDis = document.getElementById('TableOrdersDis');
const OrdersContainer = document.getElementById('tOrdersContainer');
const LastOrdersChart = document.getElementById('LastOrdersChart');
const LastOrdersChartContainer = document.getElementById('LastOrdersChartContainer');
const NumOfCustomer = document.getElementById('NumOfCustomer');
const CommentsLength = document.getElementById('CommentsLength');
const TotalsalesDash = document.getElementById('TotalsalesDash');
const NumOfOrdersDash = document.getElementById('NumOfOrdersDash');


let productsArr = JSON.parse(localStorage.getItem('Products')) || [];
let OrderstArr = [];
let OrdersProtArr = [];
let UsersArr = [];
let CommentsArr = [];
var userId;
let changeUserId;
let ChangeOrderId;
let roleInput=document.getElementById('roleInput');
let stateInput=document.getElementById('stateInput');
if (sessionStorage.getItem('LogedUser')) {
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
if (localStorage.getItem('usersData')) {
    UsersArr = JSON.parse(localStorage.getItem('usersData'));
    NumOfCustomer.innerText=UsersArr.filter(x=>x.role=='customer').length;
}
if (localStorage.getItem('Comments')) {
    CommentsArr = JSON.parse(localStorage.getItem('Comments'));
    CommentsLength.innerText=CommentsArr.length;
}

async function initialize() {
    const OrdersData = await indexedDB.getItem('Orders');
    const OrdersProData = await indexedDB.getItem('OrdersProducts');
    
    if (OrdersData) {
        OrderstArr = OrdersData;
        console.log(OrderstArr);
        
TotalsalesDash.innerText=OrderstArr.reduce((sum, order) => sum + order.TotalPrice, 0);
NumOfOrdersDash.innerText=OrderstArr.length;

        DisplayOrders();
        DisplayLastOrders();
    }
  
    
    if (OrdersProData) {
        OrdersProtArr = OrdersProData;  
    }
}



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
  let image='../imgs/user.png';



  let color;
    switch (order.state) {
        case 'Pending':
             color='bg-warning'
           
            break;
        case 'inProgress':
            color='bg-secondary'
            break;
        case 'Done':
             color='bg-success'
           
            break;
        case 'Cancel':
             color='bg-danger'
           
            break;
     
        
     }

let user= UsersArr.filter(x=>x.userId===order.userId)[0]

if(user.img){
    image=user.img
}

        OrdersContainer.innerHTML += `
            <tr>
                <td>
                      <div class="d-flex align-items-center">
                        <img
                          src="${image}"
                          class="customer-img"
                          alt=""
                        />
                        ${order.name}
                      </div>
                    </td>
                <td>${order.phone}</td>
                <td>${order.address}</td>
                <td>${order.note}</td>
                <td>${order.TotalPrice}</td>
                <td><span class="badge ${color}">${order.state}</span></td>
                <td>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <button data-orderId="${order.orderId}" class="btn btn-sm btn-new btn-new1 ShowDetailsBtn">
                            <i class="fas fa-eye"></i>
                        </button>
                          <button data-orderId="${order.orderId}" class="btn btn-sm btn-new btn-new3 ChangeOrderStateBtnTable" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">
                           <i class="fa-solid fa-pen-to-square"></i>
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
function DisplayLastOrders() {
   
    
    LastOrdersChart.innerHTML = '';
   
    
    if (OrderstArr.length === 0) {
        LastOrdersChartContainer.innerHTML = `
           
        `;
        return;
    }
    OrderstArr.slice(-4).forEach((order) => {

        let image='../imgs/user.png';

         let color;
    switch (order.state) {
        case 'Pending':
             color='bg-warning'
           
            break;
        case 'inProgress':
            color='bg-secondary'
            break;
        case 'Done':
             color='bg-success'
           
            break;
        case 'Cancel':
             color='bg-danger'
           
            break;
     
        
     }
let user= UsersArr.filter(x=>x.userId===order.userId)[0]

if(user.img){
    image=user.img
}
        LastOrdersChart.innerHTML += `

             <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <img
                          src="${image}"
                          class="customer-img"
                          alt=""
                        />
                        ${order.name}
                      </div>
                    </td>
                    <td>${order.phone}</td>
                    <td>${order.address}</td>
                    <td>${order.TotalPrice}</td>
                   <td><span class="badge ${color}">${order.state}</span></td>
                    <td>${order.Date}</td>
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


    if (e.target.closest('.ChangeOrderStateBtnTable')) {
         const btn = e.target.closest('.ChangeOrderStateBtnTable');
         ChangeOrderId= Number(btn.dataset.orderid);
         console.log(btn);
         
    }


    if (e.target.id === 'ChangeOrderStateBtn') {
     if (stateInput.value!='') {
        
if (stateInput.value=='Pending'||stateInput.value=='inProgress'||stateInput.value=='Done') {
    changeOrderState(stateInput.value,ChangeOrderId)
    $('#exampleModalToggle3').modal('hide');
}
else{
  
    FailAlert("Fail Process","invalid Order State !!!");
    stateInput.value=''
}


     }
     else{
        FailAlert("you should to choose State !!!");
        roleInput.value=''
     }
    }




    if (e.target.closest('.DeleteProAdmin1')) {
        const btn = e.target.closest('.DeleteProAdmin1');
     const  ProId=btn.dataset.proid;
        deleteProduct(ProId);
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

         let image='../imgs/user.png';

let userImg= user.img;

if(userImg){
    image=userImg
}
        TableUserAdmin.innerHTML += `
           <tr>
                                <td>
                      <div class="d-flex align-items-center">
                        <img
                          src="${image}"
                          class="customer-img"
                          alt=""
                        />
                        ${user.name}
                      </div>
                    </td>
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

// Change Order State 
async function changeOrderState(state,id) {
    console.log(state,id);
    
    const orderIndex = OrderstArr.findIndex(order => order.orderId === id);
    console.log(orderIndex);
    
    if (orderIndex !== -1) {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to update this Order state?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel'
        });

        if (isConfirmed) {
            OrderstArr[orderIndex].state = state;
       await  indexedDB.setItem('Orders', OrderstArr);
          initialize();
            Swal.fire(
                'Updated!',
                "Order state has been updated.",
                'success'
            );
            stateInput.value=''
          
        }
    }
}






function displayProduct() {
    const tableBody = $("#ProductContainerAdmin");
    tableBody.empty();
  
    productsArr.forEach((product, i) => {
      tableBody.append(`
        <tr>
          <td><img src="${product.imageCover}" alt="product" style="width: 50px;" /></td>
          <td>${product.name.split(" ",2).join(" ")}</td>
          <td>${product.category}</td>
          <td>${product.subcategory}</td>
          <td>${product.EndPrice}</td>
          <td>
           <div class="d-flex gap-2 justify-content-center">
            <a href="./productdetails.html?id=${product.id}" class="btn btn-sm btn-new btn-new1 m-1"><i class="fas fa-eye" ></i></a>
            
            <button class="btn btn-sm btn-new btn-new2 DeleteProAdmin1" data-proid="${product.id}"><i class="fas fa-trash"></i></button>
           </div>
          </td>
        </tr>
      `);
    });
  }
  displayProduct();


  async function deleteProduct(PId) {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to Delete this Product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
  
    if (isConfirmed) {
    productsArr=JSON.parse(localStorage.getItem("Products"));
    productsArr=productsArr.filter(x=>x.id!==PId);
    localStorage.setItem("Products",JSON.stringify(productsArr));      
      displayProduct();
      
      // Show success message
      Swal.fire(
        'Deleted!',
        'Your product has been deleted.',
        'success'
      );
    }
  }


// search in useres with email or name

document.getElementById("searchInput").addEventListener('input',function(){
    var input=this.value.toLowerCase();
    var rows=document.querySelectorAll('#TableUserAdmin tr');

    rows.forEach(function(row){
        var name = row.querySelector('td div').textContent.toLowerCase();
        var email=row.cells[1]?.textContent.toLowerCase();
        if(name.includes(input) || email.includes(input)){
            row.style.display='';
        }else{
            row.style.display='none';
        }

    })
})



// search in Products with  name or sub Gategory
document.getElementById("searchInput2").addEventListener('input', function () {
        var input = this.value.toLowerCase();
        var rows = document.querySelectorAll('#ProductContainerAdmin tr');

        rows.forEach(function (row) {
            var name = row.cells[1]?.textContent.toLowerCase();
            var subCategory = row.cells[3]?.textContent.toLowerCase();

            if (name.includes(input) || subCategory.includes(input)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });





