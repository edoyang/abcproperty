document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.navbar .hamburger');
    const menu = document.querySelector('.navbar .menu');
    const allDropdowns = document.querySelectorAll('.dropdown'); // Select all dropdowns on the page

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Event listener for clicks outside the navbar menu and any dropdown
    document.addEventListener('click', function(event) {
        // Function to check if the click is outside of a given element
        function isClickOutside(targetElement) {
            return !targetElement.contains(event.target);
        }

        // Check if the click is outside the hamburger, menu, and all dropdowns
        if (isClickOutside(hamburger) && isClickOutside(menu) && Array.from(allDropdowns).every(isClickOutside)) {
            // Close the menu
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    });
});
