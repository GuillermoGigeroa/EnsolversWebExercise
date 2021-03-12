var idTask = 0;

class task {
    constructor(text, check) {
        this.text = text;
        this.check = check;
        this.changeText = changeText_Task;
        this.changeStatus = changeStatus_Task;
        this.active = true;
        this.id = idTask;
        idTask++;
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
        this.tasks = new Array();
        this.addTask = addTask_Folder;
        this.changeName = changeName_Folder;
        this.active = true;
        this.id = idFolder;
        idFolder++;
    }
}

function addTask_Folder(...task){
    this.tasks.push(...task);
}

function removeFolder(folderID){
    folders.forEach(folder => {
        if(folderID == folder.id){
            folder.active = false;
        }
    });
    loadFolders1();
}

function viewFolder(folderID){
    toggleViewFolders1Menu();
    toggleViewFolders2Menu();
    var activeFolder;
    folders.forEach(thisFolder => {
        if(thisFolder.id == folderID){
            activeFolder = thisFolder;
        }
    });
    $("#folderName").text("Folders > "+activeFolder.name);
    $("#insideFolder").empty();
    (activeFolder.tasks).forEach(task => {
        if(task.active){
            $("#insideFolder").append(
                "<li><ul class=\"folders1\"><li>"
                +task.text
                +"</li><li><button onclick=\"editTask("+task.id+","+activeFolder.id+")\">Edit</button></li>"
                +"<li><button onclick=\"removeTask("+task.id+","+activeFolder.id+")\">Remove</button></li>"
                +"</ul></li>");
        }
    });
}

function editTask(taskID,folderID){
    //To do
}

function removeTask(taskID,folderID){
    folders.forEach(folder => {
        if(folderID == folder.id){
            folder.tasks.forEach(task => {
                if(taskID == task.id){
                    task.active = false;
                }
            });
        }
    });
    loadFolders2(folderID);
}

function changeName_Folder(name){
    this.name = name;
}

var folders = new Array();

function addNewFolder(folder){
    folders.push(folder);
}

$(function(){
    loadInitialData();
    toggleViewFolders2Menu();
});

function loadFolders1(){
    $("#folders").empty();
    folders.forEach(folder => {
        if(folder.active){
        $("#folders").append(
            "<li><ul class=\"folders1\"><li>"
            +folder.name
            +"</li><li><button onclick=\"viewFolder("+folder.id+")\">View Items</button></li>"
            +"<li><button onclick=\"removeFolder("+folder.id+")\">Remove</button></li>"
            +"</ul></li>");
        }
    });
}

function loadFolders2(folderID){
    $("#insideFolder").empty();
    folders.forEach(folder => {
        if(folderID == folder.id){
            (folder.tasks).forEach(task => {
                if(task.active){
                $("#insideFolder").append(
                    "<li><ul class=\"folders1\"><li>"
                    +task.text
                    +"</li><li><button onclick=\"editTask("+task.id+","+folder.id+")\">Edit</button></li>"
                    +"<li><button onclick=\"removeTask("+task.id+","+folder.id+")\">Remove</button></li>"
                    +"</ul></li>");
                }
            });
        }
    });
}

//Developer test on console
function showFolderConsole(folder){
    console.log("---------------------------------------------------");
    console.log("Folder name: ",folder.name);
    console.log("---------------------------------------------------");
    $.each(folder.tasks, function() { 
        console.log("Task: ",this.text);         
        console.log("Checked: ",this.check);         
    });
    console.log("---------------------------------------------------");
}

$("#newFolder").click(function() {
    var folderName = $("#newFolderName").val();
    var newFolder = new folder(folderName);
    addNewFolder(newFolder);
    loadFolders1();
});

function toggleViewFolders1Menu(){
    $("#foldersBox").toggle();
}

function toggleViewFolders2Menu(){
    $("#insideFoldersBox").toggle();
}

$("#toggleViewFolders1").click(function() { 
    restartButton();
});

function restartButton(){
    $("#foldersBox").show();
    $("#insideFoldersBox").hide();
}

function loadInitialData(){
    var task1 = new task("task1",false);
    var task2 = new task("task2",true);
    var task3 = new task("task3",true);
    var task4 = new task("task4",false);
    var task5 = new task("task5",false);
    var task6 = new task("task6",false);
    var task7 = new task("task7",false);
    var task8 = new task("task8",false);
    var task9 = new task("task9",false);
    var task10 = new task("task10",false);
    var task11 = new task("task11",false);
    var task12 = new task("task12",false);
    var folder1 = new folder("folder1");
    var folder2 = new folder("folder2");
    var folder3 = new folder("folder3");
    folder1.addTask(task1, task2, task3, task4);
    folder2.addTask(task5, task6, task7, task8);
    folder3.addTask(task9, task10, task11, task12);
    addNewFolder(folder1);
    addNewFolder(folder2);
    addNewFolder(folder3);
    folders.forEach(folder => {
        if(folder.active){
            showFolderConsole(folder);
        }
    });
    loadFolders1();
}