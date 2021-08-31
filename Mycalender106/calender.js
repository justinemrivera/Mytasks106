important = true;
formVisible = true;
serverUrl = "https://fsdiapi.azurewebsites.net/";
allMytasks = [];




function toggleImportant(){
    console.log("clicked!")
   
   if(important) {
    $('#important').removeClass("fas").addclass("far");
    important = false;  
   } else {
    $('#important').removeClass("far").addclass("fas");
    important = true;
}
}
function save(){
    console.log("Saving Task");
    let tasktitle = $('#textTitle').val();
    let dueDate = $('#textDate').val();
    let location = $('#textLocation').val();
    let priority = $('#selPriority').val();
    let color = $('#selColor').val();
    let contact = $('#textContact').val();
    let description = $('#textDescription').val();
    //hw finish getting variables 
    //create a new task object
    let Event=new Task(tasktitle,important, dueDate, location, priority, color, contact, description)
    //console log the object}
   

    $.ajax({
        type:"POST",
        url: serverUrl + "api/tasks/",
        data: JSON.stringify(Event), //from obj to string 
        contentType: "application/json",

        success: function(res) {
            console.log("Server says", res);
            let t = JSON.parse(res);//from string to obj
            displayEvent(t);
            },
        error: function() {
            console.log("Error saving task", error);
            }
        
    });
}
function displayEvent(Event){
    let iClass = "";
    if(Event.important) {
        iClass = "fas fa-star";
}else {
    iClass="far fa-star";
}
let btn = "";
if(!Event.done) {//if not done
    btn = `<button onClick="doneTask('${Event._id}')" class="btn btn-sm btn-dark">Done</button>`;
}
    let syntax = `<div id="${Event._id}" class="task" style="border: 2px solid ${Event.color}">
    <i class="${iClass}" style="color: ${Event.color}"></i>
    <div class="info">
    <h6>${Event.tasktitle}</h6>
    <p>${Event.description}</p>
    </div>
    <label>${Event.dueDate}</label>
    <label>${Event.location}</label>
    <label>${Event.contact}</label>
    <button onClick="doneTask('${Event._id}')" class="btn btn-sm btn-dark">Done</button>
  </div>`;

  if(Event.done) {
      $(".done-tasks").append(syntax);
  }
  else{
    $(".pending-tasks").append(syntax);
  }
  

}
function doneTask(id) {
    console.log("Mark as done:", id);
    $("#" + id).remove();
    //find the object with that id 
    for(let i=0; i <allMytasks.length; i++){
        let task = allMytasks[i];
        if(task._id === id) {
           console.log("found it",task);
           task.done =true;
           //send the task on PUT request to url: serverUrl + "api/tasks"
           $.ajax({
               type: "PUT",
               url: serverUrl + "api/tasks",
               data: JSON.stringify(task),
               contentType:"application/json",
               success: function(res){
                   console.log(res);
               },
               error: function(err){
                   console.error("Error updating task", err)
               }
           });
}
}
}

function fetchTasks(){
    $.ajax({
        type:"GET",
        url: serverUrl + "api/tasks",
        success: function(res) {
        let tasks = JSON.parse(res);

        for(let i=0; i <tasks.length; i++){
                let task = tasks[i];
                if(task.name === "just"){
                    allMytasks.push(task);
                    displayEvent(task);
                }
        }
        },
        error: function(error){
            console.error("Error getting data", error);
        }
    });
}


function toggleform(){
    
    if (formVisible){
        formVisible = false;
        $("#btnToggle").text("show details");
    } else {
        formVisible = true;
        $("#btnToggle").text("Hide Details");
    }

    $(".section-form").toggle(500);
    }

 
    function Clear(){
        $.ajax({
            type: "DELETE",
            url: serverUrl + "api/tasks/clear/just",
            success: function(res) {
           alert("Your tasks were cleared");
            },
            error: function(err) {
                console.error("Error clearing tasks", err);
            }
        });
    }   

function init() {
    console.log("calender system");

    //load data
    fetchTasks();
    // call a get from the same url
  // json part
  // travel the array
  // send each objet to display function
//hook events
    $('#important').click(toggleImportant);
    $('#btnSave').click(save);
    $('#btnToggle').click(toggleform);
    $('#btnClear').click(Clear);
}
window.onload = init;


 /*DELETE request to:
 serverUrl + "api/tasks/just",
 */
