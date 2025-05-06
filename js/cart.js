import indexedDB from './indexedDb.js';

let userId;
if (sessionStorage.getItem('LogedUser')) {
   userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}

let CartArr = [];
let WhishListArr = [];

async function initialize() {
    const cartData = await indexedDB.getItem('Cart');
    if (cartData) {
        CartArr = cartData;
    }

 const WhishListDAta = await indexedDB.getItem('WhishList');
    if (WhishListDAta) {
        WhishListArr = WhishListDAta;
    }


    setupEventListeners();
}


  // favorite
    // let heart = document.querySelectorAll('.fa-heart');
    // heart.forEach((btn) => {
    //     btn.addEventListener('click', function() {
    //         btn.classList.toggle('fa-regular');
    //         btn.classList.toggle('fa-solid');
    //     });
    // });

// function setupEventListeners() {
  

//     document.addEventListener('click', async function(e) {
      
//         const btn = e.target.closest('.fa-heart') || 
//                     (e.target.classList.contains('fa-regular') ? e.target : null) || 
//                     (e.target.classList.contains('fa-solid') ? e.target : null);
        
        
//         if (btn) {
//             try {
                
//                 if (!sessionStorage.getItem('LogedUser') || !userId) {
//                     alert('You should login or register first!');
//                     return;
//                 }
               
//                 btn.classList.toggle('fa-regular');
//                 btn.classList.toggle('fa-solid');
      
//                 if (btn.dataset.product) {
//                     await addToCart(btn.dataset.product);
//                 } 
//                 else {
//                     btn.classList.toggle('fa-plus');
//                     btn.classList.toggle('fa-check');
//                 }
//             } 
//             catch (error) {
//                 if (btn.classList.contains('fa-plus') || btn.classList.contains('fa-check')) {
//                     btn.classList.toggle('fa-plus');
//                     btn.classList.toggle('fa-check');
//                 }
//             }
//         }
//     });

//     document.addEventListener('click', async function(e) {
      
//       const btn = e.target.closest('.btnAddToCart') || 
//                   (e.target.classList.contains('fa-plus') ? e.target : null) || 
//                   (e.target.classList.contains('fa-check') ? e.target : null);
      
      
//       if (btn) {
//           try {
              
//               if (!sessionStorage.getItem('LogedUser') || !userId) {
//                   alert('You should login or register first!');
//                   return;
//               }
             
//               btn.classList.toggle('fa-plus');
//               btn.classList.toggle('fa-check');
    
//               if (btn.dataset.product) {
//                   await addToCart(btn.dataset.product);
//               } 
//               else {
//                   btn.classList.toggle('fa-plus');
//                   btn.classList.toggle('fa-check');
//               }
//           } 
//           catch (error) {
//               if (btn.classList.contains('fa-plus') || btn.classList.contains('fa-check')) {
//                   btn.classList.toggle('fa-plus');
//                   btn.classList.toggle('fa-check');
//               }
//           }
//       }
//   });
// }
function setupEventListeners() {
    document.addEventListener('click', async function(e) {

        // Handle heart buttons
        const heartBtn = e.target.closest('.fa-heart') ;
                       
                       
        
        // Handle add to cart buttons
        const cartBtn = e.target.closest('.btnAddToCart') ; 
                      


                       if (!sessionStorage.getItem('LogedUser') || !userId) {
                                          alert('You should login or register first!');
                                          return;
                                      }
                                      
        if (heartBtn) {
            await addToWhishList(heartBtn);
        } 
        else if (cartBtn) {
            await addToCart(cartBtn);
        }
    });
 
}

export async function addToCart(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);
        
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
        btn.classList.toggle('fa-plus');
        btn.classList.toggle('fa-check');
    } catch (error) {
        console.error('Error in addToCart:', error);
    }
}
export async function addToWhishList(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);
        
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

        let existPro = WhishListArr.some(x => x.userId == userId && x.ProId == pro.id);

        if (!existPro) {
            WhishListArr.push(productArrObj);
            alert('Product added to WhishList successfully');
        } else {
            WhishListArr = WhishListArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
            alert('Product removed from WhishList successfully');
        }
        
        await indexedDB.setItem('WhishList', WhishListArr);

      btn.classList.toggle('fa-regular');
        btn.classList.toggle('fa-solid');
    } 
    catch (error) {
        console.error('Error in WhishList:', error);
    }
}

// Initialize the application
initialize();


