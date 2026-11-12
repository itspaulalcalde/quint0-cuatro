
/* ROOMS */

const roomTabs = document.querySelectorAll(".room-tab");
const roomPanels = document.querySelectorAll(".room-panel");

roomTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        const selectedRoom = tab.dataset.room;

        // Desactivar todas las categorías
        roomTabs.forEach(function(item) {
            item.classList.remove("active");
        });

        // Ocultar todas las galerías
        roomPanels.forEach(function(panel) {
            panel.classList.remove("active");
        });

        // Activar categoría seleccionada
        tab.classList.add("active");

        // Mostrar galería correspondiente
        document.getElementById(selectedRoom)
            .classList.add("active");

    });

});
