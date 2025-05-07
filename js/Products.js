
let category = ["Men", "Women", "Kids"];
let subcategory = ["Dresses", "Jackets", "Tshirts","Shoeses", "Jeans"];
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
    imageCover: "./imgs/products/MT13.jpg",
    images: [
      "./imgs/products/MT1.jpg",
      "./imgs/products/MT12.jpg",
      "./imgs/products/MT13.jpg",
      "./imgs/products/MT14.jpg",
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
    imageCover: "./imgs/products/MT2.jpg",
    images: [
      "./imgs/products/MT2.jpg",
      "./imgs/products/MT22.jpg",
      "./imgs/products/MT23.jpg",
      "./imgs/products/MT24.jpg",
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
    imageCover: "./imgs/products/MT34.jpg",
    images: [
      "./imgs/products/MT34.jpg",
      "./imgs/products/MT32.jpg",
      "./imgs/products/MT33.jpg",
      "./imgs/products/MT3.jpg",
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
    imageCover: "./imgs/products/MT43.jpg",
    images: [
      "./imgs/products/MT4.jpg",
      "./imgs/products/MT42.jpg",
      "./imgs/products/MT43.jpg",
      "./imgs/products/MT44.jpg",
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
    imageCover: "./imgs/products/MT53.jpg",
    images: [
      "./imgs/products/MT52.jpg",
      "./imgs/products/MT53.jpg",
      "./imgs/products/MT5.jpg",
      "./imgs/products/MT54.jpg",
      "./imgs/products/MT55.jpg",
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
    imageCover: "./imgs/products/MT6.jpg",
    images: [
      "./imgs/products/MT6.jpg",
      "./imgs/products/MT62.jpg",
      "./imgs/products/MT63.jpg",
      "./imgs/products/MT64.jpg",
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
    imageCover: "./imgs/products/MJ14.jpg",
    images: [
      "./imgs/products/MJ1.jpg",
      "./imgs/products/MJ12.jpg",
      "./imgs/products/MJ13.jpg",
      "./imgs/products/MJ14.jpg",
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
    imageCover: "./imgs/products/MJ23.jpg",
    images: [
      "./imgs/products/MJ2.jpg",
      "./imgs/products/MJ22.jpg",
      "./imgs/products/MJ23.jpg",
      "./imgs/products/MJ24.jpg",
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
    imageCover: "./imgs/products/MJa14.jpg",
    images: [
      "./imgs/products/MJa14.jpg",
      "./imgs/products/MJa12.jpg",
      "./imgs/products/MJa13.jpg",
      "./imgs/products/MJa1.jpg",
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
    imageCover: "./imgs/products/MS1.png",
    images: [
      "./imgs/products/MS1.png",
      "./imgs/products/MS12.png",
      "./imgs/products/MS13.png",
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
    imageCover: "./imgs/products/WD13.jpg",
    images: [
      "./imgs/products/WD1.jpg",
      "./imgs/products/WD15.jpg",
      "./imgs/products/WD13.jpg",
      "./imgs/products/WD16.jpg",
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
    imageCover: "./imgs/products/WD2.jpg",
    images: [
      "./imgs/products/WD22.jpg",
      "./imgs/products/WD23.jpg",
      "./imgs/products/WD24.jpg",
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
    imageCover: "./imgs/products/WJ14.jpg",
    images: [
      "./imgs/products/WJ1.jpg",
      "./imgs/products/WJ12.jpg",
      "./imgs/products/WJ13.jpg",
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
    imageCover: "./imgs/products/WJa12.jpg",
    images: [
      "./imgs/products/WJa12.jpg",
      "./imgs/products/WJa1.jpg",
      "./imgs/products/WJa13.jpg",
      "./imgs/products/WJa14.jpg",
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
    imageCover: "./imgs/products/WS1.jpg",
    images: [
      "./imgs/products/WS12.jpg",
      "./imgs/products/WS1.jpg",
      "./imgs/products/WS13.jpg",
      "./imgs/products/WS14.jpg",
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
    imageCover: "./imgs/products/KT1.jpg",
    images: [
      "./imgs/products/KT1.jpg",
      "./imgs/products/KT12.jpg",
      "./imgs/products/KT13.jpg",
      "./imgs/products/KT14.jpg",
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
    imageCover: "./imgs/products/KT24.jpeg",
    images: [
      "./imgs/products/KT24.jpeg",
      "./imgs/products/KT22.jpeg",
      "./imgs/products/KT23.jpeg",
      "./imgs/products/KT2.jpeg",
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
    imageCover: "./imgs/products/KJ13.jpeg",
    images: [
      "./imgs/products/KJ13.jpeg",
      "./imgs/products/KJ14.jpeg",
      "./imgs/products/KJ1.jpeg",
      "./imgs/products/KJ12.jpeg",
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
    imageCover: "./imgs/products/KJa1.jpeg",
    images: ["./imgs/products/KJa1.jpeg", "./imgs/products/KJa12.jpeg"],
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
    imageCover: "./imgs/products/KS1.jpeg",
    images: [
      "./imgs/products/KS1.jpeg",
      "./imgs/products/KS12.jpeg",
      "./imgs/products/KS13.jpeg",
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
            <span class="fa-regular fa-heart position-absolute"></span>
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
              <button class="btnAddToCart fa-solid fa-plus" data-id="${product.id}"></button>
            </div>
          </div>
        </div>
      </div>
    `;
}

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

  
  for(let i=0 ; i<category.length ; i++) {
    for(element of subcategory){
        displayProducts(
            ProductsArr.filter((p) =>  p.category.toLowerCase() === category[i].toLowerCase() && p.subcategory.toLowerCase()=== element.toLowerCase() ),
            `nav-${category[i]}-${element}`
          );
    }
  }
// send filtered data to product details when clicked
let filtereddata =[];

  let products =document.querySelectorAll('.Product');
  products.forEach((element) => {
    element.addEventListener('click', function(e) {
      let id = this.dataset.id;
    window.location.href=`./productdetails.html?id=${id}`;
    
    });
  });
  document.querySelectorAll(".btnAddToCart").forEach((i)=>{
    i.addEventListener('click', function(e){
      let iid=this.dataset.id;
      e.stopPropagation();
      Swal.fire({
        icon: 'success',
        title: 'added successfully !',
        text: `${ProductsArr.find((i) =>i.id==iid).name} added to cart `,
        showConfirmButton: false,
        timer: 1600,
        toast: true,
        position: 'top-end',
        position: 'top-end',
        background: 'var(--card-color)', 
        color: 'var(--main-color)',      
        iconColor: 'var(--main-color)',  
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content'
        }
      });
      })
  })

});


 

