document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        var dropdownSelected = dropdown.querySelector('.dropdown-selected');
        var dropdownList = dropdown.querySelector('.dropdown-list');
        var dropdownSelectedText = dropdownSelected.querySelector('p');

        dropdownSelected.addEventListener('click', function(event) {
            // Close all other dropdown lists
            dropdowns.forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-list').style.display = 'none';
                }
            });

            // Toggle the current dropdown list
            dropdownList.style.display = dropdownList.style.display === 'flex' ? 'none' : 'flex';
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
        });
    });
});
