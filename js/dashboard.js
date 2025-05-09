  const barCtx = document.getElementById("barChart").getContext("2d");
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Sales",
              backgroundColor: "#007bff",
              data: [0, 0, 0, 0, 2500, 3000],
            },
            {
              label: "Orders",
              backgroundColor: "#fd7e14",
              data: [1000, 1600, 2800, 2000, 2300, 2800],
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      // Pie Chart
      const pieCtx = document.getElementById("pieChart").getContext("2d");
      new Chart(pieCtx, {
        type: "doughnut",
        data: {
          labels: ["Completed", "Pending", "Cancelled"],
          datasets: [
            {
              backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
              data: [1800, 1200, 500],
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });