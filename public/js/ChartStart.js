
function incomeChart(e){
    
    let data = [e];
    console.log(e);
    

    Object.keys(e).forEach(function(key) {

        console.log(key, e[key]);
      
      });
    

    let thisChart = document.getElementById("income");
    let lineChart = new Chart(thisChart, {
        type: 'doughnut',
        data: {
            labels: ['comida', 'transporte', 'educacion', 'facturas', 'carro', 'deportes'],
            datasets: [{
                label: "hola",
                data: [10, 2, 5, 6, 7, 9],
                backgroundColor : [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                animateScale: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display: false
                    }
                }]
    
            }
        }
    });
    
}