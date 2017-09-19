console.log('js');
$(document).ready(onReady);

function onReady() {
    console.log('¡¡jQ is on!!');
    $('#addTask').on('click', addTheTask);
    //3 params for things that are not yet on the DOM
    //event, class to watch for, function to run
    $('#allTasks').on('click', '.deleteMe', deleteTask)
    $('#allTasks').on('click', '.completed', completeTask)
    //onReady get all tasks
    getTasks();
}
//event listeners
function addTheTask() {
    //variable to hold the values from the html form we created
    var taskToAdd = $('#task').val();
    console.log('we in client.js addTheTask:', taskToAdd);

    //variable to hold the data we want to send towards the server
    var taskObject = {
        task: taskToAdd
    };

    //building the POST request and send to server
    $.ajax({
        type: 'POST',
        url: '/thetask',
        data: taskObject, //data holds the values we want to send 
        success: function (serverResp) {
            console.log('serverResp');
            getTasks(); //on success update the tasks in the DOM
            $('#allTasks').val('');//empty input
        }//end success
    });//end $.ajax
}//end addTheTask function

//millies different approach to this problem:
// function appendToDom() {
//     console.log('tasks', tasks);

//     for (var i = 0; i < tasks.length; i++) {
//         var $taskDiv = $('<div>', { text: tasks[i].description }).data('id', tasks[i].id);
//         var $checkBox = $('<input>', { type: 'checkbox' });
//         var $delButton = $('<button>', { text: 'delete', class: 'task-delete' });


//         $taskDiv.prepend($checkBox);
//         $taskDiv.append($delButton);
//         $('#addTask').append($taskDiv);
//     }

// }

// $.ajax functions
function getTasks() {
    console.log('in getTasks function');
    $.ajax({
        type: 'GET',
        url: '/thetask',
        success: function (serverResp) {
            $('#allTasks').empty();
            console.log('in ajax thetask response ->', serverResp);
            //for each item
            for (var i = 0; i < serverResp.length; i++) {
                console.log('serverResp[i]', serverResp[i])

                    //include data-id on the item Div
                    //$('#myTable > tbody:last-child').append('<tr>...</tr><tr>...</tr>');
                var $taskDiv = $('<table>', { text: serverResp[i].task }).data('id', serverResp[i].id);
            //var $taskDiv = $('<div>', { text: serverResp[i].task }).data('id', serverResp[i].id, '<br>', );

                //include a button with the class deleteMe
                var $delBtn = $('<input>', { type: 'button', class: 'deleteMe', value: 'Delete' });
                $taskDiv.append($delBtn);
                if (serverResp[i].complete === false) {
                    var $comBtn = $('<input>', { type: 'button', class: 'completed', value: 'Complete' });
                    $taskDiv.append($comBtn);
                };
                $('#allTasks').append($taskDiv);
            }
        }
    });

}

function deleteTask() {
    var thisId = $(this).parent().data('id');
    console.log('in deleteTask', thisId);
    $.ajax({
        method: 'DELETE',
        url: '/thetask/' + thisId,
        success: function (resp) {
            console.log('deleted task -->', resp);
            getTasks();
        }
    });
}

function completeTask() {
    var thisId = $(this).parent().data('id');
    console.log('in completeTask', thisId);
    $.ajax({
        method: 'PUT',
        url: '/thetask/' + thisId,
        success: function (resp) {
            console.log('completed task -->', resp);
            getTasks();
        }
    });
}