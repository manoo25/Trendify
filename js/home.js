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


// Display Publish comments
const CommentsContainer=document.getElementById('CommentsContainer');
let  PublishCommentsArr=[];
function pullPublishComments() {
    if (localStorage.getItem('PublishComments')) {
        PublishCommentsArr=JSON.parse(localStorage.getItem('PublishComments'))   
    } 
}
pullPublishComments();
displayPublishComments();
function displayPublishComments() {
 
    pullPublishComments();
    PublishCommentsArr.forEach(comment => {
        CommentsContainer.innerHTML+=`
    <li class="splide__slide">
 <div class="card testimonial-card">
     <div class="card-body">
    <div class="quote mb-3">
         <i class="bi bi-quote"></i>
    </div>
     <p class="card-text">${comment.message}</p>
     <div class="d-flex align-items-center mt-4">
            <img style="width: 45px;height: 45px;" src="./imgs/1_New1.jpg" class="rounded-circle me-3" alt="Customer">
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