
function incomeChart(e){
    const obj = JSON.parse(e)
    

    let labelz = [];
    let numbers = [];
    
    obj.income.forEach(inc => {
        if (!labelz.includes(inc.account)) {
            labelz.push(inc.account);
        }
    });

    labelz.forEach(function(lab, index){
        let sum = 0;
        obj.income.forEach(inc => {
            if (lab == inc.account) {
                sum += Number(inc.amount);
            }
        });
        numbers.push(sum);
    })





    

    let thisChart = document.getElementById("income");
    
    
    let lineChart = new Chart(thisChart, {
        type: 'doughnut',
        data: {
            labels: labelz,
            datasets: [{
                label: "hola",
                data: numbers,
                backgroundColor : [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
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


    let labelz2 = [];
    let numbers2 = [];
    
    obj.expense.forEach(inc => {
        
        if (!labelz2.includes(inc.account)) {
            labelz2.push(inc.account);
        }
    });

    labelz2.forEach(function(lab, index){
        let sum = 0;
        obj.expense.forEach(inc => {
            if (lab == inc.account) {
                
                sum += Number(inc.amount);
            }
        });
        numbers2.push(sum);
    })


    
  
    

    let thisChart2 = document.getElementById("expenses");
    
    
    let lineChart2 = new Chart(thisChart2, {
        type: 'doughnut',
        data: {
            labels: labelz2,
            datasets: [{
                label: "hola",
                data: numbers2,
                backgroundColor : [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
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


    let labelz3 = [];
    let numbers3 = [];
    
    obj.expense.forEach(inc => {
        
        if (!labelz3.includes(inc.category)) {
            labelz3.push(inc.category);
        }
    });

    labelz3.forEach(function(lab, index){
        let sum = 0;
        obj.expense.forEach(inc => {
            if (lab == inc.category) {
                
                sum += Number(inc.amount);
            }
        });
        numbers3.push(sum);
    })


    

    

    let thisChart3 = document.getElementById("categories");
    
    
    let lineChart3 = new Chart(thisChart3, {
        type: 'bar',
        data: {
            labels: labelz3,
            datasets: [{
                label: "gastos por categorias",
                data: numbers3,
                backgroundColor : [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)'
                ],
                borderColor: [
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)'
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
                            beginAtZero: true
                        }
 
                }]
    
            }
        }
    });





    
    
}