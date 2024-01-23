document.addEventListener("DOMContentLoaded", function() {
    var memberData = [
        {
            "name": "EDOARDO",
            "role": "Front-End Developer",
            "imageSrc": "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        },
        {
            "name": "EDOARDO",
            "role": "Backend Developer",
            "imageSrc": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
        },
        {
            "name": "EDOARDO",
            "role": "Senior Developer",
            "imageSrc": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "name": "EDOARDO",
            "role": "Project Manager",
            "imageSrc": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "name": "Tomáš Zúbrik",
            "role": "Figma, UI/UX Designer",
            "imageSrc": "https://s3-alpha.figma.com/profile/bc46ba90-d575-43c5-b467-e264b17111dd"
        },
    ];

    var teamCards = document.querySelectorAll('.team-member-grid .team-card:not(.our-team-description)');

    teamCards.forEach(function(card, index) {
        if (index < memberData.length) {
            var member = memberData[index];
            card.querySelector('.member-image').src = member.imageSrc;
            card.querySelector('.member-image').alt = member.name;
            card.querySelector('.member-name').textContent = member.name;
            card.querySelector('.member-role').textContent = member.role;
        }
    });
});
