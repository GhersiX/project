window.onload = function() {
    // Set the end date to May 20 of the current year
    var endDate = new Date();
    endDate.setMonth(4); // Months are 0-based in JavaScript
    endDate.setDate(17);
    endDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00

    // If the current date is after May 20, set the end date to May 20 of the next year
    if (new Date() > endDate) {
        endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Function to update the countdown
    function updateCountdown() {
        var now = new Date();
        var remaining = endDate - now;

        var seconds = Math.floor((remaining / 1000) % 60);
        var minutes = Math.floor((remaining / 1000 / 60) % 60);
        var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        var days = Math.floor(remaining / (1000 * 60 * 60 * 24));

        document.getElementById('countdown').textContent = days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds remaining';
    }

    // Update the countdown every second
    setInterval(updateCountdown, 1000);
}