console.log('js');
$(document).ready(onReady);

function onReady() {
    console.log('ready!');
    $('#addTask').on(click, addTheTask);
    //onReady get all tasks
    getTasks();
}
//event listeners
function addTheTask(){
    //variable to hold the values from the html form we created
    var taskToAdd = $('#task').val();
    console.log('we in addTheTask', taskToAdd);

    //variable to hold the data we want to send towards the server
    var taskObject = {
        task: taskToAdd
    };

    //building the POST request and send to server
    $.ajax ({
        type: 'POST',
        url: '/thetask',
        data: taskObject, //data holds the values we want to send 
        success: function(serverResp){
            console.log('serverResp');
            getTasks();
        }
    });
}

// $.ajax function
function getTasks() {
    console.log('in getTasks function');
    $.ajax({
        type: 'GET',
        url: '/thetask',
        success: function(serverResp){
            console.log('in ajax thetask response ->', serverResp);
        }
    })
    
}
