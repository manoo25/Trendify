// list of search input
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// عند التركيز على حقل البحث
searchInput.addEventListener("focus", function() {
searchResults.style.display = "block";
});

// عند النقر خارج حقل البحث
document.addEventListener("click", function(event) {
// إذا كان النقر ليس داخل حقل البحث أو نتائج البحث
if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
searchResults.style.display = "none";
}
});

// لمنع إغلاق النتائج عند النقر عليها مباشرة
searchResults.addEventListener("mousedown", function(event) {
event.preventDefault();
});

//disply login&signUp or hide  if user in session storage
function checkLogedUser() {
  
  if (sessionStorage.getItem('LogedUser')) {
    // $('nav ul .authBtn').removeClass('d-none');
    // document.getElementById('logandRegBtn').classList.add('d-none')
    $('.log').addClass('d-none');
    $('.authBtn').removeClass('d-none');
    
  }
  else{
    // $('nav ul .authBtn').addClass('d-none');
    // document.getElementById('logandRegBtn').classList.replace('d-none','d-block')
    $('.log').removeClass('d-none');
    $('.authBtn').addClass('d-none');
  }
};
checkLogedUser();

//remove account
$(document).on('click', '#LogOutandClear, #mobileLogOutandClear', function() {
  sessionStorage.removeItem('LogedUser');
  checkLogedUser();
});

//open control pannel
$(document).on('click', '#ViewCPanelId, #mobileViewCPanelId', function() {
  const role=sessionStorage.getItem('userRole');
  console.log(role);
  
  switch (role) {

    case 'customer':window.location=('./UserControl.html')
      break;

    case 'seller':window.location=('./SellerControl.html')
      break;
    case 'admin':window.location=('./AdminControl.html')
      break;
  }
});

document.addEventListener('DOMContentLoaded',function (){
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const vh = window.innerHeight;
  function checkScroll(){
    if(window.scrollY > vh){
      scrollToTopBtn.style.opacity = '1';
    }else{
      scrollToTopBtn.style.opacity = '0';
    }
  };

   // Scroll to top function
   scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
 
  // Check scroll position on scroll
  window.addEventListener('scroll', checkScroll);
  
  // Initial check
  checkScroll();

});


// $('#LogOutandClear').click( function() {
//   sessionStorage.removeItem('LogedUser');
//   checkLogedUser();
// })

// $('#ViewCPanelId').click(function(){
//   const role=sessionStorage.getItem('userRole');
//   console.log(role);
  
//   switch (role) {

//     case 'customer':window.location=('./UserControl.html')
//       break;

//     case 'seller':window.location=('./SellerControl.html')
//       break;
//     case 'admin':window.location=('./AdminControl.html')
//       break;
//   }
  
// })














// Display Publish comments
const CommentsContainer=document.getElementById('CommentsContainer');
let  PublishCommentsArr=[];
function pullPublishComments() {
    if (localStorage.getItem('PublishComments')) {
        PublishCommentsArr=JSON.parse(localStorage.getItem('PublishComments'))   
    } 
}
pullPublishComments();

function displayPublishComments() {
 
    pullPublishComments();
    PublishCommentsArr.forEach(comment => {


 let image='../imgs/user.png';

let user= JSON.parse(localStorage.getItem('usersData')).filter(x=>x.userId===comment.userId)[0]

if(user.img){
    image=user.img
}

      
        CommentsContainer.innerHTML+=`
    <li class="splide__slide">
 <div class="card testimonial-card">
     <div class="card-body">
    <div class="quote mb-3">
         <i class="bi bi-quote"></i>
    </div>
     <p class="card-text testimonial-feedback">${comment.message}</p>
     <div class="d-flex align-items-center mt-4">
            <img style="width: 45px;height: 45px;" src="${image}" class="rounded-circle me-3" alt="Customer">
        <div>
         <h6 class="mb-0 fw-bold">${comment.fname} ${comment.lastName}</h6>
         <div class="d-flex align-items-center rate">
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
             <span class="simi ms-1">4.0</span>
         </div>
        </div>
     </div>
    </div>
</div>
 </li>
        
        `
    });
}

// mini search
let ProductsArr=JSON.parse(localStorage.getItem('Products'));
let subcategory = ["Dresses", "Jackets", "Tshirts","Shoeses", "Jeans"];
document.querySelector('.suggestedtopics .row').innerHTML=`   <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                                <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[1]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[2]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[4]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[0]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[3]}</a>
                              </li>
                            </div>`;

document.querySelectorAll('.suggestedtopics a').forEach((a)=>{
a.addEventListener('click', function(e){
e.preventDefault();
let srchterm=encodeURIComponent(this.textContent.trim());
window.location.href=`/srchprod.html?searchterm=${srchterm}`
});
})

 