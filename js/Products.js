let category =["Men","Woman","Kids"];
let subcategory =["Dreess","Bag","Tshirt","Shooses",];
let ProductsArr= [
    {               
               id: "1",
                ratingsAverage: 4.8,
                name: "dress", 
               category: "Woman",
                subcategory: "Tshirt",
               description: "jhuo;kghui;hgouho'huohjilj;hkljuybhhhhhhhhhhhhhhklnlhyfgulju",
               quantity: 225,
               real_price: 191,
    Discount: 191,
    EndPrice: 191,
               imageCover: "cov", 
               images: [
                   "1",
   "2",
   "3",
   "4"             
               ],
              "seller_id":5,
   Colors:["red","blue","black"]
           }   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
   ]

   localStorage.setItem('Products',JSON.stringify(ProductsArr));