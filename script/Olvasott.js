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
        console.log(listazasTransaction);
        var index1 = listazasTransaction.index("olvasva");
        var listazas = index1.openCursor(IDBKeyRange.only(true));

        listazas.onsuccess = function(event) {
            var cursor = this.result;
            var lista = document.getElementById("konyvlista");
            if (cursor) {
                var li = document.createElement("li");
                var ID = cursor.value.Id;
                var szerzo = cursor.value.szerzo;
                var cim = cursor.value.cim;
                li.innerHTML = "<p>" + cim + "</p><p>" + szerzo + "</p>";
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
