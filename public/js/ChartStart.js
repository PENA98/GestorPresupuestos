
function incomeChart(e){
    const obj = JSON.parse(e)
    
    console.log(obj.income);

    let labelz = [];
    let numbers = [];
    
    obj.income.forEach(inc => {
        console.log(inc.account);
        if (!labelz.includes(inc.account)) {
            labelz.push(inc.account);
        }
    });

    labelz.forEach(function(lab, index){
        let sum = 0;
        obj.income.forEach(inc => {
            if (lab == inc.account) {
                console.log(inc.amount);
                sum += Number(inc.amount);
            }
        });
        numbers.push(sum);
    })


    
    console.log(labelz);
    console.log(numbers)
    

    let thisChart = document.getElementById("income");
    
    
    let lineChart = new Chart(thisChart, {
        type: 'doughnut',
        data: {
            labels: labelz,
            datasets: [{
                label: "hola",
                data: numbers,
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


    let labelz2 = [];
    let numbers2 = [];
    
    obj.expense.forEach(inc => {
        console.log(inc.account);
        if (!labelz2.includes(inc.account)) {
            labelz2.push(inc.account);
        }
    });

    labelz2.forEach(function(lab, index){
        let sum = 0;
        obj.expense.forEach(inc => {
            if (lab == inc.account) {
                console.log(inc.amount);
                sum += Number(inc.amount);
            }
        });
        numbers2.push(sum);
    })


    
    console.log(labelz2);
    console.log(numbers2)
    

    let thisChart2 = document.getElementById("expenses");
    
    
    let lineChart2 = new Chart(thisChart2, {
        type: 'doughnut',
        data: {
            labels: labelz2,
            datasets: [{
                label: "hola",
                data: numbers2,
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

    console.log(lineChart);
    
    
}