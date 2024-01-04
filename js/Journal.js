// Path: journal.js
// Create or open the database
var request = window.indexedDB.open("JournalDB", 1);

var db;

request.onupgradeneeded = function(event) {
    db = event.target.result;
    db.createObjectStore("entries", { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    loadEntries();
};

request.onerror = function(event) {
    console.log("Error opening database: " + event.target.errorCode);
};

function loadEntries() {
    var transaction = db.transaction(["entries"], "readonly");
    var objectStore = transaction.objectStore("entries");
    var request = objectStore.openCursor();

    request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            addEntryToPage(cursor.value.date, cursor.value.content);
            cursor.continue();
        }
    };
}

document.getElementById('entry-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var content = document.getElementById('entry-content').value;
    var date = new Date().toLocaleDateString();

    var transaction = db.transaction(["entries"], "readwrite");
    var objectStore = transaction.objectStore("entries");
    var request = objectStore.add({date: date, content: content});

    request.onsuccess = function(event) {
        addEntryToPage(date, content);
    };

    document.getElementById('entry-content').value = '';
});

function addEntryToPage(date, content) {
    var entry = document.createElement('div');
    entry.className = 'entry';

    var entryDate = document.createElement('h2');
    entryDate.textContent = date;
    var entryContent = document.createElement('p');
    entryContent.textContent = content;

    entry.appendChild(entryDate);
    entry.appendChild(entryContent);

    var entries = document.getElementById('entries');
    entries.insertBefore(entry, entries.firstChild);
}
