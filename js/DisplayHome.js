import indexedDB from './indexedDb.js';

let CartArr = [];
async function initialize() {
  const cartData = await indexedDB.getItem('Cart');
  if (cartData) {
      CartArr = cartData;
  }

}
var userId;



document.addEventListener('DOMContentLoaded', function() {
  new Splide('#main-carousel', {
    type: 'slide',
    perPage: 3, 
    perMove: 1,
    gap: '1.5rem',
    arrows: true,
    pagination: false,
    breakpoints: {
      992: { 
        perPage: 2
      },
      768: { 
        perPage: 1,
        arrows: false,
      }
    }
  }).mount();
});
document.addEventListener('DOMContentLoaded', function() {
  new Splide('#Cat-carousel', {
    type: 'slide',
    perPage: 8, 
    perMove: 1,
    gap: '1.5rem',
    arrows: true,
    pagination: false,
    breakpoints: {
      992: { 
        perPage: 5
      },
      768: { 
        perPage: 3,
        arrows: false,
      }
    }
  }).mount();




});


  // edit nav height
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > window.innerHeight) { 
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    });









let category = ["Men", "Women", "Kids"];
let subcategory = ["Dreesses", "Jackets", "T-shirts", "Shoeses", "jeans"];
let ProductsArr = [];

 if (localStorage.getItem('Products')) {
ProductsArr=JSON.parse(localStorage.getItem('Products'))
 }
 else{
    localStorage.setItem('Products',JSON.stringify(ProductsArr));
 }




//Mohamed SAlama JS
(initialize().then(  ()=>{

 
const FlashSale=document.getElementById('FlashSale');


 function displayFlashSale() { 
  
   const filteredProducts = ProductsArr.filter(product =>    
     Math.round((product.Discount / product.real_price) * 100) >= 30
   ).slice(0, 4);
   FlashSale.innerHTML=''
     filteredProducts.forEach(product => {
  let averageDis=Math.round((product.Discount/product.real_price)*100);
  let existPro;
if(userId){
   existPro = CartArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   
}
  const buttonClass = existPro ? 'fa-check' : 'fa-plus';
       FlashSale.innerHTML+=`
        <div class="contain-item col-lg-3 col-md-6  pb-2">
         <div class="Product">
           <div class="pic position-relative">
             <img class="w-100" src="${product.imageCover}" />
                <span class="fa-regular fa-heart position-absolute"></span>
             <span class="discount">-${averageDis}%</span>
           </div>
           <div class="disc">
             <h3>${(product.name).split(' ',2).join(' ')}</h3>
             <div class="rate d-flex align-items-center gap-1">
               <span>${product.ratingsAverage}</span>
               <span class="simi">(+500)</span>
             </div>
             <div class="price d-flex justify-content-between align-items-center">
               <div>
                ${product.EndPrice}
                 <span class="text-decoration-line-through afterSale">${product.real_price} Egp</span>
               </div>
               <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
             </div>
           </div>
         </div>
       </div>
       
       `

     
   });
}
displayFlashSale();




const NavLinksBest = document.getElementById('NavLinksBest');
const navabContent = document.getElementById('nav-tabContent');


//Best selling
function displayNavTabsLink() {
 category.forEach(cat => {
   NavLinksBest.innerHTML += `
     <button
       class="nav-link"
       id="nav-${cat}-tab"
       data-bs-toggle="tab"
       data-bs-target="#nav-${cat}"
       type="button"
       role="tab"
       aria-controls="nav-${cat}"
       aria-selected="false"
     >
       ${cat}
     </button>`;
 });

 const filteredProducts = ProductsArr.filter(product => 
  
   Math.round((product.Discount / product.real_price) * 100)>=30&&
   Math.round((product.Discount / product.real_price) * 100)<50
 );
 filteredProducts.forEach(product => {
   let averageDis=Math.round((product.Discount/product.real_price)*100);
   let existPro;
if(userId){
   existPro = CartArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   
}
   
 const buttonClass = existPro ? 'fa-check' : 'fa-plus';
   if(averageDis==0){


  
  
  document.getElementById('allBestTab').innerHTML+=`
 
   <div class="contain-item col-lg-3 col-md-6 pb-2">
       <div class="Product">
         <div class="pic position-relative">
           <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
         
           <span class="${addetWhishList} fa-heart position-absolute"></span>
         </div>
         <div class="disc">
           <h3>${product.name.split(' ', 2).join(' ')}</h3>
           <div class="rate d-flex align-items-center gap-1">
             <span class="fa-solid fa-star"></span>
             <span>${product.ratingsAverage}</span>
             <span class="simi">(+500)</span>
           </div>
           <div class="price d-flex justify-content-between align-items-center">
             <div>
               ${product.EndPrice}
               
             </div>
             <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
           </div>
         </div>
       </div>
     </div>
 
 `
   }
   else{
     document.getElementById('allBestTab').innerHTML += `
     <div class="contain-item col-lg-3 col-md-6 pb-2">
       <div class="Product">
         <div class="pic position-relative">
           <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
           <span class="discount">-${averageDis}%</span>
           <span class="fa-regular fa-heart position-absolute"></span>
         </div>
         <div class="disc">
           <h3>${product.name.split(' ', 2).join(' ')}</h3>
           <div class="rate d-flex align-items-center gap-1">
             <span class="fa-solid fa-star"></span>
             <span>${product.ratingsAverage}</span>
             <span class="simi">(+500)</span>
           </div>
           <div class="price d-flex justify-content-between align-items-center">
             <div>
               ${product.EndPrice}
               <span class="text-decoration-line-through afterSale">
                 ${product.real_price} Egp
               </span>
             </div>
             <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
           </div>
         </div>
       </div>
     </div>
   `;
   }
 
});

 category.forEach(cat => {

   const tabContent = document.createElement("div");
   tabContent.className = "tab-pane fade";
   tabContent.id = `nav-${cat}`;
   tabContent.setAttribute("role", "tabpanel");
   tabContent.setAttribute("aria-labelledby", `nav-${cat}-tab`);
   tabContent.setAttribute("tabindex", "0");


   const rowtabContent = document.createElement("div");
   rowtabContent.className = "row gy-4 px-5 px-md-2 px-lg-0 gx-4";

  
   const filteredProducts = ProductsArr.filter(product => 
     product.category === cat && 
     Math.round((product.Discount / product.real_price) * 100)<26
   ).slice(0, 4);

   filteredProducts.forEach(product => {
     let averageDis=Math.round((product.Discount/product.real_price)*100);
     let existPro;
if(userId){
   existPro = CartArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   
}
     
   const buttonClass = existPro ? 'fa-check' : 'fa-plus';
    if(averageDis==0){
     rowtabContent.innerHTML += `
     <div class="contain-item col-lg-3 col-md-6 pb-2">
       <div class="Product">
         <div class="pic position-relative">
           <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
         
           <span class="fa-regular fa-heart position-absolute"></span>
         </div>
         <div class="disc">
           <h3>${product.name.split(' ', 2).join(' ')}</h3>
           <div class="rate d-flex align-items-center gap-1">
             <span class="fa-solid fa-star"></span>
             <span>${product.ratingsAverage}</span>
             <span class="simi">(+500)</span>
           </div>
           <div class="price d-flex justify-content-between align-items-center">
             <div>
               ${product.EndPrice}
               
             </div>
             <button class="btnAddToCart fa-solid fa-plus"></button>
           </div>
         </div>
       </div>
     </div>
   `;
    }
else{
 rowtabContent.innerHTML += `
 <div class="contain-item col-lg-3 col-md-6 pb-2">
   <div class="Product">
     <div class="pic position-relative">
       <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
       <span class="discount">-${averageDis}%</span>
       <span class="fa-regular fa-heart position-absolute"></span>
     </div>
     <div class="disc">
       <h3>${product.name.split(' ', 2).join(' ')}</h3>
       <div class="rate d-flex align-items-center gap-1">
         <span class="fa-solid fa-star"></span>
         <span>${product.ratingsAverage}</span>
         <span class="simi">(+500)</span>
       </div>
       <div class="price d-flex justify-content-between align-items-center">
         <div>
           ${product.EndPrice}
           <span class="text-decoration-line-through afterSale">
             ${product.real_price} Egp
           </span>
         </div>
          <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
       </div>
     </div>
   </div>
 </div>
`;
}


   });
   tabContent.appendChild(rowtabContent);   
   navabContent.appendChild(tabContent);
 });
}
displayNavTabsLink();



// Top Picks Display 
const TopPicksContainer = document.getElementById('TopPicksContainer');

function displayTopPiks() { 
 TopPicksContainer.innerHTML=''
 const filteredProducts = ProductsArr.filter(product =>    
   product.ratingsAverage==5
 );
 filteredProducts.forEach(product => {
let averageDis=Math.round((product.Discount/product.real_price)*100);
let existPro;
if(userId){
   existPro = CartArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   
}
 
const buttonClass = existPro ? 'fa-check' : 'fa-plus';
if(averageDis==0){

 TopPicksContainer.innerHTML+=`

<div class="contain-item col-lg-3 col-md-6 pb-2">
    <div class="Product">
      <div class="pic position-relative">
        <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
      
        <span class="fa-regular fa-heart position-absolute"></span>
      </div>
      <div class="disc">
        <h3>${product.name.split(' ', 2).join(' ')}</h3>
        <div class="rate d-flex align-items-center gap-1">
          <span class="fa-solid fa-star"></span>
          <span>${product.ratingsAverage}</span>
          <span class="simi">(+500)</span>
        </div>
        <div class="price d-flex justify-content-between align-items-center">
          <div>
            ${product.EndPrice}
            
          </div>
          <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
        </div>
      </div>
    </div>
  </div>

`
}
else{
 TopPicksContainer.innerHTML += `
  <div class="contain-item col-lg-3 col-md-6 pb-2">
    <div class="Product">
      <div class="pic position-relative">
        <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
        <span class="discount">-${averageDis}%</span>
        <span class="fa-regular fa-heart position-absolute"></span>
      </div>
      <div class="disc">
        <h3>${product.name.split(' ', 2).join(' ')}</h3>
        <div class="rate d-flex align-items-center gap-1">
          <span class="fa-solid fa-star"></span>
          <span>${product.ratingsAverage}</span>
          <span class="simi">(+500)</span>
        </div>
        <div class="price d-flex justify-content-between align-items-center">
          <div>
            ${product.EndPrice}
            <span class="text-decoration-line-through afterSale">
              ${product.real_price} Egp
            </span>
          </div>
          <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
        </div>
      </div>
    </div>
  </div>
`;
}  

 });
}
displayTopPiks();


//End Mohamed Salama JS





}));