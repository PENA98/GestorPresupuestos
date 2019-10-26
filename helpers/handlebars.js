const chart =  require('chart.js')

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
    }
}