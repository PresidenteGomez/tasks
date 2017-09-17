console.log('js');
$(document).ready(onReady);

function onReady() {
    console.log('¡¡jQ is on!!');
    $('#addTask').on('click', addTheTask);
    //3 params for things that are not yet on the DOM
    //event, class to watch for, function to run
    $('#allTasks').on('click', '.deleteMe', deleteTask)
    //onReady get all tasks
    getTasks();
}
//event listeners
function addTheTask(){
    //variable to hold the values from the html form we created
    var taskToAdd = $('#task').val();
    console.log('we in client.js addTheTask:', taskToAdd);

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
            $('#allTasks').empty();
            console.log('in ajax thetask response ->', serverResp);
        //for each item
        for( var i= 0; i< serverResp.length; i++){
            console.log('serverResp[i]', serverResp[i])
            //include data-id on the item Div
            var $taskDiv = $('<div>', {text: serverResp[i].task}).data('id', serverResp[i].id);
            //include a button with the class deleteMe
            var $delBtn = $('<input>', {type: 'button', class:'deleteMe', value:'Delete'});

            $taskDiv.append($delBtn);
            $('#allTasks').append($taskDiv);
            }
        }
    });
    
}

function deleteTask (){
    var taskId =$(this).parent().data('id');
    console.log('in deleteTask', taskId);
    $.ajax({
        method: 'DELETE',
        url: '/thetask/' + taskId,
        success: function(resp){
            console.log('server response is', resp);
        }
    });
}
