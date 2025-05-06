let productsArr=[];
if(localStorage.getItem('Products')){
    productsArr=JSON.parse(localStorage.getItem('Products'));
    displayProduct();
    
}


//لما اضيف واعدل واحذف من ال |array اجى بعدها واخذن الداتا تاى فى localstorage 
// localStorage.setItem('Products',JSON.stringify(productsArr))

var productName = document.getElementById("productName");
var realPrice = document.getElementById("realPrice");
var category = document.getElementById("productCategory");
var description = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var endPrice = document.getElementById("endPrice");
var discount= document.getElementById("productDiscount") ;
var subCategory= document.getElementById("productSubCategory");
var rating= document.getElementById("ratingAverage");
var color= document.getElementById("productColor");
var sellerId=document.getElementById("sellerId");
var quantity=document.getElementById("productQuantity");

var addbtn = document.getElementById("addProductBtn");

function addProduct() {
    var productimg;
    if (productImage.files[0] == undefined) {
      productimg = `../imgs/1_New1.jpg`;
    } else {
      productimg = `../imgs/${productImage.files[0]?.name}`;
    }
    var product = {
      name: productName.value,
      realPrice:realPrice.value,
      discount:discount.value,
      endPrice: endPrice.value,
      catgory: category.value,
      description: description.value,
      image: productimg,
      subCategory:subCategory.value,
      rating:rating.value,
      color:color.value,
      sellerId:sellerId.value,
      quantity:quantity.value
    };
    clear();
  
    productsArr.push(product);
    localStorage.setItem("Products", JSON.stringify(productsArr));
  
    displayProduct();


    

     //   اقفل المودال بعد كل اضافه منتج
     const modalElement = document.getElementById("personalInfoModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  
    
  }

  function displayProduct() {
    const tableBody = document.querySelector("#ordersTable tbody");
    tableBody.innerHTML = ""; 
  
    for (var i = 0; i < productsArr.length; i++) {
        // كل مرة هعمل سطر جديد علشان المنتجات اللى هضيفها متجيش كلها فى صف واحد
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td><img src="${productsArr[i].image}" alt="product image" style="width: 100%;" /></td>
        <td>${productsArr[i].name}</td>
        <td>${productsArr[i].catgory}</td>
        <td>${productsArr[i].endPrice}</td>
        <td>
          <button class="btn btn-sm btn-primary m-1"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-warning m-1"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger  m-1" onclick="deleteProduct(${i})"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(newRow);
    }
  }
  
// فضيلى الفورم بعد كل اضافه
  function clear() {
    productName.value = null;
    
     realPrice.value = null ;
     category.value = null ;
     description.value = null;
     productImage.value = null ;
     endPrice.value = null ;
     discount.value = null ;
     subCategory.value = null;
     rating.value = null;
     color.value = null;
     sellerId.value = null;
     quantity.value = null;
  }


  
  function deleteProduct(idx) {
    productsArr.splice(idx, 1);
    localStorage.setItem("Products", JSON.stringify(productsArr));
    displayProduct();
  }