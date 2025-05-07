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


function setupEventListeners() {
    document.addEventListener('click', async function(e) {

        // Handle heart buttons
        const heartBtn = e.target.closest('.fa-heart') ;                          
        // Handle add to cart buttons
        const cartBtn = e.target.closest('.btnAddToCart') ; 
                      
                                      
        if (heartBtn) {
            if (!sessionStorage.getItem('LogedUser') || !userId) {
                alert('You should login or register first!');
                return;
            }
            await addToWhishList(heartBtn);
        } 
        else if (cartBtn) {
            if (!sessionStorage.getItem('LogedUser') || !userId) {
                alert('You should login or register first!');
                return;
            }
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
            OrderId: 0,
            id: Math.floor(Math.random() * 1000 * (userId) + 1),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            imageCover: pro.imageCover,
            qty: 1,
            Color: pro.Colors[0],
        };

        let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.id);

        if (!existPro) {
            CartArr.push(productCartObj);
            Swal.fire({
                icon: 'success',
                title: 'added successfully !',
                text: `added to cart successfully`,
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
        } else {
            CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
            Swal.fire({
                icon: 'success',
                title: 'Removed from cart',
                text: 'Remove from cart successfully',
                showConfirmButton: false,
                timer: 1600,
                toast: true,
                position: 'top-end',
                background: 'var(--card-color)',
                color: 'var(--error)', // أو خليه main-color لو حابب يكون نفس الثيم
                iconColor: 'var(--error)',
                customClass: {
                  popup: 'custom-swal-popup',
                  title: 'custom-swal-title',
                  content: 'custom-swal-content'
                }
              });
        }
        
        await indexedDB.setItem('Cart', CartArr);
        btn.classList.toggle('fa-plus');
        btn.classList.toggle('fa-check');
    } 
    catch (error) {
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


