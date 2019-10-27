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
        let counter = 0;
        //mostrar las categorias
        categories.forEach(category => {
            counter += 1
            html +=`<tr>
                    <td>${counter}.</td>
                    <td>${category}</td>
            
                    </tr>`
        });

        console.log(e);
        
        e.category.forEach(list => {
            counter += 1
            html +=`<tr>
                    <td>${counter}.</td>
                    <td>${list.name}</td>
                    </tr>`
        })
        /*
        <tr>
                  <td>1.</td>
                  <td>Update software</td>
                  
                </tr>        
        */

        return (options.fn().html = html);
    
    },
    categoriesListForSelect: (e, options) => {
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
            html +=`<option>${category}</option>`
        });

        console.log(e);
        
        e.category.forEach(list => {
            html +=`<option>${list.name}</option>`
        })
        /*
        <tr>
                  <td>1.</td>
                  <td>Update software</td>
                  
                </tr>        
        */

        return (options.fn().html = html);
    
    },
    incomeTotal: (e, options) => {
       let totalAmount = 0;
       e.forEach(income => {
           totalAmount += income.amount
       });
       let html = `<h3> L ${totalAmount} </h3>`;
       return (options.fn().html = html);
    },
    expenseTotal: (e, options) => {
        let totalAmount = 0;
        e.forEach(expense => {
            totalAmount += expense.amount
        });
        let html = `<h3> L ${totalAmount} </h3>`;
        return (options.fn().html = html);
    },
    balance: (i, e,  options) => {
        let totalIncome = 0;
        let totalExpense = 0;
        i.forEach(income => {
            totalIncome += income.amount
        });

        e.forEach(expense => {
            totalExpense += expense.amount
        });

        let html = `<h3> L ${totalIncome - totalExpense} </h3>`;
        return (options.fn().html = html);
    },
    tableMaker: (e,  options) => {
        let html = "";
        let counter = 0;
        e.income.reverse().forEach(inc =>{
            counter += 1;
            html += `
                    <tr>
                    <td>${counter}</td>
                    <td>${inc.date}</td>
                    <td>${inc.comment}</td>
                    <td>${inc.category}</td>
                    <td>${inc.account}</td>
                    <td class="text-green">L ${inc.amount}</td>
                    <td>
                        <a href="#"><i class="fa fa-edit"></i></a>
                    </td>
                    <td>
                        <a href="#"><i class="fa fa-trash-o"></i></a>
                    </td>
                    </tr>
                    `
        });
        e.expense.reverse().forEach(exp =>{
            
            counter += 1;
            html += `
                    <tr>
                    <td>${counter}</td>
                    <td>${exp.date}</td>
                    <td>${exp.comment}</td>
                    <td>${exp.category}</td>
                    <td>${exp.account}</td>
                    <td class="text-red">L ${exp.amount}</td>
                    <td>
                        <a href="#"><i class="fa fa-edit"></i></a>
                    </td>
                    <td>
                        <a href="#"><i class="fa fa-trash-o"></i></a>
                    </td>
                    </tr>
                    `
        });

        return (options.fn().html = html);
    },
    expenseTableMaker: (e,  options) => {
        let html = "";
        let counter = 0;
        e.expense.reverse().forEach(exp =>{
            
            counter += 1;
            html += `
                    <tr>
                    <td>${counter}</td>
                    <td>${exp.date}</td>
                    <td>${exp.comment}</td>
                    <td>${exp.category}</td>
                    <td>${exp.account}</td>
                    <td class="text-red">L ${exp.amount}</td>
                    <td>
                        <a href="/edit/:${exp._id}"><i class="fa fa-edit"></i></a>
                    </td>
                    <td>
                        <a href="#"><i class="fa fa-trash-o"></i></a>
                    </td>
                    </tr>
                    `
        });

        return (options.fn().html = html);
    },
    incomeTableMaker: (e,  options) => {
        let html = "";
        let counter = 0;
        e.income.reverse().forEach(inc =>{
            console.log(inc.date);
            counter += 1;
            html += `
                    <tr>
                    <td>${counter}</td>
                    <td>${inc.date}</td>
                    <td>${inc.comment}</td>
                    <td>${inc.category}</td>
                    <td>${inc.account}</td>
                    <td class="text-green"> L ${inc.amount}</td>
                    <td>
                        <a href="#"><i class="fa fa-edit"></i></a>
                    </td>
                    <td>
                        <a href="#"><i class="fa fa-trash-o"></i></a>
                    </td>
                    </tr>
                    `
        });

        return (options.fn().html = html);
    },
    savingList: (e, options) => {
        
        let html = "";
        e.savings.forEach(sav =>{
            html += `<option>${sav.name}</option>`;
        })
        
    

        return (options.fn().html = html);
    },
    cardList: (e, options) => {
        
        let html = "";
        e.creditCard.forEach(cr =>{
            html += `<option>${cr.name}</option>`;
        })
        
    

        return (options.fn().html = html);
    },
    accountList: (e, options) => {
        
        let html = "";
        e.account.forEach(cr =>{
            html += `<option>${cr.name}</option>`;
        })
        
    

        return (options.fn().html = html);
    },
    saveMaker: (e, options) => {


        let html = "";

        e.savings.forEach(sv =>{
            let percentage = 0;

            percentage = Math.round((sv.amount/sv.goal)*100)

            html +=`<div class="col-lg-4">
            <div class="box box-success ">
            <div class="box-header with-border">
            <h2>${sv.name}</h2>
            </div><div class="box-body">
                <div class="row">
                <div class="col-lg-4">
                <h3>Porcentaje</h3>
                <strong class="text-green">L ${sv.amount}.00 - ${percentage}%</strong>
                </div><div class="col-lg-4">
                </div>
                <div class="col-lg-4">
                <h3>Meta</h3>
                <strong class="text-green">L ${sv.goal}.00</strong>
                </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="progress">
                            <div class="progress-bar progress-bar-green" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%">
                            <span class="sr-only">${percentage}% Complete (success)</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </div>`
        })
        
        
       /*
       
       

       */
        
    

        return (options.fn().html = html);

    },
    accountMaker: (e, options) => {


        let html = "";
        
        
        e.account.forEach(cr =>{
            let incom = 0;
            let expens = 0;
            html +=`<div class="col-lg-4">
                    <div class="box box-success ">
                    <div class="box-header with-border">
                    <h2>${cr.name}</h2>
                    </div>`
            e.income.forEach(inc =>{
                if (inc.account == cr.name) {
                    incom += inc.amount
                }
            })
                html +=`<div class="box-body">
                        <div class="row">
                        <div class="col-lg-4">
                        <h3>Ingresos</h3>
                        <strong class="text-green">L ${incom}.00</strong>
                        </div>`
            e.expense.forEach(exp =>{
                if (exp.account == cr.name) {
                    expens += exp.amount
                }
            })

                html +=`<div class="col-lg-4">
                        <h3>Gastos</h3>
                        <strong class="text-red">L ${expens}.00</strong>
                        </div>
                        <div class="col-lg-4">
                        <h3>Saldo</h3>
                        <strong class="text-green">L ${incom-expens}.00</strong>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        
                        `
        })
        
    

        return (options.fn().html = html);

    },
    incomeChart: (e, options) => {
        const thisChart = document.getElementById("income");
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