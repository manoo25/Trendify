import indexedDB from './indexedDb.js';

let userId;
if (sessionStorage.getItem('LogedUser')) {
   userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}

let CartArr = [];

async function initialize() {
    const cartData = await indexedDB.getItem('Cart');
    if (cartData) {
        CartArr = cartData;
    }

    setupEventListeners();
}

function setupEventListeners() {
    // favorite
    let heart = document.querySelectorAll('.fa-heart');
    heart.forEach((btn) => {
        btn.addEventListener('click', function() {
            btn.classList.toggle('fa-regular');
            btn.classList.toggle('fa-solid');
        });
    });

    // cart
    // let cart = document.querySelectorAll('.fa-plus');
    // cart.forEach((btn) => {
    //     btn.addEventListener('click', async function(e) {
    //         if (sessionStorage.getItem('LogedUser') && userId) {
    //             btn.classList.toggle('fa-plus');
    //             btn.classList.toggle('fa-check');
    //             await addToCart(btn.dataset.product);
    //         } else {
    //             alert('You should to login or register !!!');
    //         }
    //     });
    // });


    document.addEventListener('click', async function(e) {
      
      const btn = e.target.closest('.btnAddToCart') || 
                  (e.target.classList.contains('fa-plus') ? e.target : null) || 
                  (e.target.classList.contains('fa-check') ? e.target : null);
      
      
      if (btn) {
          try {
              
              if (!sessionStorage.getItem('LogedUser') || !userId) {
                  alert('You should login or register first!');
                  return;
              }
             
              btn.classList.toggle('fa-plus');
              btn.classList.toggle('fa-check');
    
              if (btn.dataset.product) {
                  await addToCart(btn.dataset.product);
              } 
              else {
                  btn.classList.toggle('fa-plus');
                  btn.classList.toggle('fa-check');
              }
          } 
          catch (error) {
              if (btn.classList.contains('fa-plus') || btn.classList.contains('fa-check')) {
                  btn.classList.toggle('fa-plus');
                  btn.classList.toggle('fa-check');
              }
          }
      }
  });
}

export async function addToCart(product) {
    try {
        let pro = JSON.parse(product);
        
        let productCartObj = {
            userId: userId,
            ProId: pro.id,
            id: Math.floor(Math.random() * 1000 * (userId) + 1),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            imageCover: pro.imageCover,
            Color: pro.Colors[0],
        };

        let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.id);

        if (!existPro) {
            CartArr.push(productCartObj);
            alert('Product added to cart successfully');
        } else {
            CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
            alert('Product removed from cart successfully');
        }
        
        await indexedDB.setItem('Cart', CartArr);
    } catch (error) {
        console.error('Error in addToCart:', error);
    }
}

// Initialize the application
initialize();


