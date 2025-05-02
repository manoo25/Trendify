
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