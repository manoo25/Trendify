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
let ProductsArr = [
  {
   
    id: "1",
    ratingsAverage: 4.8,
    name: "Oversize Fit Crew Neck Printed T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Product Code: B5813AXER105
Model Measurements S Size - 1,88cm - 90/74/91
Sample size: S
Main Fabric Content : Cotton 100%
Product group: : MAN T-Shirt`,
    quantity: 150,
    real_price: 800,
    Discount: 140,
    EndPrice: 560,
    imageCover: "imgs/products/MT13.jpg",
    images: [
      "/Trendify/imgs/products/MT1.jpg",
      "/Trendify/imgs/products/MT12.jpg",
      "/Trendify/imgs/products/MT13.jpg",
      "/Trendify/imgs/products/MT14.jpg",
    ],
    seller_id: 5,
    Colors: ["Ecru"],
    Colorscode: ["#F1E7E5"],
  },
  {
    id: "2",
    ratingsAverage: 4.8,
    name: "Oversize Fit Crew Neck T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Product Code: B5813AXER105
Model Measurements S Size - 1,88cm - 90/74/91
Sample size: S
Main Fabric Content : Cotton 100%
Product group: : MAN T-Shirt`,
    quantity: 150,
    real_price: 699,
    Discount: 0,
    EndPrice: 699,
    imageCover: "/Trendify/imgs/products/MT2.jpg",
    images: [
      "/Trendify/imgs/products/MT2.jpg",
      "/Trendify/imgs/products/MT22.jpg",
      "/Trendify/imgs/products/MT23.jpg",
      "/Trendify/imgs/products/MT24.jpg",
    ],
    seller_id: 5,
    Colors: ["White", "Anthracite", "Mint", " Light Yellow"],
    Colorscode: ["#ECE7EE", "#3E3D44", "#C9C9C7", "#FDE2B6"],
  },
  {
    id: "3",
    ratingsAverage: 5,
    name: "DeFactoFit NBA Los Angeles Lakers Oversize Fit T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements M Size - 1,87cm - 98/78/97
Sample size: M
Main Fabric Content : Cotton 100%`,
    quantity: 150,
    real_price: 699,
    Discount: 180,
    EndPrice: 419,
    imageCover: "/Trendify/imgs/products/MT34.jpg",
    images: [
      "/Trendify/imgs/products/MT34.jpg",
      "/Trendify/imgs/products/MT32.jpg",
      "/Trendify/imgs/products/MT33.jpg",
      "/Trendify/imgs/products/MT3.jpg",
    ],
    seller_id: 5,
    Colors: ["Dark Purple"],
    Colorscode: ["#231355"],
  },
  {
    id: "4",
    ratingsAverage: 4.2,
    name: "Boxy Fit Crew Neck Striped T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements S Size - 1,88cm - 90/74/91
Sample size: S
Main Fabric Content : Cotton 59%,Viscose 13%,Polyester 28%`,
    quantity: 150,
    real_price: 799,
    Discount: 140,
    EndPrice: 559,
    imageCover: "/Trendify/imgs/products/MT43.jpg",
    images: [
      "/Trendify/imgs/products/MT41.jpg",
      "/Trendify/imgs/products/MT42.jpg",
      "/Trendify/imgs/products/MT43.jpg",
      "/Trendify/imgs/products/MT44.jpg",
    ],
    seller_id: 5,
    Colors: ["Light Brown", "Anthracite", " Dark Orange", "Brown"],
    Colorscode: ["#CFB6A1", "#3F424D", "#E1AD4B", "#964B00"],
  },
  {
    id: "5",
    ratingsAverage: 4.4,
    name: "Boxy Fit Crew Neck Printed T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements M Size - 1,86cm - 95/76/92
Sample size: M
Main Fabric Content : Cotton 100%`,
    quantity: 150,
    real_price: 599,
    Discount: 180,
    EndPrice: 419,
    imageCover: "/Trendify/imgs/products/MT53.jpg",
    images: [
      "/Trendify/imgs/products/MT51.jpg",
      "/Trendify/imgs/products/MT52.jpg",
      "/Trendify/imgs/products/MT53.jpg",
      "/Trendify/imgs/products/MT54.jpg",
      "/Trendify/imgs/products/MT55.jpg",
    ],
    seller_id: 5,
    Colors: ["Black"],
    Colorscode: ["#1A191E"],
  },
  {
    id: "6",
    ratingsAverage:4.8,
    name: "Boxy Fit Crew Neck Printed T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements M Size - 1,86cm - 95/76/92
Sample size: M
Main Fabric Content : Cotton 100%`,
    quantity: 140,
    real_price: 799,
    Discount: 140,
    EndPrice: 559,
    imageCover: "/Trendify/imgs/products/MT6.jpg",
    images: [
      "/Trendify/imgs/products/MT61.jpg",
      "/Trendify/imgs/products/MT62.jpg",
      "/Trendify/imgs/products/MT63.jpg",
      "/Trendify/imgs/products/MT64.jpg",
    ],
    seller_id: 5,
    Colors: ["Stone"],
    Colorscode: ["#F9E9DA"],
  },
  //   man jeans
  {
    id: "7",
    ratingsAverage: 4.5,
    name: "Sergio Regular Fit Normal Waist Straight Leg Jeans",
    category: category[0],
    subcategory: subcategory[4],
    description: `Model Measurements 30 Size - 30 Length Size - 1,85cm - 98/79/96
Sample size: 30 Size - 30 Length
Main Fabric Content : Cotton 99%,Elastane 1%`,
    quantity: 170,
    real_price: 1299,
    Discount: 390,
    EndPrice: 909,
    imageCover: "/Trendify/imgs/products/MJ14.jpg",
    images: [
      "/Trendify/imgs/products/MJ1.jpg",
      "/Trendify/imgs/products/MJ12.jpg",
      "/Trendify/imgs/products/MJ13.jpg",
      "/Trendify/imgs/products/MJ14.jpg",
    ],
    seller_id: 7,
    Colors: ["Mid Blue"],
    Colorscode: ["#59DDD3"],
  },
  {
    id: "8",
    ratingsAverage: 4.6,
    name: "Relax Fit Straight Leg Jeans",
    category: category[0],
    subcategory: subcategory[4],
    description: `Model Measurements 32 Size - 1,88cm - 98/80/94
Sample size: 32
Main Fabric Content : Cotton 100%`,
    quantity: 170,
    real_price: 1299,
    Discount: 260,
    EndPrice: 1039,
    imageCover: "/Trendify/imgs/products/MJ23.jpg",
    images: [
      "/Trendify/imgs/products/MJ2.jpg",
      "/Trendify/imgs/products/MJ22.jpg",
      "/Trendify/imgs/products/MJ23.jpg",
      "/Trendify/imgs/products/MJ24.jpg",
    ],
    seller_id: 7,
    Colors: ["Mid Blue"],
    Colorscode: ["#30D5C8"],
  },
  //   MAn Jacket
  {
    id: "9",
    ratingsAverage: 5,
    name: "Relax Fit Polo Collar Snap Zippered Thin Jacket",
    category: category[0],
    subcategory: subcategory[1],
    description: `Main Fabric Content : Elastane 4%,Polyester 96%`,
    quantity: 170,
    real_price: 3899,
    Discount: 0,
    EndPrice: 3899,
    imageCover: "/Trendify/imgs/products/MJa14.jpg",
    images: [
      "/Trendify/imgs/products/MJa14.jpg",
      "/Trendify/imgs/products/MJa12.jpg",
      "/Trendify/imgs/products/MJa13.jpg",
      "/Trendify/imgs/products/MJa1.jpg",
    ],
    seller_id: 7,
    Colors: ["Khaki"],
    Colorscode: ["#f0e68c"],
  },
  {
    id: "10",
    ratingsAverage: 5,
    name: "White Shoose",
    category: category[0],
    subcategory: subcategory[3],
    description: `Shoes - SHO`,
    quantity: 170,
    real_price: 3599,
    Discount: 1800,
    EndPrice: 1799,
    imageCover: "/Trendify/imgs/products/MS1.png",
    images: [
      "/Trendify/imgs/products/MS1.png",
      "/Trendify/imgs/products/MS12.png",
      "/Trendify/imgs/products/MS13.png",
    ],
    seller_id: 8,
    Colors: ["White"],
    Colorscode: ["#ffffff"],
  },
  //   Women
  //   Women Dresses
  {
    id: "11",
    ratingsAverage:4.6,
    name: "Shirt Collar Patterned Long Sleeve Maxi Dress",
    category: category[1],
    subcategory: subcategory[0],
    description: `Model Measurements 36 Size - 1,74cm - 84/61/92
Sample size: 36
Main Fabric Content : Polyamide 12%,Viscose 88%`,
    quantity: 140,
    real_price: 1499,
    Discount: 450,
    EndPrice: 1049,
    imageCover: "/Trendify/imgs/products/WD13.jpg",
    images: [
      "/Trendify/imgs/products/WD1.jpg",
      "/Trendify/imgs/products/WD15.jpg",
      "/Trendify/imgs/products/WD13.jpg",
      "/Trendify/imgs/products/WD16.jpg",
    ],
    seller_id: 8,
    Colors: ["Ecru", "Ecru"],
    Colorscode: ["#FBF6ED", "#FFB733"],
  },

  {
    id: "12",
    ratingsAverage: 4.5,
    name: "Regular Fit Crew Neck Basic Belted Aerobin Long Sleeve Dress",
    category: category[1],
    subcategory: subcategory[0],
    description: `Model Measurements 36 Size - 1,74cm - 84/61/92
Sample size: 36
Main Fabric Content : Polyester 100%`,
    quantity: 150,
    real_price: 1299,
    Discount: 260,
    EndPrice: 1039,
    imageCover: "/Trendify/imgs/products/WD2.jpg",
    images: [
      "/Trendify/imgs/products/WD22.jpg",
      "/Trendify/imgs/products/WD23.jpg",
      "/Trendify/imgs/products/WD24.jpg",
    ],
    seller_id: 8,
    Colors: ["NAVY", "Green"],
    Colorscode: ["#333399", "#00C000"],
  },
  //   Woman jeans
  {
    id: "13",
    ratingsAverage:4.8,
    name: "Wide Leg High Waist Long Soft Jeans",
    category: category[1],
    subcategory: subcategory[4],
    description: `Main Fabric Content : Lyocell 100%`,
    quantity: 150,
    real_price: 999,
    Discount: 0,
    EndPrice: 999,
    imageCover: "/Trendify/imgs/products/WJ14.jpg",
    images: [
      "/Trendify/imgs/products/WJ1.jpg",
      "/Trendify/imgs/products/WJ12.jpg",
      "/Trendify/imgs/products/WJ13.jpg",
    ],
    seller_id: 5,
    Colors: ["Mid Blue"],
    Colorscode: ["#30D5C8"],
  },
  //   Woman Jackets
  {
    id: "14",
    ratingsAverage: 4.5,
    name: "Regular Pattern Polo Collar Velvet Seasonal Thin Jacket",
    category: category[1],
    subcategory: subcategory[1],
    description: `Model Measurements M Size - 1,78cm - 85/60/89
Sample size: M
Main Fabric Content : Cotton 56%,Polyester 44%`,
    quantity: 150,
    real_price: 4299,
    Discount: 0,
    EndPrice: 3439,
    imageCover: "/Trendify/imgs/products/WJa12.jpg",
    images: [
      "/Trendify/imgs/products/WJa12.jpg",
      "/Trendify/imgs/products/WJa1.jpg",
      "/Trendify/imgs/products/WJa13.jpg",
      "/Trendify/imgs/products/WJa14.jpg",
    ],
    seller_id: 5,
    Colors: ["Brown"],
    Colorscode: ["#AB6F33"],
  },
  //   Woman shoeses
  {
    id: "15",
    ratingsAverage: 4.7,
    name: "HIGH HEEL SLINGBACKS WITH BEAD DETAIL",
    category: category[1],
    subcategory: subcategory[3],
    description: `Slingback shoes with a mesh top. Beaded and sequined detail on the front. Ankle strap with buckle fastening. High stiletto heel. Pointed toe.

Heel height: 10.5 cm / 4.1`,
    quantity: 150,
    real_price: 3890,
    Discount: 0,
    EndPrice: 3890,
    imageCover: "/Trendify/imgs/products/WS1.jpg",
    images: [
      "/Trendify/imgs/products/WS12.jpg",
      "/Trendify/imgs/products/WS1.jpg",
      "/Trendify/imgs/products/WS13.jpg",
      "/Trendify/imgs/products/WS14.jpg",
    ],
    seller_id: 5,
    Colors: ["gold"],
    Colorscode: ["#D8C9B3"],
  },
  //   Kids
  //   Kids T-shirt
  {
    id: "16",
    ratingsAverage: 5,
    name: "TOWELLING  SWEATSHIRT WITH LABEL",
    category: category[2],
    subcategory: subcategory[2],
    description: `Long sleeve sweatshirt with a round neck. Ribbed trims. Stripe print and label appliqué on the chest.`,
    quantity: 150,
    real_price: 1190,
    Discount: 400,
    EndPrice: 790,
    imageCover: "/Trendify/imgs/products/KT1.jpg",
    images: [
      "/Trendify/imgs/products/KT1.jpg",
      "/Trendify/imgs/products/KT12.jpg",
      "/Trendify/imgs/products/KT13.jpg",
      "/Trendify/imgs/products/KT14.jpg",
    ],
    seller_id: 5,
    Colors: ["USAFA Blue"],
    Colorscode: ["#024997"],
  },
  {
    id: "17",
    ratingsAverage: 4.8,
    name: "Printed sweatshirt",
    category: category[2],
    subcategory: subcategory[2],
    description: ` Georgia Beaumont. Top in lightweight sweatshirt fabric made from cotton with a floral print front and back. Round, rib-trimmed neckline with press-studs on one side (except in sizes 2 To 4Y), dropped shoulders and ribbing at the cuffs and hem.`,
    quantity: 150,
    real_price: 899,
    Discount: 0,
    EndPrice: 899,
    imageCover: "/Trendify/imgs/products/KT24.jpeg",
    images: [
      "/Trendify/imgs/products/KT24.jpeg",
      "/Trendify/imgs/products/KT22.jpeg",
      "/Trendify/imgs/products/KT23.jpeg",
      "/Trendify/imgs/products/KT2.jpeg",
    ],
    seller_id: 5,
    Colors: ["Light yellow"],
    Colorscode: ["#D3CFBE"],
  },
  //   Kids Jeans
  {
    id: "18",
    ratingsAverage: 4.8,
    name: "Linen-blend joggers",
    category: category[2],
    subcategory: subcategory[4],
    description: ` Joggers in a soft weave made from a cotton and linen blend. Elasticated, drawstring waist and a fake fly.`,
    quantity: 150,
    real_price: 799,
    Discount: 0,
    EndPrice: 799,
    imageCover: "/Trendify/imgs/products/KJ13.jpeg",
    images: [
      "/Trendify/imgs/products/KJ13.jpeg",
      "/Trendify/imgs/products/KJ14.jpeg",
      "/Trendify/imgs/products/KJ1.jpeg",
      "/Trendify/imgs/products/KJ12.jpeg",
    ],
    seller_id: 5,
    Colors: ["Cream", "White/Grey striped"],
    Colorscode: ["#E9E8E0", "#AFAFBC"],
  },
  //   Kids Jacket
  {
    id: "19",
    ratingsAverage: 4.8,
    name: "Quilted Jacket Suit",
    category: category[2],
    subcategory: subcategory[1],
    description: ` Padded snowsuit in a quilted weave with a shiny finish featuring a detachable, fleece-lined hood with a fluffy trim. Zip down the front with an anti-chafe chin guard and an elasticated belt with a plastic buckle. Covered elastication at the cuffs and hems, and a detachable, reinforced strap under the feet. Fleece lining.`,
    quantity: 150,
    real_price: 3300,
    Discount: 0,
    EndPrice: 3300,
    imageCover: "/Trendify/imgs/products/KJa1.jpeg",
    images: ["/Trendify/imgs/products/KJa1.jpeg", "/Trendify/imgs/products/KJa12.jpeg"],
    seller_id: 5,
    Colors: ["Dark Black"],
    Colorscode: ["#000000"],
  },
  //   Kids Shoeses
  {
    id: "20",
    ratingsAverage: 4.5,
    name: "Chukka boots",
    category: category[2],
    subcategory: subcategory[3],
    description: ` Chukka boots with open lacing, jersey linings and insoles in Cellfit™ technical foam for extra comfort. Heel 1.5 cm.`,
    quantity: 150,
    real_price: 1999,
    Discount: 0,
    EndPrice: 1999,
    imageCover: "/Trendify/imgs/products/KS1.jpeg",
    images: [
      "/Trendify/imgs/products/KS1.jpeg",
      "/Trendify/imgs/products/KS12.jpeg",
      "/Trendify/imgs/products/KS13.jpeg",
    ],
    seller_id: 5,
    Colors: ["Brown-Nose"],
    Colorscode: ["#744021"],
  },
];



// set at local storage
// mostala7 maigration
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