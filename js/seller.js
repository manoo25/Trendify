//modal 

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
$(".colored").each(function (index) {
  const colors = ["red", "green", "blue"];
  $(this).css("background-color", colors[index]);
});
let productColors = [];
$(".colored").click(function () {
  const value = $(this).css("background-color");
  // Only add if not already selected
  if (!productColors.includes(value)) {
    productColors.push(value);
    // Update input with comma-separated list
    $("#productColor").val(productColors.join(", "));
  }
});


// Update the range value
$('#ratingAverage').on('input', function () {
  var ratingAverage = $('#rangeValue').text(this.value);
  console.log(ratingAverage);
});

// read and display the image
let productImgSrc;
$('#productImageCover').on('change', function () {
  file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      productImgSrc = reader.result;

    });
    reader.readAsDataURL(file);
  }
});

//read multiple images
let images = [];
$('#imageInput').on('change', function () {
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        images.push(reader.result);
      });
      reader.readAsDataURL(file);
    }
  }
});
console.log(images);





let productsArr = [];
if (localStorage.getItem('Products')) {
  productsArr = JSON.parse(localStorage.getItem('Products'));
  displayProduct();

}


let userName;
if (sessionStorage.getItem('LogedUser')) {
  userName = JSON.parse(sessionStorage.getItem('LogedUser')).name;
  console.log(userName);

}

//لما اضيف واعدل واحذف من ال |array اجى بعدها واخذن الداتا تاى فى localstorage 
// localStorage.setItem('Products',JSON.stringify(productsArr))

var productName = document.getElementById("productName");
var realPrice = document.getElementById("realPrice");
var category = document.getElementById("productCategory");
var description = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var discount = document.getElementById("productDiscount");
var subCategory = document.getElementById("productSubCategory");
var rating = document.getElementById("ratingAverage");
var color = document.getElementById("productColor");
var sellerId = document.getElementById("sellerId");
var quantity = document.getElementById("productQuantity");

$('#addProductBtn').on('click', addProduct);

function addProduct() {
  
  // console.log(productImgSrc);
  var product = {
    id: Math.floor(Math.random() * 1000 * (productsArr.length) + 1),
    name: $('#productName').val(),
    real_price: Number($('#realPrice').val()),
    Discount: $('#productDiscount').val(),
    EndPrice: Number(realPrice.value) - Number(discount.value),
    category: $('#productCategory').val(),
    description: $('#productDescription').val(),
    imageCover: productImgSrc,
    images: images,
    subcategory: $('#productSubCategory').val(),
    ratingsAverage: $('#ratingAverage').val(),
    sellerName: userName,
    quantity: $('#productQuantity').val(),
    Colors: productColors,
    Colorscode: productColors,
  };
  clear();

  productsArr.push(product);
  localStorage.setItem("Products", JSON.stringify(productsArr));
  displayProduct();
  console.log(productsArr);
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
        <td><img src="${productsArr[i].imageCover}" alt="product image" style="width: 100%;" /></td>
        <td>${productsArr[i].name}</td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].EndPrice}</td>
        <td>
          <button class="btn btn-sm btn-primary m-1"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-warning m-1" onclick="editProduct(${i})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger  m-1" onclick="deleteProduct(${i})"><i class="fas fa-trash"></i></button>
        </td>
      `;
    tableBody.appendChild(newRow);
  }
}

// فضيلى الفورم بعد كل اضافه
function clear() {
  document.getElementById("productForm").reset();
}

function deleteProduct(idx) {
  productsArr.splice(idx, 1);
  localStorage.setItem("Products", JSON.stringify(productsArr));
  displayProduct();
}
function editProduct(i){
  $('#personalInfoModal').modal('show');

  $('#productName').val(productsArr[i].name);
  $('#realPrice').val(productsArr[i].real_price);
  $('#productDiscount').val(productsArr[i].Discount);
  $('#productCategory').val(productsArr[i].category);
  $('#productDescription').val(productsArr[i].description);
// $('#productImageCover').val(productsArr[i].imageCover);
  $('#productSubCategory').val(productsArr[i].subcategory);
  $('#ratingAverage').val(productsArr[i].ratingsAverage);
  $('#productQuantity').val(productsArr[i].quantity);
  $('#productColor').val(productsArr[i].Colors);
}

// function preventModalCloseIfEmpty(modalId) {
//   var modal = $('#personalInfoModal');
//   var inputs = modal.find('input, select, textarea');

//   if (inputs.filter(function() { return $(this).val() !== ''; }).length === 0) {
//     modal.on('hide.bs.modal', function(event) {
//       event.preventDefault();
//       alert('Please fill in the required fields before closing the modal.');
//     });
//   }
// }
// $('#addProductBtn').on('click', preventModalCloseIfEmpty);

// // Get the form and modal elements
// var form = document.getElementById('myForm');
// var modal = document.getElementById('myModal');

// // Add an event listener to the form submit event
// form.addEventListener('submit', function(event) {
//   // Check if all required fields have values
//   if (form.checkValidity() === false) {
//     event.preventDefault();
//     event.stopPropagation();
//   }
// });