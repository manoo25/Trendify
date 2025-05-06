
    // Initialize variables
    let currentRowToDelete = null;
    
    // Delete button click handler
    $('.delete-btn').on('click', function() {
        currentRowToDelete = $(this).closest('tr');
        $('#deleteAlert').fadeIn();
        $('.alert-content').css({
            'left': '50%',
          });
    });
    
    // Confirm delete
    $('#confirmDelete').on('click', function() {
        if (currentRowToDelete) {
            currentRowToDelete.fadeOut(10, function() {
                $(this).remove();
            });
        }
        $('#deleteAlert').fadeOut();
        $('.alert-content').css({
            'left': '-50%',
          });
    });
    
    // Cancel delete
    $('#cancelDelete').on('click', function() {
        $('#deleteAlert').fadeOut();
        $('.alert-content').css({
            'left': '-50%',
          });
    });
    
    // Close alert 
    $(document).mouseup(function(e) {
        const alertModal = $("#deleteAlert");
      
            alertModal.fadeOut();
            $('.alert-content').css({
                'left': '-50%',
              });
      
    });
    
    // select target li 
    $('#offcanvasLeft ul li').click(function() {
    $('#offcanvasLeft ul li').removeClass('active');
    $(this).addClass('active');
    
}) 


function showDataTbl(name) {
    $('.DataTable').addClass('d-none');  
 $(`#${name}`).removeClass('d-none');
}
$('#logoutBtn').click(
function() {
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('LogedUser');
    window.location.replace('./register&login.html')
}
)

// comments 
let adminComments=document.getElementById('adminComments')
let CustomerComments=document.getElementById('CustomerComments')
let CommentsArr=[];

let CustomerId
try{
    CustomerId =JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
catch{};

function pullComments() {
    if (localStorage.getItem('Comments')) {
        CommentsArr=JSON.parse(localStorage.getItem('Comments')) 
      
        
    } 
    else{
        CommentsArr=[];
    }
}
pullComments();



// published Comments 
let PublishedCommentArr=[];

    if (localStorage.getItem('PublishComments')) {
        PublishedCommentArr=JSON.parse(localStorage.getItem('PublishComments'))  
    } 
    else{
        PublishedCommentArr=[];
    }



// display admin comments 
function displayComments() {
    pullComments();
    adminComments.innerHTML=''
    CommentsArr.forEach(comment => {

var ispublish='';
if (PublishedCommentArr.some(x => x.commentId == comment.commentId)) {
    ispublish='checked';
}

        adminComments.innerHTML+=`
         <tr>
    <td>${comment.fname}</td>
   <td>${comment.phonenumber}</td>
                                 
   <td>${comment.message}</td>
    <td>
          <label class="switch">
          <input onclick="PublishComment(${comment.commentId})" ${ispublish} type="checkbox" >
         <span class="slider"></span>
        </label></td>
     <td >
        <button onclick="ReplyComment(${comment.commentId})" class="btn btn-sm btn-warning m-1" data-bs-toggle="modal" data-bs-target="#personalInfoModal" ><i class="fas fa-edit"></i></button>
        <button onclick="deleteComment(${comment.commentId},'admin')" class="btn btn-sm btn-danger delete-btn m-1"><i class="fas fa-trash"></i></button>
                                       
    </td>    </tr>
        
        `
    });
}
// display user admin comments 
function displayCustomerComments() {
    pullComments();
   
    CommentsArr=CommentsArr.filter(x=>x.userId==CustomerId);
    CustomerComments.innerHTML=''
    CommentsArr.forEach(comment => {
         let Reply=comment.reply;
    if (comment.reply=='') {
        Reply="No Reply"
    }
        CustomerComments.innerHTML+=`
         <tr>
  
                                 
   <td>${comment.message}</td>
   <td>${Reply}</td>

     <td >
      
        <button onclick="deleteComment(${comment.commentId},'customer')" class="btn btn-sm btn-danger delete-btn m-1"><i class="fas fa-trash"></i></button>
                                       
    </td>    </tr>
        
        `
    });
}

function deleteComment(comId,role) {
    $('#deleteAlert').fadeIn();
    $('.alert-content').css({
        'left': '50%',
      });

      $('#confirmDelete').on('click', function() {
       let UpdateComments = CommentsArr.filter(x => x.commentId !== comId);
    CommentsArr=UpdateComments;
localStorage.setItem('Comments',JSON.stringify(CommentsArr));
    if (CommentsArr.length==0) {
        localStorage.removeItem('Comments');
    }
    PublishedCommentArr=PublishedCommentArr.filter(x=>x.commentId!=comId)
    localStorage.setItem('PublishComments',JSON.stringify(PublishedCommentArr));
   if (role=='admin') {
    displayComments(); 
   }
   else if(role=='customer'){
       displayCustomerComments(); 
   }
 
        $('#deleteAlert').fadeOut();
        $('.alert-content').css({
            'left': '-50%',
          });
    });
}




function PublishComment(comId){
    if (PublishedCommentArr.some(x => x.commentId == comId)) {
     PublishedCommentArr=PublishedCommentArr.filter(x=>x.commentId!=comId)
        localStorage.setItem('PublishComments',JSON.stringify(PublishedCommentArr));
      } 
      else {
        PublishedCommentArr.push(CommentsArr.find(x => x.commentId == comId));
        localStorage.setItem('PublishComments',JSON.stringify(PublishedCommentArr))
        
      }
}



// reply to comments 
let CommReplyID;
    let Reply=document.getElementById('Reply');
    let UserComment=document.getElementById('UserComment');
// Display data to modal 
function ReplyComment(comId) { 
     CommReplyID=comId;
    let index=CommentsArr.findIndex(x=>x.commentId==comId);

    UserComment.value=CommentsArr[index].message;
       Reply.value=CommentsArr[index].reply;   
}

// Save reply

function saveReply(btn) {
    let CommIndex=CommentsArr.findIndex(x=>x.commentId==CommReplyID);
    if (CommIndex !== -1) {
        CommentsArr[CommIndex].reply = Reply.value;
       
if(Reply.value!=''){
   localStorage.setItem('Comments',JSON.stringify(CommentsArr));     
      btn.setAttribute('data-bs-dismiss', 'modal');
        Reply.value="";
      btn.click();
      
}
else{
    btn.removeAttribute('data-bs-dismiss');
}

     displayComments();
      }
}

