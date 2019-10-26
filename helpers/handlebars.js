const Chart =  require('chart.js')

module.exports = {
    categoriesList: (e, options) => {
        const categories = [
        "Automóvil",
        "Casa",
        "Comida",
        "Comunicación",
        "Deportes",
        "Entretenimiento",
        "Facturas",
        "Higiene",
        "Mascotas",
        "Regalos",
        "Restaurantes",
        "Ropa",
        "Salud",
        "Taxi",
        "Transporte",
        "Estudios"
    ];

        let html = "";

        //mostrar las categorias
        categories.forEach(category => {
            html += `<option>${category}</option>`;
        });

        return (options.fn().html = html);
    
    },
    test: (e, options) => {
       console.log(e[0].amount)
       let html = `<h3> L ${e[0].amount} </h3>`;
       return (options.fn().html = html);
    },
    incomeChart: (e, options) => {
        const thisChart = `<canvas id="income" style="height: 303px; width: 609px; display: block;" height="303" width="609" class="chartjs-render-monitor"></canvas>`
    
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
}