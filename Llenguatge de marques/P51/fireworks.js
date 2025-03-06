window.onload = function() {
    // Función para obtener colores brillantes y vibrantes
    function getRandomColor() {
        const colors = ["#FF6347", "#FF4500", "#FFD700", "#32CD32", "#1E90FF", "#800080", "#FF1493", "#FFFF00"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Crear el fuego artificial
    function createFirework() {
        const firework = document.createElement("div");
        firework.classList.add("firework");

        // Establecer un color brillante y aleatorio para el fuego principal
        firework.style.backgroundColor = getRandomColor();

        // Posición aleatoria en cualquier lugar de la ventana
        firework.style.left = Math.random() * window.innerWidth + "px"; 
        firework.style.bottom = Math.random() * window.innerHeight * 0.8 + "px";  // Posición aleatoria, ahora en toda la pantalla

        // Añadir el fuego al contenedor
        document.getElementById("fireworks-container").appendChild(firework);

        // Generar fragmentos después de la explosión
        setTimeout(() => {
            for (let i = 0; i < 25; i++) { // Usamos 25 fragmentos para no sobrecargar
                const fragment = document.createElement("div");
                fragment.classList.add("firework");

                // Asignar un color brillante a los fragmentos
                fragment.style.backgroundColor = getRandomColor();

                // Calcular un ángulo aleatorio entre 0 y 360 grados
                const randomAngle = Math.random() * 2 * Math.PI;  // Ángulo aleatorio en radianes
                fragment.style.setProperty('--random-angle', randomAngle); // Asignar el ángulo como variable CSS

                // Posicionar los fragmentos en el lugar de la explosión
                fragment.style.left = firework.style.left;
                fragment.style.bottom = firework.style.bottom;

                // Añadir fragmento al contenedor
                document.getElementById("fireworks-container").appendChild(fragment);

                // Eliminar el fragmento después de la animación
                setTimeout(() => {
                    fragment.remove();
                }, 2000);  // Después de 2 segundos
            }
        }, 600);  // Retraso para los fragmentos

        // Eliminar el fuego principal después de la animación
        setTimeout(() => {
            firework.remove();
        }, 2000); // Después de 2 segundos
    }

    // Generar fuegos cada 500ms para aumentar la densidad sin sobrecargar
    setInterval(createFirework, 500); // Generar más rápido pero con menos fragmentos
}
