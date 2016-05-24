window.onload = function() {
    document.getElementById("Felvitel").addEventListener('click', function() {
        var connection = window.indexedDB.open("Konyv", 1);

        connection.onsuccess = function(event) {
            console.log("Siker!");
            var db = event.target.result;
            var transaction = db.transaction("Konyv", "readwrite");

            transaction.oncomplete = function() {
                db.close();
            };

            transaction.onerror = function(event) {
                alert("Adatbázis hiba!");
                console.log("Database error: " + event.target.errorCode);
            };

            var hozzaadasTransaction = transaction.objectStore("Konyv");
            var hozzaadas = hozzaadasTransaction.add({szerzo: document.getElementById("szerzo").value, cim: document.getElementById("cim").value, megjegyzes: document.getElementById("megjegyzes").value});

            hozzaadas.onsuccess = function() {
                alert("Sikeresen hozzáadás!");
            };

            hozzadas.onerror = function(event) {
                alert("Adatbázis hiba!");
                console.log("Database error: " + event.target.errorCode);
            };
        };

        connection.onerror = function(event) {
            alert("Adatbázis hiba!");
            console.log("Database error: " + event.target.errorCode);
        };
    });
};
