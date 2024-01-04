// Create or open the database
var request = window.indexedDB.open("PoemsDB", 1);

var db;

request.onupgradeneeded = function(event) {
    db = event.target.result;
    db.createObjectStore("poems", { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    loadPoems();
};

request.onerror = function(event) {
    console.log("Error opening database: " + event.target.errorCode);
};

function loadPoems() {
    var transaction = db.transaction(["poems"], "readonly");
    var objectStore = transaction.objectStore("poems");
    var request = objectStore.openCursor();

    request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            addPoemToPage(cursor.value.title, cursor.value.body);
            cursor.continue();
        }
    };
}

document.getElementById('poem-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('poem-title').value;
    var body = document.getElementById('poem-body').value;

    var transaction = db.transaction(["poems"], "readwrite");
    var objectStore = transaction.objectStore("poems");
    var request = objectStore.add({title: title, body: body});

    request.onsuccess = function(event) {
        addPoemToPage(title, body);
    };

    document.getElementById('poem-title').value = '';
    document.getElementById('poem-body').value = '';
});

function addPoemToPage(title, body) {
    var poem = document.createElement('div');
    poem.className = 'poem';

    // Create the poem title and body
    var poemTitle = document.createElement('h2');
    poemTitle.textContent = title;
    var poemBody = document.createElement('p');
    poemBody.textContent = body;

    // Add the title and body to the poem div
    poem.appendChild(poemTitle);
    poem.appendChild(poemBody);

    // Add the poem div to the page
    document.getElementById('poem-display').appendChild(poem);
}
