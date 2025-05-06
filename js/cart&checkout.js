

    $(document).ready(function () {
        // Checkout click
        $("#checkout").click(function () {
          $(".customer-details").removeClass("d-none");
          $(".order-details").addClass("d-none");
          $("#checkout").hide();
          $("#order").show();
        });
      
        // Review click
        $("#reviwe").click(function () {
          $(".customer-details").addClass("d-none");
          $(".order-details").removeClass("d-none");
          $("#checkout").show();
          $("#order").hide();
        });
      
        // Delete item (specific)
        $(".fa-trash").click(function () {
          $(this).closest(".item").remove();
        });
      
        // Increment & Decrement
        $(".increment, .decrement").click(function () {
          const targetId = $(this).data("bs-target");
          const $counter = $(targetId);
          let count = parseInt($counter.text());
      
          if ($(this).hasClass("increment")) {
            count++;
          } else {
            count = Math.max(1, count - 1);
          }
      
          $counter.text(count);
        });
      
        // Form validation
        $('.needs-validation').each(function () {
          $(this).on('submit', function (e) {
            if (!this.checkValidity()) {
              e.preventDefault();
              e.stopPropagation();
            } else {
              $("#congratMsg").removeClass("d-none");
              $("#reviwe").hide();
            }
            $(this).addClass('was-validated');
          });
        });
      });
      