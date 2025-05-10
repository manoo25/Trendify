import indexedDB from './indexedDb.js';

// ====================== DOM Elements ======================
const TableOrdersDis = document.getElementById('TableOrdersDis');
const OrdersContainer = document.getElementById('tOrdersContainer');
const modalBody = document.getElementById('modalProductsBody');
const profileImage = document.getElementById('profileImage');
const imageInput = document.getElementById('imageUpload');
const stateInput = document.getElementById('stateInput');
const roleInput = document.getElementById('roleInput');

// ====================== Global Variables ======================
let productsArr = JSON.parse(localStorage.getItem('Products')) || [];
let productColors = [];
let images = [];
let productImgSrc = '';
let currentEditIndex = -1;
let userName = sessionStorage.getItem('LogedUser') 
               ? JSON.parse(sessionStorage.getItem('LogedUser')).name 
               : '';
let OrderstArr = [];
let OrdersProtArr = [];
let UsersArr = [];
let ChangeOrderId;
let changeUserId;
let userId;
let barChart, pieChart, lineChart; // Chart instances

// Initialize user data
if (sessionStorage.getItem('LogedUser')) {
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
if (localStorage.getItem('usersData')) {
    UsersArr = JSON.parse(localStorage.getItem('usersData'));
}

// ====================== Initialization ======================
async function initialize() {
    try {
        // Destroy existing charts
        destroyCharts();
        
        // Load data
        const OrdersData = await indexedDB.getItem('Orders');
        const OrdersProData = await indexedDB.getItem('OrdersProducts');
        
        if (OrdersData) {
            OrderstArr = OrdersData;
            DisplayOrders();  
        }
        
        if (OrdersProData) {
            OrdersProtArr = OrdersProData;  
        }
        
        // Initialize other components
        displyProfileImg();
        $('#userName').text(JSON.parse(sessionStorage.getItem('LogedUser')).name);
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

function destroyCharts() {
    if (barChart) barChart.destroy();
    if (pieChart) pieChart.destroy();
    if (lineChart) lineChart.destroy();
}

// ====================== Order Management ======================
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
        let image = '../imgs/user.png';
        let color;
        
        switch (order.state) {
            case 'Pending': color = 'bg-warning'; break;
            case 'inProgress': color = 'bg-secondary'; break;
            case 'Done': color = 'bg-success'; break;
            case 'Cancel': color = 'bg-danger'; break;
        }

        let user = UsersArr.filter(x => x.userId === order.userId)[0];
        if (user && user.img) {
            image = user.img;
        }

        OrdersContainer.innerHTML += `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${image}" class="customer-img" alt="" />
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
                        <button data-orderId="${order.orderId}" class="btn btn-sm btn-new btn-new3 ChangeOrderStateBtnTable" 
                                data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">
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
                let OrdersPlusProtArr = OrdersProtArr.filter(item => parseInt(item.OrderId) == orderId);
                OrdersProtArr = OrdersProtArr.filter(item => parseInt(item.OrderId) !== orderId);
                
                const products = loadProductsFromLocalStorage();
                OrdersPlusProtArr.forEach(orderedItem => {
                    const productIndex = products.findIndex(prod => prod.id === orderedItem.ProId);
                    if (productIndex !== -1) {
                        products[productIndex].quantity += orderedItem.qty;
                        if (products[productIndex].quantity < 0) {
                            products[productIndex].quantity = 0; 
                        }
                    }
                });
                saveProductsToLocalStorage(products);
            }

            await indexedDB.setItem('Orders', OrderstArr);
            if (OrdersProtArr) {
                await indexedDB.setItem('OrdersProducts', OrdersProtArr);
            }

            await Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success"
            });
            await initialize();
        }
    } catch (error) {
        console.error("Delete order error:", error);
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

async function changeOrderState(state, id) {
    const orderIndex = OrderstArr.findIndex(order => order.orderId === id);
    
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
            await indexedDB.setItem('Orders', OrderstArr);
            await initialize();
            
            Swal.fire(
                'Updated!',
                "Order state has been updated.",
                'success'
            );
            stateInput.value = '';
        }
    }
}

// ====================== Product Management ======================
function displayProduct() {
    const tableBody = $("#ordersTable tbody");
    tableBody.empty();

    const sortedProducts = [...productsArr].sort((a, b) => a.quantity - b.quantity);

    sortedProducts.forEach((product, i) => {
        const rowColor = product.quantity < 5 ? "table-danger" : "";

        tableBody.append(`
            <tr class="${rowColor}">
                <td><img src="${product.imageCover}" alt="product" style="width: 50px;" /></td>
                <td>${product.name.split(" ", 2).join(" ")}</td>
                <td>${product.category}</td>
                <td>${product.subcategory}</td>
                <td>${product.quantity}</td>
                <td>${product.EndPrice}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center">
                        <a href="./productdetails.html?id=${product.id}" class="btn btn-sm btn-new btn-new1 m-1">
                            <i class="fas fa-eye"></i>
                        </a>
                        <button class="btn btn-sm btn-new btn-new3" onclick="editProduct(${i})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-new btn-new2" onclick="deleteProduct(${i})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `);
    });

    if ($.fn.DataTable.isDataTable("#ordersTable")) {
        $("#ordersTable").DataTable().destroy();
    }

    $("#ordersTable").DataTable({
        order: [[4, 'asc']],
    });
}

displayProduct();

function addProduct() {
    const product = {
        id: generateProductId(),
        name: $('#productName').val(),
        real_price: Number($('#realPrice').val()),
        Discount: Number($('#productDiscount').val()),
        EndPrice: calculateEndPrice(),
        category: $('#productCategory').val(),
        description: $('#productDescription').val(),
        imageCover: productImgSrc,
        images: images,
        subcategory: $('#productSubCategory').val(),
        ratingsAverage: $('#ratingAverage').val(),
        sellerName: userName,
        quantity: Number($('#productQuantity').val()),
        Colors: productColors,
        Colorscode: productColors,
    };

    productsArr.push(product);
    saveToLocalStorage();
    displayProduct();
    resetForm();
    $('#personalInfoModal').modal('hide');
}

function editProduct(i) {
    currentEditIndex = i;
    const product = productsArr[i];
    
    $('#productName').val(product.name);
    $('#realPrice').val(product.real_price);
    $('#productDiscount').val(product.Discount);
    $('#productCategory').val(product.category);
    $('#productDescription').val(product.description);
    $('#productSubCategory').val(product.subcategory);
    $('#ratingAverage').val(product.ratingsAverage);
    $('#productQuantity').val(product.quantity);
    $('#productColor').val(product.Colors);
    
    productImgSrc = product.imageCover;
    images = product.images;
    productColors = product.Colors;
    
    $('#addProductBtn').text('Update Product');
    $('#personalInfoModal').modal('show');
}

async function deleteProduct(i) {
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
        productsArr.splice(i, 1);
        saveToLocalStorage();
        displayProduct();
        
        Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
        );
    }
}

// ====================== User Management ======================
function displyProfileImg() {
    const user = UsersArr.find(user => user.userId === userId);
    if (user && user.img) {
        profileImage.src = user.img;
    }
}

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            profileImage.src = reader.result;
            const userIndex = UsersArr.findIndex(user => user.userId === userId);
            if (userIndex !== -1) {
                let reply = confirm('Are you sure you want to update your image?');
                if (reply) {
                    UsersArr[userIndex].img = profileImage.src;
                    localStorage.setItem('usersData', JSON.stringify(UsersArr));
                    displyProfileImg();
                }
            }
        });
        reader.readAsDataURL(file);
    }
});

// ====================== Helper Functions ======================
function generateProductId() {
    productsArr = JSON.parse(localStorage.getItem('Products')) || [];
    return `${Math.floor(Math.random() * 1000 * (productsArr.length + 1))}`;
}

function calculateEndPrice() {
    const price = Number($('#realPrice').val());
    const discount = Number($('#productDiscount').val()) || 0;
    return price - discount;
}

function saveToLocalStorage() {
    localStorage.setItem('Products', JSON.stringify(productsArr));
}

function resetForm() {
    $('#productForm')[0].reset();
    productColors = [];
    images = [];
    productImgSrc = '';
    $('#addProductBtn').text('Add Product');
}

function loadProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Products')) || [];
}

function saveProductsToLocalStorage(products) {
    localStorage.setItem('Products', JSON.stringify(products));
}

// ====================== Event Listeners ======================
document.addEventListener('click', async function(e) {
    if (e.target.closest('.DEleteOrder')) {
        const btn = e.target.closest('.DEleteOrder');
        const orderId = btn.dataset.orderid;
        await deleteOrder(orderId);
    }

    if (e.target.closest('.ShowDetailsBtn')) {
        const btn = e.target.closest('.ShowDetailsBtn');
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
        changeUserId = Number(btn.dataset.userid);
    }

    if (e.target.id === 'ChangeUserRoleBtn') {
        if (roleInput.value) {
            if (roleInput.value === 'customer' || roleInput.value === 'admin' || roleInput.value === 'seller') {
                changeUserRole(roleInput.value);
                $('#exampleModalToggle2').modal('hide');
            } else {
                FailAlert("Fail Process", "invalid User Role !!!");
                roleInput.value = '';
            }
        } else {
            FailAlert("you should to choose Role !!!");
            roleInput.value = '';
        }
    }

    if (e.target.closest('.ChangeOrderStateBtnTable')) {
        const btn = e.target.closest('.ChangeOrderStateBtnTable');
        ChangeOrderId = Number(btn.dataset.orderid);   
    }

    if (e.target.id === 'ChangeOrderStateBtn') {
        if (stateInput.value) {
            if (stateInput.value === 'Pending' || stateInput.value === 'inProgress' || 
                stateInput.value === 'Done' || stateInput.value === 'Cancel') {
                changeOrderState(stateInput.value, ChangeOrderId);
                $('#exampleModalToggle3').modal('hide');
            } else {
                FailAlert("Fail Process", "invalid Order State !!!");
                stateInput.value = '';
            }
        } else {
            FailAlert("you should to choose State !!!");
            stateInput.value = '';
        }
    }

    if (e.target.closest('.DeleteProAdmin1')) {
        const btn = e.target.closest('.DeleteProAdmin1');
        const ProId = btn.dataset.proid;
        deleteProduct(ProId);
    }
});

// ====================== Initialize Application ======================
$(document).ready(function() {
    // Apply styles to color swatches
    $(".colored").css({
        border: "2px solid black",
        width: "20px",
        height: "20px",
        margin: "10px",
        cursor: "pointer",
        "border-radius": "50%"
    });

    // Set background colors
    $(".colored").each(function(index) {
        const colors = ["red", "green", "blue"];
        $(this).css("background-color", colors[index]);
    });

    $(".colored").click(function() {
        const value = $(this).css("background-color");
        if (!productColors.includes(value)) {
            productColors.push(value);
            $("#productColor").val(productColors.join(", "));
        }
    });

    // Update the range value
    $('#ratingAverage').on('input', function() {
        $('#rangeValue').text(this.value);
    });

    // Read and display the main image
    $('#productImageCover').on('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                productImgSrc = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Read multiple images
    $('#imageInput').on('change', function() {
        images = [];
        const files = this.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                images.push(e.target.result);
            };
            reader.readAsDataURL(files[i]);
        }
    });

    // Add product event
    $('#addProductBtn').on('click', function() {
        if (currentEditIndex === -1) {
            addProduct();
        } else {
            updateProduct();
        }
    });

    // Initialize the application
    initialize();
});