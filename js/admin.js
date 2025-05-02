
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
    $('#offcanvasRight ul li').click(function() {
    $('#offcanvasRight ul li').removeClass('active');
    $(this).addClass('active');
    
}) 


function showDataTbl(name) {
    $('.DataTable').addClass('d-none');  
 $(`#${name}`).removeClass('d-none');
}
$('#logoutBtn').click(
function() {
    localStorage.removeItem('userRole');
    window.location.replace('/pages/register&login.html')
}
)

// comments 
let adminComments=document.getElementById('adminComments')
let CustomerComments=document.getElementById('CustomerComments')
let CommentsArr=[];
const CustomerId=JSON.parse(localStorage.getItem('LogedUser')).userId;

function pullComments() {
    if (localStorage.getItem('Comments')) {
        CommentsArr=JSON.parse(localStorage.getItem('Comments')) 
    } 
    else{
        CommentsArr=[];
    }
}
pullComments();


function displayComments() {
    pullComments();
    adminComments.innerHTML=''
    CommentsArr.forEach(comment => {
        adminComments.innerHTML+=`
         <tr>
    <td>${comment.fname}</td>
   <td>${comment.phonenumber}</td>
                                 
   <td>${comment.message}</td>
    <td>
          <label class="switch">
          <input type="checkbox">
         <span class="slider"></span>
        </label></td>
     <td >
        <button class="btn btn-sm btn-warning m-1"><i class="fas fa-edit"></i></button>
        <button onclick="deleteComment(${comment.commentId})" class="btn btn-sm btn-danger delete-btn m-1"><i class="fas fa-trash"></i></button>
                                       
    </td>    </tr>
        
        `
    });
}
function displayCustomerComments() {
    pullComments();
    CommentsArr=CommentsArr.filter(x=>x.userId==CustomerId);
    CustomerComments.innerHTML=''
    CommentsArr.forEach(comment => {
        CustomerComments.innerHTML+=`
         <tr>
  
                                 
   <td>${comment.message}</td>
   <td>${comment.reply}</td>

     <td >
      
        <button onclick="deleteComment(${comment.commentId})" class="btn btn-sm btn-danger delete-btn m-1"><i class="fas fa-trash"></i></button>
                                       
    </td>    </tr>
        
        `
    });
}
function deleteComment(comId) {
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
   


    displayComments();
    
        $('#deleteAlert').fadeOut();
        $('.alert-content').css({
            'left': '-50%',
          });
    });


    
}

