let productsArr=[];
if(localStorage.getItem('Products')){
    productsArr=JSON.parse(localStorage.getItem('Products'));
    console.log(productsArr);
    
}
//لما اضيف واعدل واحذف من ال |array اجى بعدها واخذن الداتا تاى فى localstorage 
localStorage.setItem('Products',JSON.stringify(productsArr))
