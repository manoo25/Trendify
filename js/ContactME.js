
    'use strict';
let fname=document.getElementById('firstName');
let lastName=document.getElementById('lastName');
let email=document.getElementById('email');
let phonenumber=document.getElementById('phonenumber');
let message=document.getElementById('message');
let Id;
let comentObj={}

    let CommentsArr=[];
    function pullDAta() {
        if (localStorage.getItem('Comments')) {
        CommentsArr=JSON.parse(localStorage.getItem('Comments')) 
    } 
    else{
        CommentsArr=[];
    }
    }
const SubBtn=document.getElementById('SubBtn');
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach((form) => {
        SubBtn.addEventListener('click', (event) => {
           
        if (form.checkValidity()) {   
            pullDAta();
             SendComment();
            clearTxt();
            form.classList.remove('was-validated');
        }
        else{
             form.classList.add('was-validated'); 
        }
    

 
      });
    });

    function SendComment() {
        if(sessionStorage.getItem('LogedUser')){
            Id=JSON.parse(sessionStorage.getItem('LogedUser')).userId;
            comentObj={
                userId:Id,
                commentId:Math.floor(Math.random() * 1000*(Id)+1),
                fname:fname.value,
                lastName:lastName.value,
                email:email.value,
                phonenumber:phonenumber.value,
                message:message.value,
                reply:'',
            }
            CommentsArr.push(comentObj);
            localStorage.setItem('Comments',JSON.stringify(CommentsArr))
        }
        else{
            window.location.replace('./register&login.html')
        }
    }

    function clearTxt() {
 fname.value="";
 lastName.value="";
 email.value="";
 phonenumber.value="";
 message.value="";
        
    }
    // Fname,Lname,Email,Phone,message,userId