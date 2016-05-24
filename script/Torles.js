function torles(deleteKey) {
    console.log("deleteKey: " + deleteKey);
    var connection = window.indexedDB.open("Konyv", 1);

    connection.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction("Konyv", "readwrite");

        transaction.oncomplete = function() {
            db.close();
        };

        transaction.onerror = function(event) {
            alert("Adatbázis hiba!");
            console.log("Database error: " + event.target.errorCode);
        };

        var torlesTransaction = transaction.objectStore("Konyv");
        var torles = torlesTransaction.delete(deleteKey);

        torles.onsuccess = function() {
            alert("Sikeresen törlés!");
            window.location.href = "torles.html";
        };

        torles.onerror = function(event) {
            alert("Adatbázis hiba!");
            console.log("Database error: " + event.target.errorCode);
        };
    };

    connection.onerror = function(event) {
        alert("Adatbázis hiba!");
        console.log("Database error: " + event.target.errorCode);
    };
};

function konyvListazas() {
    console.log("konyvListazas");
    var connection = window.indexedDB.open("Konyv", 1);

    connection.onsuccess = function(event) {
        var database = event.target.result;
        var transaction = database.transaction("Konyv", "readonly");

        transaction.oncomplete = function() {
            database.close();
        };

        transaction.onerror = function(event) {
            console.log("Database error: " + event.target.errorCode);
        };

        var listazasTransaction = transaction.objectStore("Konyv");
        var listazas = listazasTransaction.openCursor();

        listazas.onsuccess = function(event) {
            var cursor = this.result;
            var lista = document.getElementById("konyvlista");
            if (cursor) {
                var li = document.createElement("li");
                var ID = cursor.value.Id;
                var szerzo = cursor.value.szerzo;
                var cim = cursor.value.cim;
                var megjegyzes = cursor.value.megjegyzes;
                li.innerHTML = "<p>" + cim + "</p><p>" + szerzo + "</p>";
                li.addEventListener("click", function() {
                    var ret = confirm("Töröljük a könyvet?");
                    if (ret) {
                        //A user az "OK"-ra klikkelt, ezért töröljük a könyvet.
                        torles(ID);
                    }
                });
                
                lista.appendChild(li);
                cursor.continue();
            } else {
                console.log("Véget ért a listázás");
            }
        };

        listazas.onerror = function() {
            alert("Hiba történt!");
        };
    };
};

window.onload = function() {
    //demoAdatok();
    konyvListazas();
}
