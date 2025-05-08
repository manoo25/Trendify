import indexedDB from './indexedDb.js';
import { successAlert ,RemoveAlert } from './date.js'; 



initialize();

let category = ["Men", "Women", "Kids"];
let subcategory = ["Dresses", "Jackets", "Tshirts","Shoeses", "Jeans"];
let ProductsArr =[];
let CartArr = [];
let WhishListtArr = [];
let FilterCartArr=[];

var userId;

if (sessionStorage.getItem('LogedUser')) {
  userId=JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}



async function initialize() {
  const cartData = await indexedDB.getItem('Cart');
  if (cartData) {
      CartArr = cartData;
      console.log(CartArr);
      
  }
  const WhishListData = await indexedDB.getItem('WhishList');
  if (WhishListData) {
    WhishListtArr = WhishListData;
  }

}






// set at local storage
// mostala7 maigration
if (localStorage.getItem('Products')) {
    ProductsArr=JSON.parse(localStorage.getItem('Products'))
     }
     else{
        localStorage.setItem('Products',JSON.stringify(ProductsArr));
    }


    // Gaafer section
// elements counter
document.getElementById(
  "elementscounter"
).innerHTML = `(${ProductsArr.length})`;







// to create one element
function createProductElement(product) {
  const discountPercentage =
    product.Discount > 0
      ? Math.round((product.Discount / product.real_price) * 100)
      : 0;

      let existPro;
      let existWhishlist;
    if(userId){
      
       existPro = CartArr.some(x => 
        x.userId.toString() === userId.toString() && 
        x.ProId.toString() === product.id.toString()
     );
       existWhishlist = WhishListtArr.some(x => 
        x.userId.toString() === userId.toString() && 
        x.ProId.toString() === product.id.toString()
     );
       
    }
      const buttonClass = existPro ? 'fa-check' : 'fa-plus';
      const WhishListClass = existWhishlist ? 'fa-solid' : 'fa-regular';


  return `
      <div class="contain-item col-lg-3 col-md-6 pb-2">
        <div class="Product" data-id="${product.id}">
          <div class="pic position-relative">
            <img class="w-100" src="${product.imageCover}" alt="${
    product.name
  }" />
            ${
              discountPercentage > 0
                ? `<span class="discount">-${discountPercentage}%</span>`
                : ""
            }
             <span   class="${WhishListClass} fa-heart position-absolute" data-id="${product.id}"></span>
          </div>
          <div class="disc">
            <h3>${
              product.name.split(" ").length > 3
                ? product.name.split(" ").slice(0, 2).join(" ")
                : product.name
            }</h3>
            <div class="rate d-flex align-items-center gap-1">
              <span class="fa-solid fa-star"></span>
              <span>${product.ratingsAverage}</span>
              <span class="simi">(+500)</span>
            </div>
            <div class="price d-flex justify-content-between align-items-center">
              <div>
                ${product.EndPrice}
                ${
                  product.Discount > 0
                    ? `<span class="text-decoration-line-through afterSale">${product.real_price} Egp</span>`
                    : ""
                }
              </div>
               <button  class="btnAddToCart fa-solid ${buttonClass}" data-id="${product.id}"></button>
             
            </div>
          </div>
        </div>
      </div>
    `;
}

// <button class="btnAddToCart fa-solid fa-plus" data-id="${product.id}"></button>

// function of display as implement and make pagination
function displayProducts(products, tabId , currentPage = 1 , itemsPerPage = 8) {
  const tabContent = document.querySelector(`#${tabId} .row`);
  if (!tabContent) return;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  tabContent.innerHTML = paginatedProducts
  .map((product) => createProductElement(product))
  .join("");
  if (totalPages > 1) {
    createPagination(tabContent.parentElement, totalPages, currentPage, (page) => {
      displayProducts(products, tabId, page, itemsPerPage);
    });
  } else {
    const existingPagination = tabContent.parentElement.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
  }
  function createPagination(container, totalPages, currentPage, onPageChange) {
    // إزالة pagination السابق إذا كان موجوداً
    const existingPagination = container.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
  
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
  
    // زر الصفحة السابقة
    if (currentPage > 1) {
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '&laquo;';
      prevButton.addEventListener('click', () => onPageChange(currentPage - 1));
      paginationContainer.appendChild(prevButton);
    }
  
    // أزرار الصفحات
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => onPageChange(i));
      paginationContainer.appendChild(pageButton);
    }
  
   
    if (currentPage < totalPages) {
      const nextButton = document.createElement('button');
      nextButton.innerHTML = '&raquo;';
      nextButton.addEventListener('click', () => onPageChange(currentPage + 1));
      paginationContainer.appendChild(nextButton);
    }
  
    container.appendChild(paginationContainer);
  }
  // tabContent.innerHTML = products
  //   .map((product) => createProductElement(product))
  //   .join("");
}




// displaying data in event onload and all next code in onload event cause of creation is in function at js .

document.addEventListener("DOMContentLoaded", function () {


  (async () => {
    await initialize();
  

 //display all products
  displayProducts(ProductsArr, "nav-All");

 
  //displaying men and women and kids all products
  displayProducts(
    ProductsArr.filter((p) => p.category === category[0]),
    "nav-men"
  );
  displayProducts(
    ProductsArr.filter((p) => p.category === category[1]),
    "nav-women"
  );
  displayProducts(
    ProductsArr.filter((p) => p.category === category[2]),
    "nav-kids"
  );

  })();


  
  for(let i=0 ; i<category.length ; i++) {

    subcategory.forEach(pro => {
    displayProducts(
            ProductsArr.filter((p) =>  p.category.toLowerCase() === category[i].toLowerCase() && p.subcategory.toLowerCase()=== pro.toLowerCase() ),
            `nav-${category[i]}-${pro}`
          );
});

   
  }


// send filtered data to product details when clicked new

  document.addEventListener('click', function(e) {
    const productelement = e.target.closest('.Product');
    const heartBtn = e.target.closest('.fa-heart') ;                          
              // Handle add to cart buttons
              const cartBtn = e.target.closest('.btnAddToCart') ; 
    if (cartBtn||heartBtn) {
      e.preventDefault();
      e.stopPropagation();
      const products = JSON.parse(localStorage.getItem('Products')) || [];
      let productId;
if (cartBtn) {
   productId = cartBtn.dataset.id;
}
else{
  productId = heartBtn.dataset.id;
}

      
      const product = products.find(p => p.id === productId);
      // let iid=addToCartBtn.dataset.id;
      if(product) {
                                     
              if (heartBtn) {
                  if (!sessionStorage.getItem('LogedUser') || !userId) {
                      alert('You should login or register first!');
                      return;
                  }
                   addToWhishList(product,heartBtn);
              } 
              else if (cartBtn) {
                  if (!sessionStorage.getItem('LogedUser') || !userId) {
                      alert('You should login or register first!');
                      return;
                  }
                 addToCart(product,cartBtn);
              }
    
    
      }
       else {
        console.error('Product not found with ID:', productId);
      }
      return ;
    }
    if(productelement) {
      let id = productelement.dataset.id;
      window.location.href=`./productdetails.html?id=${id}`;
      // return;
    
    }


  })
 





});
// end of filtering data


 async function addToCart(product,btn) {
  try {
  
    
      let pro = product;
      let productCartObj = {
          userId: userId,
          ProId: pro.id,
          OrderId: 0,
          id: Math.floor(Math.random() * 1000 * (userId) + 1),
          name: pro.name,
          real_price: pro.real_price,
          EndPrice: pro.EndPrice,
          imageCover: pro.imageCover,
          qty: 1,
          Color: pro.Colors[0],
      };

      let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.id);

      if (!existPro) {
          CartArr.push(productCartObj);
          FilterCartArr=CartArr.filter(item =>item.userId === userId );
          successAlert('added To Cart','Product added to cart successfully.')
        
      } else {
          CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
          FilterCartArr=CartArr.filter(item =>item.userId === userId );
        
          RemoveAlert('Remove From CArt',"Product Removed Successfully")
      }
      
      await indexedDB.setItem('Cart', CartArr);
      btn.classList.toggle('fa-plus');
      btn.classList.toggle('fa-check');
  } 
  catch (error) {
      console.error('Error in addToCart:', error);
  }
}
 async function addToWhishList(product,btn) {
  try {
    let pro = product;
      
      let productArrObj = {
          userId: userId,
          ProId: pro.id,
          id: Math.floor(Math.random() * 1000 * (userId) + 1),
          name: pro.name,
          real_price: pro.real_price,
          EndPrice: pro.EndPrice,
          imageCover: pro.imageCover,
          Color: pro.Colors[0],
      };

      let existPro = WhishListtArr.some(x => x.userId == userId && x.ProId == pro.id);

      if (!existPro) {
        WhishListtArr.push(productArrObj);
        successAlert('added To WhishList','Product added to WhishList successfully.')
      } else {
        WhishListtArr = WhishListtArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
        RemoveAlert('Remove From WhishList',"Product Removed From WhishList Successfully")
      }
      
      await indexedDB.setItem('WhishList', WhishListtArr);

    btn.classList.toggle('fa-regular');
      btn.classList.toggle('fa-solid');
  } 
  catch (error) {
      console.error('Error in WhishList:', error);
  }
}