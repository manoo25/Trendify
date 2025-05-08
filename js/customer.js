import indexedDB from './indexedDb.js';
import { successAlert, RemoveAlert } from './date.js'; 

let WhishListArr = [];
let FilterWhishListArr = [];
let FilterCartArr = [];
let CartArr = [];
let OrderstArr = [];
let FilterOrderstArr = [];
let OrdersProtArr = [];
var userId;

if (sessionStorage.getItem('LogedUser')) {
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}

async function initialize() {
    const WhishlistData = await indexedDB.getItem('WhishList');
    const OrdersData = await indexedDB.getItem('Orders');
    const OrdersProData = await indexedDB.getItem('OrdersProducts');
    const cartData = await indexedDB.getItem('Cart');
    
    if (cartData) {
        CartArr = cartData;
    }
    
    if (WhishlistData) {
        WhishListArr = WhishlistData;
        DisplayWhishlist();
    }
    
    if (OrdersData) {
        OrderstArr = OrdersData;
        DisplayOrders();
        
    }
    
    if (OrdersProData) {
        OrdersProtArr = OrdersProData;  
    }
}

const WhishlistContainer = document.getElementById('WhishlistContainer');
const TableOrdersDis = document.getElementById('TableOrdersDis');



// Display Whish list 
function DisplayWhishlist() {
  if (!WhishlistContainer) return;
  
  WhishlistContainer.innerHTML = '';
  FilterWhishListArr = WhishListArr.filter(item => item.userId === userId);

  if (FilterWhishListArr.length === 0) {
      WhishlistContainer.innerHTML = `
          <section class="mt-0 pt-0">
              <div class="d-flex justify-content-center">
                  <img style="max-width:280px;" src="../imgs/EmptyWhish.png" class="w-50" alt="lock">
              </div>
              <div class="d-flex flex-column align-items-center mt-0">
                 
              </div>
          </section>
      `;
      return;
  }

  FilterWhishListArr.forEach((product) => {
      let averageDis = Math.round((product.Discount / product.real_price) * 100);
      let existPro = CartArr.some(x => 
          x.userId.toString() === userId.toString() && 
          x.ProId.toString() === product.ProId.toString()
      );
      
      let existWhishlist = WhishListArr.some(x => 
          x.userId.toString() === userId.toString() && 
          x.ProId.toString() === product.ProId.toString()
      );
      
      let disc = averageDis > 0 ? 'd-block' : 'd-none';
      const buttonClass = existPro ? 'fa-check' : 'fa-plus';
      const WhishListClass = existWhishlist ? 'fa-solid' : 'fa-regular';
      
      WhishlistContainer.innerHTML += `
          <div class="contain-item col-lg-3 col-md-6 pb-2">
              <div class="Product" data-id="${product.ProId}">
                  <div class="pic position-relative">
                      <img class="w-100" src="${product.imageCover}" />
                      <span data-product='${JSON.stringify(product)}' 
                            class="${WhishListClass} fa-heart position-absolute heart-icon"
                            style="top: 10px; right: 10px; font-size: 1.5rem; cursor: pointer; z-index: 10;"></span>
                      <span class="discount ${disc}">-${averageDis}%</span>
                  </div>
                  <div class="disc">
                      <h3>${(product.name).split(' ', 2).join(' ')}</h3>
                      <div class="rate d-flex align-items-center gap-1">
                          <span>${product.ratingsAverage}</span>
                          <span class="simi">(+500)</span>
                      </div>
                      <div class="price d-flex justify-content-between align-items-center">
                          <div>
                              ${product.EndPrice} EGP
                              <span class="text-decoration-line-through afterSale">${product.real_price} EGP</span>
                          </div>
                          <button data-product='${JSON.stringify(product)}' 
                                  class="btnAddToCart fa-solid ${buttonClass}"
                                 
                      </div>
                  </div>
              </div>
          </div>
      `;
  });
}

const OrdersContainer = document.getElementById('tOrdersContainer');

// Display Orders 
function DisplayOrders() {
  if (!OrdersContainer) return;
  
  OrdersContainer.innerHTML = '';
  FilterOrderstArr = OrderstArr.filter(item => item.userId === userId);
  

  if (FilterOrderstArr.length === 0) {

    TableOrdersDis.innerHTML = `
          <section class="mt-0 pt-0">
              <div class="d-flex justify-content-center">
                  <img style="max-width:280px;" src="../imgs/Noorders.png" class="w-50" alt="lock">
              </div>
              <div class="d-flex flex-column align-items-center mt-0">
                  
              </div>
          </section>
      `;
      return;
  }

  FilterOrderstArr.forEach((order) => {

     
      
    OrdersContainer.innerHTML += `
         <tr>
                            <td>${order.orderId}</td>
                            <td>${order.TotalPrice}</td>
                         
                            <td><span class="badge bg-danger">pending</span></td>
                            <td >
                                <div class="d-flex  align-items-center justify-content-center gap-2">
                                  
                                       <button   data-orderId="${order.orderId}"  class="btn btn-sm btn-new btn-new1 ShowDetailsBtn"><i class="fas fa-eye"  ></i></button>
    
                                    <button class="btn btn-sm btn-new btn-new2 delete-btn" data-orderId="${order.orderId}"><i class="fas fa-trash"></i></button>
                                  </div>
                               
                            </td>
                        </tr>
      `;
  });


}



async function deleteOrder(orderId) {
    try {
 
        orderId = parseInt(orderId);
        

        if (!confirm("هل أنت متأكد أنك تريد حذف هذا الطلب؟")) return;

   
        OrderstArr = OrderstArr.filter(order => parseInt(order.orderId) != orderId);
        
     
        if (OrdersProtArr && OrdersProtArr.length) {
            OrdersProtArr = OrdersProtArr.filter(item => parseInt(item.OrderId) != orderId);
        }
        
     
        await indexedDB.setItem('Orders', OrderstArr);
        if (OrdersProtArr) {
            await indexedDB.setItem('OrdersProducts', OrdersProtArr);
        }
        

        if (typeof successAlert === 'function') {
            successAlert('تم الحذف', 'تم حذف الطلب بنجاح');
        } else {
            alert('تم حذف الطلب بنجاح');
        }
        

        await initialize();
       
        
    } catch (error) {
        console.error('فشل في حذف الطلب:', error);
        alert('حدث خطأ أثناء الحذف: ' + error.message);
    }
}



async function showOrderProducts(orderId) {
    try {
        const orderProducts = OrdersProtArr.filter(item => item.OrderId == orderId);
        
        if (!orderProducts || orderProducts.length === 0) {
            alert('No products found for this order');
            return;
        }
        
        const modalBody = document.getElementById('modalProductsBody');
        modalBody.innerHTML = '';
        
        let totalOrderPrice = 0;
        
        orderProducts.forEach((product, index) => {
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
        
        const modal = new bootstrap.Modal(document.getElementById('orderProductsModal'));
        modal.show();
        
    } catch (error) {
        console.error('Error showing order products:', error);
        alert('Failed to load order products: ' + error.message);
    }
}












document.addEventListener('click', async function(e) {
    const productElement = e.target.closest('.Product');
    const heartBtn = e.target.closest('.heart-icon, .fa-heart');                          
    const cartBtn = e.target.closest('.btnAddToCart'); 
    
    // معالجة زر القلب (المفضلة)
    if (heartBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!sessionStorage.getItem('LogedUser') || !userId) {
            alert('يجب تسجيل الدخول أو التسجيل أولاً!');
            return;
        }
        await addToWhishList(heartBtn);
        return;
    } 
    
    // معالجة زر السلة
    if (cartBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!sessionStorage.getItem('LogedUser') || !userId) {
            alert('يجب تسجيل الدخول أو التسجيل أولاً!');
            return;
        }
        await addToCart(cartBtn);
        return;
    }
    
    // معالجة النقر على المنتج للانتقال لصفحة التفاصيل
    if (productElement) {
        const id = productElement.dataset.id;
        if (id) {
            window.location.href = `./productdetails.html?id=${id}`;
        }
    }






    if (e.target.closest('.delete-btn')) {
        const btn = e.target.closest('.delete-btn');
      
        
        const orderId = btn.dataset.orderid;
        console.log(orderId);
        
        deleteOrder(orderId);
    }

    if (e.target.closest('.ShowDetailsBtn')) {
        const btn = e.target.closest('.ShowDetailsBtn');
        const orderId = btn.dataset.orderid;
        showOrderProducts(orderId);
    }







});

async function addToCart(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);

        let productCartObj = {
            userId: userId,
            ProId: pro.ProId,
            OrderId: 0,
            id: Math.floor(Math.random() * 1000 * (userId) + 1),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            imageCover: pro.imageCover,
            qty: 1,
            Color: pro.Color,
        };

        let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.ProId);

        if (!existPro) {
            CartArr.push(productCartObj);
            successAlert('تم الإضافة إلى السلة', 'تمت إضافة المنتج إلى السلة بنجاح');
        } 
        else {
            CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.ProId));
            RemoveAlert('تم الحذف من السلة', "تم إزالة المنتج بنجاح");
        }
        
        await indexedDB.setItem('Cart', CartArr);
        DisplayWhishlist(); // إعادة تحميل القائمة لتحديث الأيقونات
    } 
    catch (error) {
        console.error('Error in addToCart:', error);
    }
}

async function addToWhishList(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);
        
        let productArrObj = {
            userId: userId,
            ProId: pro.ProId,
            id: Math.floor(Math.random() * 1000 * (userId) + 1),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            Discount: pro.Discount,
            imageCover: pro.imageCover,
            ratingsAverage: pro.ratingsAverage,
            Color: pro.Color,
        };

        let existPro = WhishListArr.some(x => x.userId == userId && x.ProId == pro.ProId);

        if (!existPro) {
            WhishListArr.push(productArrObj);
            successAlert('تم الإضافة إلى المفضلة', 'تمت إضافة المنتج إلى المفضلة بنجاح');
        } else {
            WhishListArr = WhishListArr.filter(item => !(item.userId === userId && item.ProId === pro.ProId));
            RemoveAlert('تم الحذف من المفضلة', "تم إزالة المنتج من المفضلة بنجاح");
        }
        
        await indexedDB.setItem('WhishList', WhishListArr);
        DisplayWhishlist(); // إعادة تحميل القائمة لتحديث الأيقونات
    } 
    catch (error) {
        console.error('Error in WhishList:', error);
    }
}







// Initialize the application
initialize();