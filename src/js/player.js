(function() {

    document.addEventListener('DOMContentLoaded', function() {

        // Obtener el elemento de video
        var video = document.getElementById('player_html5_api');
    
        // Función para ocultar el div
        function ocultarDiv() {
            document.querySelector('.player__contenedor').style.display = 'none';
        }
    
        // Detectar cuando se añade la clase de error
        video.addEventListener('error', function() {
            ocultarDiv();
        });
    
        // Detectar cuando se muestra el mensaje de error
        video.addEventListener('texttrackchange', function() {
            var errorText = 'The media could not be loaded, either because the server or network failed or because the format is not supported.';
            if (video.error && video.error.message === errorText) {
                ocultarDiv();
            }
        });
    
    });
    

})();
