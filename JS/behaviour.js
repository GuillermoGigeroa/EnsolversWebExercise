$(function(){
    toggleLoginMenu(true);
    toggleViewFolders1Menu(false);
    toggleViewFolders2Menu(false);
    toggleViewFolders3Menu(false);
});

var folders = new Array();
var idTask = 0;
var idFolder = 0;
var activeFolderID;
var activeTaskID;

class task {
    constructor(text, check) {
        this.text = text;
        this.check = check;
        this.active = true;
        this.id = idTask;
        idTask++;
    }
};

class folder {
    constructor(name) {
        this.name = name;
        this.tasks = new Array();
        this.addTask = addTask_Folder;
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
    toggleViewFolders1Menu(false);
    toggleViewFolders2Menu(true);
    var activeFolder;
    folders.forEach(thisFolder => {
        if(thisFolder.id == folderID){
            activeFolder = thisFolder;
        }
    });
    activeFolderID = activeFolder.id;
    $("#folderName").text("Folders > "+activeFolder.name);
    $("#insideFolder").empty();
    (activeFolder.tasks).forEach(task => {
        if(task.active){
            if(task.check){
                $("#insideFolder").append(
                    "<li><ul class=\"folders1\"><li>"
                    +"<input type=\"checkbox\" name=\"\" onChange=\"changeStatus("+task.id+","+activeFolder.id+")\" checked></input></li><li>"
                    +task.text
                    +"</li><li><button onclick=\"editTask("+task.id+","+activeFolder.id+")\">Edit</button></li>"
                    +"<li><button onclick=\"removeTask("+task.id+","+activeFolder.id+")\">Remove</button></li>"
                    +"</ul></li>");
            }else{
                $("#insideFolder").append(
                    "<li><ul class=\"folders1\"><li>"
                    +"<input type=\"checkbox\" name=\"\" onChange=\"changeStatus("+task.id+","+activeFolder.id+")\"></input></li><li>"
                    +task.text
                    +"</li><li><button onclick=\"editTask("+task.id+","+activeFolder.id+")\">Edit</button></li>"
                    +"<li><button onclick=\"removeTask("+task.id+","+activeFolder.id+")\">Remove</button></li>"
                    +"</ul></li>");
            }
            
        }
    });
}

function changeStatus(taskID,folderID){
    folders.forEach(folder => {
        if(folderID == folder.id){
            (folder.tasks).forEach(task => {
                if(taskID == task.id){
                    task.check = !task.check;
                }
            });
        }
    });
}

function editTask(taskID,folderID){
    activeTaskID = taskID;
    toggleViewFolders1Menu(false);
    toggleViewFolders2Menu(false);
    toggleViewFolders3Menu(true);
    folders.forEach(folder => {
        if(folderID == folder.id){
            (folder.tasks).forEach(task => {
                if(taskID == task.id){
                    $("#taskName").text("Edit task: \""+task.text+"\" ");
                }
            });
        }
    });
}

function backToInsideFolders(){
    toggleViewFolders1Menu(false);
    toggleViewFolders2Menu(true);
    loadFolders2();
    toggleViewFolders3Menu(false);
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

function addNewFolder(...folder){
    folders.push(...folder);
}

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

function loadFolders2(){
    viewFolder(activeFolderID);
    toggleViewFolders1Menu(false);
    toggleViewFolders2Menu(true);
}

function toggleLoginMenu(boolean){
    if(boolean){
        $("#loginBox").show();
        $("#wrongUserPass").hide();
        $("#loadExamples").hide();
    }
    else{
        $("#loginBox").hide();  
        $("#loadExamples").show();
    }
}

function login(){
    let user = $("#user").val();
    let password = $("#password").val();
    $("#user").val("");
    $("#password").val("");
    if(user.trim() == "admin" && password.trim() == "admin"){
        toggleViewFolders1Menu(true);
        toggleLoginMenu(false);
    }
    else{
        $("#wrongUserPass").show();
    }
}

function toggleViewFolders1Menu(boolean){
    if(boolean){
        $("#foldersBox").show();  
    }
    else{
        $("#foldersBox").hide();  
    }
}

function toggleViewFolders2Menu(boolean){
    if(boolean){
        $("#insideFoldersBox").show();  
    }
    else{
        $("#insideFoldersBox").hide();  
    }
}

function toggleViewFolders3Menu(boolean){
    if(boolean){
        $("#editTaskBox").show();  
    }
    else{
        $("#editTaskBox").hide();  
    }
}

function loadInitialData(){
    var task1 = new task("Task1",false);
    var task2 = new task("Task2",true);
    var task3 = new task("Task3",true);
    var task4 = new task("Task4",false);
    var task5 = new task("Task5",true);
    var task6 = new task("Task6",false);
    var task7 = new task("Task7",false);
    var task8 = new task("Task8",true);
    var task9 = new task("Task9",false);
    var task10 = new task("Task10",true);
    var task11 = new task("Task11",false);
    var task12 = new task("Task12",true);
    var folder1 = new folder("Folder1");
    var folder2 = new folder("Folder2");
    var folder3 = new folder("Folder3");
    folder1.addTask(task1, task2, task3, task4);
    folder2.addTask(task5, task6, task7, task8);
    folder3.addTask(task9, task10, task11, task12);
    addNewFolder(folder1, folder2, folder3);
    loadFolders1();
}

$("#newTask").click(function() { 
    var taskText = $("#taskText").val();
    if(taskText.trim() == ""){
        $("#taskText").attr("placeholder", "Enter the task name");
    }
    else{
        var newTask = new task(taskText, false);
        folders.forEach(folder => {
            if(activeFolderID == folder.id){
                folder.addTask(newTask);
            }
        });
        $("#taskText").val("");
        loadFolders2(activeFolderID);
        $("#taskText").attr("placeholder", "New task");
    }
});

$("#loadExamples").click(function (e) { 
    loadInitialData();
});

$("#returnToFolders").click(function() { 
    toggleViewFolders1Menu(true);
    toggleViewFolders2Menu(false);
    toggleViewFolders3Menu(false);
});

$("#login").click(function() { 
    login();
});

$("#newFolder").click(function() {
    var folderName = $("#newFolderName").val();
    if(folderName.trim() == ""){
        $("#newFolderName").attr("placeholder", "Enter the folder name");
    }
    else{
        var newFolder = new folder(folderName);
        addNewFolder(newFolder);
        $("#newFolderName").val("");
        $("#newFolderName").attr("placeholder", "New folder");
        loadFolders1();
    }
});

$("#editTask").click(function() { 
    var edit = $("#taskTextEdit").val();
    if(edit.trim() == ""){
        $("#taskTextEdit").attr("placeholder", "Enter the task name");
    }
    else{
        folders.forEach(folder => {
            if(activeFolderID == folder.id){
                (folder.tasks).forEach(task => {
                    if(activeTaskID == task.id){
                        task.text = edit;
                    }
                });
            }
        });
        $("#taskTextEdit").attr("placeholder", "New task name");
    }
    backToInsideFolders();
    $("#taskTextEdit").val("");
});

$("#cancelEditTask").click(function() { 
    backToInsideFolders();
    $("#taskTextEdit").val("");
});