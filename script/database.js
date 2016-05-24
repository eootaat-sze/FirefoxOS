console.log("database.js");
var connection = window.indexedDB.open("Konyv", 1);

if (!window.indexedDB) {
    console.log("Something is wrong with the indexedDB...");
}

connection.onupgradeneeded = function(event) {
    console.log("onupgradeneeded");
    var database = event.currentTarget.result;
    var konyvObjectStore = database.createObjectStore("Konyv", {keyPath: "Id", autoIncrement: true});
    var szerzo = konyvObjectStore.createIndex("Szerzo", "Szerzo", {unique: false});
    var cim = konyvObjectStore.createIndex("Konyv", "Konyv", {unique: false});
    var megjegyzes = konyvObjectStore.createIndex("Megjegyzes", "Megjegyzes", {unique: false});
    var olvastam = konyvObjectStore.createIndex("Olvasva", "Olvasva", {unique: false});
};

connection.onsuccess = function(event) {
    console.log("onsuccess");
    console.log("objectStore létrehozva");
    window.location.href = "index.html";
};

connection.onerror = function(event) {
    console.log("Database error: " + event.target.errorCode);
};
