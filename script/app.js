//Könyvek listázása
function konyvekListazasa() {
    var connection = window.indexedDB.open("Konyv", 1);

    connection.onsuccess = function() {
        var database = this.result;
        var transaction = database.transaction("Konyv", "readonly");
        var objectStore = transaction.objectStore("Konyv");

        transaction.oncomplete = function() {
            databa.close();
        };


    };
}

window.onload = function() {

}
