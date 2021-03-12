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

var idFolder = 0;

class folder {
    constructor(name) {
        this.name = name;
        this.items = new Array();
        this.addItem = addItem_Folder;
        this.changeName = changeName_Folder;
        this.active = true;
        this.id = idFolder;
        idFolder++;
    }
}

function addItem_Folder(...item){
    this.items.push(...item);
}

function removeFolder(folderID){
    folders.forEach(folder => {
        if(folderID == folder.id){
            folder.active = false;
        }
    });
    loadFolders();
}

function changeName_Folder(name){
    this.name = name;
}

var folders = new Array();

function addNewFolder(folder){
    folders.push(folder);
}

$(function(){
    var item1 = new item("Item1",false);
    var item2 = new item("Item2",true);
    var item3 = new item("Item3",true);
    var item4 = new item("Item4",false);
    var folder1 = new folder("Carpeta1");
    var folder2 = new folder("Carpeta2");
    var folder3 = new folder("Carpeta3");
    folder1.addItem(item1, item2, item3, item4);
    folder2.addItem(item2, item1, item4, item3);
    folder3.addItem(item4, item3, item2, item1);
    addNewFolder(folder1);
    addNewFolder(folder2);
    addNewFolder(folder3);
    folders.forEach(folder => {
        if(folder.active){
            mostrarCarpeta(folder);
        }
    });
    loadFolders();
});

function loadFolders(){
    $("#folders").empty();
    folders.forEach(folder => {
        if(folder.active){
        $("#folders").append(
            "<li><ul class=\"folders1\"><li>"
            +folder.name
            +"</li><li><button>View Items</button></li>"
            +"<li><button onclick=\"removeFolder("+folder.id+")\">Remove</button></li>"
            +"</ul></li>");
        }
    });
}

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

$("#newFolder").click(function() {
    var folderName = $("#folderName").val();
    var newFolder = new folder(folderName);
    addNewFolder(newFolder);
    loadFolders();
});

$("#toggleViewFolders").click(function() { 
    $("#foldersBox").toggle();
});