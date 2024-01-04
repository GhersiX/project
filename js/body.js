var photos = [];

document.getElementById('photo-form').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the date and file from the form
    var date = document.getElementById('photo-date').value;
    var file = document.getElementById('photo-file').files[0];

    // Create a new photo object and add it to the photos array
    var photo = { date: date, file: URL.createObjectURL(file) };
    photos.push(photo);

    // Clear the form
    document.getElementById('photo-date').value = '';
    document.getElementById('photo-file').value = '';
});

document.getElementById('view-all').addEventListener('click', function() {
    // Sort the photos by date from most recent to oldest
    photos.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    // Display all photos
    var photosDiv = document.getElementById('photos');
    photosDiv.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
        var img = document.createElement('img');
        img.src = photos[i].file;
        photosDiv.appendChild(img);
    }
});

document.getElementById('view-date-form').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the date from the form
    var date = document.getElementById('view-date').value;

    // Display the photos from the specified date
    var photosDiv = document.getElementById('photos');
    photosDiv.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
        if (photos[i].date === date) {
            var img = document.createElement('img');
            img.src = photos[i].file;
            photosDiv.appendChild(img);
        }
    }

    // Clear the form
    document.getElementById('view-date').value = '';
});