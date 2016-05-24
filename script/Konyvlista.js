var Konyv = function(szerzo, cim, megjegyzes) {
    this.szerzo = szerzo;
    this.cim = cim;
    this.megjegyzes = megjegyzes;
};

function demoAdatok() {
    var lista = document.getElementById("konyvlista");
    var daVinci = new Konyv("Dan Brown", "Da Vinci Kód", "Még nem olvastam...");
    var shining = new Konyv("Stephen King", "Ragyogás", "Ezt már olvastam");
    var li = document.createElement("li");
    li.innerHTML = "<p>" + daVinci.cim + "</p><p>" + daVinci.szerzo + "</p>";
    li.addEventListener("click", function() {
        alert(daVinci.szerzo + "\n" + daVinci.cim + "\n" + daVinci.megjegyzes);
    });

    lista.appendChild(li);
    li = document.createElement("li");
    li.innerHTML = "<p>" + shining.cim + "</p><p>" + shining.szerzo + "</p>";
    li.addEventListener("click", function() {
        alert(shining.szerzo + "\n" + shining.cim + "\n" + shining.megjegyzes);
    });

    lista.appendChild(li);
}

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
                var szerzo = cursor.value.szerzo;
                var cim = cursor.value.cim;
                var megjegyzes = cursor.value.megjegyzes;
                li.innerHTML = "<p>" + cim + "</p><p>" + szerzo + "</p>";
                console.log("cursor.value.cim " + cursor.value.cim);
                li.addEventListener("click", function() {
                    alert(szerzo + "\n" + cim + "\n" + megjegyzes);
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
