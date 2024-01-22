document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.querySelectorAll('.dropdown');
    const hamburger = document.querySelector('.navbar .hamburger');
    const menu = document.querySelector('.navbar .menu');

    dropdowns.forEach(function(dropdown) {
        var dropdownSelected = dropdown.querySelector('.dropdown-selected');
        var dropdownList = dropdown.querySelector('.dropdown-list');
        var dropdownContent = dropdown.querySelector('.dropdown-content');
        var dropdownSelectedText = dropdownSelected.querySelector('p');

        dropdownSelected.addEventListener('click', function(event) {
            // Close all other dropdown lists and reset their z-index
            dropdowns.forEach(function(otherDropdown) {
                var otherList = otherDropdown.querySelector('.dropdown-list');
                if (otherDropdown !== dropdown) {
                    otherList.style.display = 'none';
                    otherList.parentElement.style.zIndex = ''; // Reset z-index
                }
            });

            // Toggle the current dropdown list
            if (dropdownList.style.display === 'flex') {
                dropdownList.style.display = 'none';
                dropdownContent.style.zIndex = ''; // Reset z-index
            } else {
                dropdownList.style.display = 'flex';
                dropdownContent.style.zIndex = '10'; // Bring to front
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            event.stopPropagation();
        });

        dropdownList.addEventListener('click', function(event) {
            if (event.target.tagName === 'P') {
                dropdownSelectedText.textContent = event.target.textContent;
                dropdownList.style.display = 'none';
            }
            event.stopPropagation();
        });
    });

    document.addEventListener('click', function() {
        // Close all dropdown lists when clicking outside
        dropdowns.forEach(function(dropdown) {
            dropdown.querySelector('.dropdown-list').style.display = 'none';
            dropdown.querySelector('.dropdown-content').style.zIndex = '';
        });
    });
});
