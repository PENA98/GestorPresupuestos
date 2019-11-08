const Chart =  require('chart.js');

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
        "Estudios",
        "Otros"
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
    cardTotal: (e, options) => {
        let totalAmount = 0;
        e.creditCard.forEach(am => {
            totalAmount += am.amount
        });
        let html = `<h3> L ${totalAmount} </h3>`;
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
                    <td style="display:none;">${inc._id}</td>
                    <td>
                        <a id="${inc._id}" class="inc edt" href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit "></i></a>
                    </td>
                    <td>
                        <a href="/delete/income/${inc._id}" ><i class="fa fa-trash-o"></i></a>
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
                    <td style="display:none;">${exp._id}</td>
                    <td>
                        <a id="${exp._id}" class="exp edt" href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit "></i></a>
                    </td>
                    <td>
                        <a href="/delete/expense/${exp._id}"><i class="fa fa-trash-o"></i></a>
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
                        <a id="${exp._id}" class="exp edt" href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit "></i></a>
                    </td>
                    <td>
                        <a href="/delete/expense/${exp._id}"><i class="fa fa-trash-o"></i></a>
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
                        <a id="${inc._id}" class="inc edt" href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit "></i></a>
                    </td>
                    <td>
                    <a href="/delete/income/${inc._id}" ><i class="fa fa-trash-o"></i></a>
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
    miniSaveMaker1: (e, options) => {


        let html = "";
        let html2 = "";
        let count = 0
        
        e.savings.forEach(sv =>{
            let percentage = 0;
            count += 1
            percentage = Math.round((sv.amount/sv.goal)*100)

            html +=`<li>
                    <!-- Task item -->
                    <a href="/savings">
                    <h3>
                        ${sv.name}
                        <small class="pull-right">${percentage}%</small>
                    </h3>
                    <div class="progress xs">
                        <div class="progress-bar progress-bar-aqua" style="width: ${percentage}%" role="progressbar"
                        aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                        <span class="sr-only">${percentage}% Complete</span>
                        </div>
                    </div>
                    </a>
                </li>`
        })
        

        html2 += `<li class="dropdown tasks-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger">${count}</span>
                </a>
                <ul class="dropdown-menu">
                <li class="header">Tus ahorros</li>
                <li>
                    <!-- inner menu: contains the actual data -->
                    <ul class="menu">
                    ${html}
                    </ul>
                </li>
                <li class="footer">
                    <a href="/savings">Ver todos los ahorros</a>
                </li>
                </ul>
            </li>`
        
       /*
       
       

       */
        
    

        return (options.fn().html = html2);

    },
    showMessages: (errors = {}, alerts) => {
        let cate = Object.keys(errors);
        
        let html = "";

            if (cate.length) {

                
                errors[cate].forEach(mess => {

                    if (cate == "Hecho") {

                        html +=`<div id="toast-container" class="toast-top-right">
                            <div class="toast toast-success" aria-live="assertive">
                            <div class="toast-title">${cate}

                            </div>
                            <div class="toast-message">${mess}
                            </div>
                            </div>
                            </div>`
                        
                    } else if (cate == "error") {
                        html +=`<div id="toast-container" class="toast-top-right">
                            <div class="toast toast-error" aria-live="assertive">
                            <div class="toast-title">${cate}

                            </div>
                            <div class="toast-message">${mess}
                            </div>
                            </div>
                            </div>`
                    }
                    
                })
            }
        
        
        return (alerts.fn().html = html);

    },
    cardMaker: (e, options) => {


        let html = "";

        e.creditCard.forEach(sv =>{
            let percentage = 0;

            percentage = Math.round((sv.amount/sv.limit)*100)

            html +=`<div class="col-lg-4">
            <div class="box box-success ">
            <div class="box-header with-border">
            <h2>${sv.name}</h2>
            </div><div class="box-body">
                <div class="row">
                <div class="col-lg-4">
                <h3>Porcentaje</h3>
                <strong class="text-red">L ${sv.amount}.00 - ${percentage}%</strong>
                </div><div class="col-lg-4">
                <h3>Fecha de pago</h3>
                <strong class="text-red">${sv.payDate}</strong>
                </div>
                <div class="col-lg-4">
                <h3>Límite</h3>
                <strong class="text-green">L ${sv.limit}.00</strong>
                </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="progress">
                            <div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%">
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
    budgetMaker: (e, options) => {


        let html = "";



        e.budget.forEach(sv =>{
            let percentage = 0;

            let totalAmount = 0;
            e.expense.forEach(expe => {
                totalAmount += expe.amount
            });
    

            percentage = Math.round((totalAmount/sv.amount)*100)

            html +=`<div class="row justify-content-between">
                    <div class="col-lg-4">
                    <h4>Porcentaje gastado</h4>
                    <h2><strong>L ${totalAmount}.00 - ${percentage}%</strong></h2>
                    </div>
                    <div class="col-lg-4"></div>
                    <div class="col-lg-4">
                    <h4>Límite</h4>
                    <h2><strong>L ${sv.amount}.00</strong></h2>
                    </div>
                    </div>

                    <div class="progress">
                    <div class="progress-bar progress-bar-yellow" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%">
                    <span class="sr-only">${percentage}% Complete (warning)</span>
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

    }
}