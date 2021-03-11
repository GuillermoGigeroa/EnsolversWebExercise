class item {
    constructor(text, check) {
        this.text = text;
        this.check = check;
        this.changeText = changeText_Item;
        this.changeStatus = changeStatus_Item;
    }
};

function changeText_Item(text) {
    this.text = text;
}

function changeStatus_Item(check) {
    this.check = check;
}

class folder {
    constructor(name) {
        this.name = name;
        this.items = new Array();
        this.addItem = addItem_Folder;
        this.changeName = changeName_Folder;
    }
}

function addItem_Folder(item){
    this.items.push(item);
}

function changeName_Folder(name){
    this.name = name;
}

$(function(){
    var item1 = new item("Nombre de item 1",false);
    var item2 = new item("Nombre de item 2",true);
    var folder1 = new folder("Carpeta1");
    folder1.addItem(item1);
    folder1.addItem(item2);
    mostrarCarpeta(folder1);
});

//Develop testing
function mostrarCarpeta(carpeta){
    console.log("---------------------------------------------------");
    console.log("Nombre de carpeta: ",carpeta.name);
    console.log("---------------------------------------------------");
    $.each(carpeta.items, function() { 
        console.log("Texto: ",this.text);         
        console.log("Estado: ",this.check);         
    });
    console.log("---------------------------------------------------");
}