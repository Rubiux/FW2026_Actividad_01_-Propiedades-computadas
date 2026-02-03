const app = Vue.createApp({

    data() {
        return {
            catalogo: [
                {
                    modelo: "Samsung Galaxy S23",
                    precio: 18000
                },
                {
                    modelo: "iPhone 14",
                    precio: 22000
                },
                {
                    modelo: "Xiaomi Redmi Note 12",
                    precio: 7000
                },
                {
                    modelo: "Motorola G52",
                    precio: 5500
                }
            ],

            telefonos: [],
            agenda: [],
            modelo: "",
            cantidad: 1,
            precio: 0
        }
    },

    methods: {

        seleccionarCatalogo(item) {
            this.modelo = item.modelo;
            this.precio = item.precio;
        },

        agregarTelefono() {

            if (this.modelo === "" || this.cantidad <= 0 || this.precio <= 0) {
                alert("Completa correctamente los datos");
                return;
            }

            const nuevo = {
                modelo: this.modelo,
                cantidad: this.cantidad,
                precio: this.precio
            };

            // Agregar al almacén
            this.telefonos.push(nuevo);

            // Registrar en agenda
            this.registrarAgenda(nuevo);

            this.limpiar();
        },

        // Guardar movimiento
        registrarAgenda(item) {

            const fecha = new Date().toLocaleString();

            this.agenda.push({
                modelo: item.modelo,
                cantidad: item.cantidad,
                precio: item.precio,
                total: item.cantidad * item.precio,
                fecha: fecha
            });

        },

        aumentar(index) {
            this.telefonos[index].cantidad++;
        },

        disminuir(index) {
            if (this.telefonos[index].cantidad > 1) {
                this.telefonos[index].cantidad--;
            }
        },

        eliminar(index) {
            this.telefonos.splice(index, 1);
        },

        limpiar() {
            this.modelo = "";
            this.cantidad = 1;
            this.precio = 0;
        }

    },

    computed: {

        subtotal() {
            return this.telefonos.reduce((total, t) => {
                return total + (t.cantidad * t.precio);
            }, 0);
        },

        iva() {
            return this.subtotal * 0.16;
        },

        total() {
            return this.subtotal + this.iva;
        },

        contador() {
            return this.telefonos.reduce((sum, t) => {
                return sum + t.cantidad;
            }, 0);
        }

    }

});

const app1 = app.mount('#componente');
