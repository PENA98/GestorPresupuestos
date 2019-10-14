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
        categories.forEach(caregory => {
            html += `<li>${caregory}</li>`;
        });

        return (options.fn().html = html);
    
    },
    namePrinter: (e, options) => {
        let name = e.split(" ", 2 )
        let html = "";
        html += `   <span class="user-name">${name[0]}
                            
                        <strong>${name[1]}</strong>
                    </span>`
        return (options.fn().html = html);
    }
}