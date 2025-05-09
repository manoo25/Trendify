
// Initialize all variables at the top
let productsArr = JSON.parse(localStorage.getItem('Products')) || [];
let productColors = [];
let images = [];
let productImgSrc = '';
let currentEditIndex = -1;
let userName = sessionStorage.getItem('LogedUser') 
               ? JSON.parse(sessionStorage.getItem('LogedUser')).name 
               : '';
// Set user name               
$("#adminuserName").val(userName);

// Apply styles to color swatches
$(document).ready(function() {
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
   var colors = ["white","red", "blue" , "black"];
    $(this).css("background-color", colors[index]);
  });

// Handle color selection
  $(".colored").click(function() {
    const value = $(this).css("background-color");
    const colorIndex = productColors.indexOf(value);

    if (colorIndex === -1) {
      productColors.push(value);
    } else {
      productColors.splice(colorIndex, 1);
    }

    $("#productColor").val(productColors.map(color => {
      switch (color) {
        case "rgb(255, 255, 255)":
          return "White";
        case "rgb(255, 0, 0)":
          return "Red";
        case "rgb(0, 0, 255)":
          return "Blue";
        case "rgb(0, 0, 0)":
          return "Black";
        default:
          return "";
      }
    }).join(", "));
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
    images = []; // Reset images array
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
    if ($('#productName').val() && $('#realPrice').val() && $('#productCategory').val() && $('#productDescription').val() && $('#productSubCategory').val() && $('#ratingAverage').val() && $('#productQuantity').val()) {
      if (currentEditIndex === -1) {
        addProduct();
      } else {
        updateProduct();
      }
    } else {
      alert('Please fill out all required fields.');
    }
  });

  // Initialize display
  displayProduct();
});

function addProduct() {
  const product = {
    id: generateProductId(),
    name: $('#productName').val(),
    real_price: Number($('#realPrice').val()),
    Discount: $('#productDiscount').val(),
    EndPrice: calculateEndPrice(),
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

  productsArr.push(product);
  saveToLocalStorage();
  displayProduct();
  resetForm();
  $('#personalInfoModal').modal('hide');
}

function updateProduct() {
  productsArr[currentEditIndex] = {
    id: productsArr[currentEditIndex].id,
    name: $('#productName').val(),
    real_price: Number($('#realPrice').val()),
    Discount: $('#productDiscount').val(),
    EndPrice: calculateEndPrice(),
    category: $('#productCategory').val(),
    description: $('#productDescription').val(),
    imageCover: productImgSrc || productsArr[currentEditIndex].imageCover,
    images: images.length > 0 ? images : productsArr[currentEditIndex].images,
    subcategory: $('#productSubCategory').val(),
    ratingsAverage: $('#ratingAverage').val(),
    sellerName: userName,
    quantity: $('#productQuantity').val(),
    Colors: productColors,
    Colorscode: productColors,
  };

  saveToLocalStorage();
  displayProduct();
  resetForm();
  currentEditIndex = -1;
  $('#personalInfoModal').modal('hide');
}

function displayProduct() {
  const tableBody = $("#ordersTable tbody");
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
          <button class="btn btn-sm btn-new btn-new3" onclick="editProduct(${i})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-new btn-new2 " onclick="deleteProduct(${i})"><i class="fas fa-trash"></i></button>
         </div>
        </td>
      </tr>
    `);
  });
}

function editProduct(i) {
  currentEditIndex = i;
  const product = productsArr[i];
  
  // Set form values
  $('#productName').val(product.name);
  $('#realPrice').val(product.real_price);
  $('#productDiscount').val(product.Discount);
  $('#productCategory').val(product.category);
  $('#productDescription').val(product.description);
  $('#productSubCategory').val(product.subcategory);
  $('#ratingAverage').val(product.ratingsAverage);
  $('#productQuantity').val(product.quantity);
  $('#productColor').val(product.Colors);
  
  // Set current images
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
    
    // Show success message
    Swal.fire(
      'Deleted!',
      'Your product has been deleted.',
      'success'
    );
  }
}

// Helper functions
function generateProductId() {
  productsArr=JSON.parse(localStorage.getItem('Products'))
let id=`${Math.floor(Math.random() * 1000 * (productsArr.length + 1))}`

  return id;
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



