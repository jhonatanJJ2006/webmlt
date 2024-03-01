(function() {
    const monto = document.querySelector('#input-monto');
    const compra = document.querySelector('#compra');

    // Función para mostrar la alerta de error
    function showErrorAlert(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html: message,
        });
    }

    // Función para mostrar la alerta de éxito
    function showSuccessAlert(message) {
        Swal.fire({
            icon: 'success',
            title: 'Transaccion Completada',
            html: message,
        });
    }

    if (monto) {
        window.paypal.Buttons({
            style: {
                shape: "rect",
                layout: "vertical",
                color: "gold",
            },
            createOrder: function(data, actions) {
                // Check if the amount is empty or less than $20
                if (!monto.value.trim() || parseFloat(monto.value) < 20) {
                    // Show an error message
                    showErrorAlert('La transaccion es un dato obligatorio y tiene que ser mayor a $20');
                    // Return false to prevent the order from being created
                    return false;
                }

                // If the amount is valid, create the order
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: monto.value // Replace with the actual amount
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                // Function to handle when the payment is approved
                return actions.order.capture().then(function(details) {
                    // Show a success message
                    showSuccessAlert(`Transaccion Completada por ${details.payer.name.given_name}`);
                    // Call your server to save the transaction
                    // Replace this with your actual implementation
                    return fetch('/api/orders/' + data.orderID + '/capture', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            orderID: data.orderID
                        })
                    });
                });
            },
            onError: function(err) {
                // Function to handle errors
                console.error(err);
                // Show an error message
                showErrorAlert('Ha ocurrido un error al procesar su solicitud.');
            }
        }).render('#paypal-button-container');
    }

    if(compra) {

       // Función para mostrar la alerta de error
        function showErrorAlert(message) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: message,
            });
        }

        // Función para mostrar la alerta de éxito
        function showSuccessAlert(message) {
            Swal.fire({
                icon: 'success',
                title: 'Transaccion Completada',
                html: message,
            }).then(() => {
                // Redirigir al usuario a la página de cursos después de cerrar la alerta
                window.location.href = 'http://localhost:3000/cursos/learn';
            });
        }

        window.paypal.Buttons({
            style: {
                shape: "rect",
                layout: "vertical",
                color: "gold",
            },
            createOrder: function(data, actions) {
                // Check if the amount is empty or less than $20
                if (!compra.value.trim() || parseFloat(compra.value) < 20) {
                    // Show an error message
                    showErrorAlert('La transaccion es un dato obligatorio y tiene que ser mayor a $20');
                    // Return false to prevent the order from being created
                    return false;
                }

                // If the amount is valid, create the order
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: compra.value // Replace with the actual amount
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                // Function to handle when the payment is approved
                return actions.order.capture().then(function(details) {
                    // Show a success message
                    showSuccessAlert(`Transaccion Completada por ${details.payer.name.given_name}`);
                    // Call your server to save the transaction
                    // Replace this with your actual implementation
                    return fetch('http://localhost:3000/api/paypal/update-compras', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            // Send any necessary data to your backend
                        })
                    });
                });
            },
            onError: function(err) {
                // Function to handle errors
                console.error(err);
                // Show an error message
                showErrorAlert('Ha ocurrido un error al procesar su solicitud.');
            }
        }).render('#new-paypal-button-container');


        
    }

})();
