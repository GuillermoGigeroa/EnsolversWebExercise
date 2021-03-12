class task {
    constructor(text, check) {
        this.text = text;
        this.check = check;
        this.changeText = changeText_Task;
        this.changeStatus = changeStatus_Task;
    }
};

function changeText_Task(text) {
    this.text = text;
}

function changeStatus_Task(check) {
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
    var task1 = new task("task1",false);
    var task2 = new task("task2",true);
    var task3 = new task("task3",true);
    var task4 = new task("task4",false);
    var folder1 = new folder("folder1");
    var folder2 = new folder("folder2");
    var folder3 = new folder("folder3");
    folder1.addItem(task1, task2, task3, task4);
    folder2.addItem(task2, task1, task4, task3);
    folder3.addItem(task4, task3, task2, task1);
    addNewFolder(folder1);
    addNewFolder(folder2);
    addNewFolder(folder3);
    folders.forEach(folder => {
        if(folder.active){
            showFolderConsole(folder);
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

//Developer test on console
function showFolderConsole(carpeta){
    console.log("---------------------------------------------------");
    console.log("Folder name: ",carpeta.name);
    console.log("---------------------------------------------------");
    $.each(carpeta.items, function() { 
        console.log("Task: ",this.text);         
        console.log("Checked: ",this.check);         
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