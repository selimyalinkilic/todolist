function displayTodos(){ // displaying todos on html
  let todosArray = todolist.listTodo();
  let output = "";
  let todosCount;
  if(todosArray.length <= 0){
    output += '<h5>Todolist is empty</h5>';
    todosCount = 0;
  }else{
    for(let i in todosArray){
    let todo = todosArray[i];
    let name = todo.name;
    let date = todo.date;
    todosCount = todosArray.length;
    output += `<li class="list-group-item d-flex justify-content-between">
              <p class="float-left mb-0 w-75 text-content" style="font-size: 14px;">${name}</p>
              <span class="float-left mb-0 w-25 text-center" style="font-size: 14px;">${date}</span>
              <a href="javascript:;" class="delete-item float-right"><i class="fa fa-remove"></i></a>
              </li>`;
    }
  }
  $(".list-group").html(output);
  $("#todosCount").html(todosCount);
};
function showAlert(type, message){ //alert 
  let firstCardBody = $("#firstCardBody");
  let alert = "";
  alert += `<div class="alert alert-${type} alert-dismissible fade show">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              ${message}
            </div>`;
  $(".alert").text(message);
  firstCardBody.append(alert);
  window.setTimeout(function() {
    $(".alert").hide(); 
  }, 2500);
}
displayTodos();// showing all items  
$(".btn-add").click(function(event){ // adding click event
  const name = $("#todo").val().trim();
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; 
  let yyyy = today.getFullYear();
  if(dd<10)dd='0'+dd;
  if(mm<10)mm='0'+mm;
  today = dd+'/'+mm+'/'+yyyy;
  let date = today;
  let todos = todolist.listTodo();
  let control;
  for (let i in todos){ // control same todos in array
      let same = todos[i].name;
      if(same == name)control=true;
  }  
  if(name == ""){
      showAlert("danger", "Please enter a todo");
  }else{
    if(!control){
      todolist.addTodo(name, date);
      showAlert("success", "Todo was successfully added");
      $("#todo").val("");
        window.setTimeout(function(){
          location.reload();
        },2500);
    }else{
      $("#todo").val("");
      showAlert("danger", "This todo is already available in todo list. Please enter a new todo!");
      window.setTimeout(function(){
        location.reload();
      },2500);
    }
  }
  event.preventDefault();
  displayTodos();
});
$("#clear-todos").click(function(event){ // clear todos
  if(confirm("Are you sure you want to delete all of them?")){
    while(todolist.firstElementChild !=  null){
      todoList.removeChild(todolist.firstElementChild);
    }
    todolist.clearAllTodos();
    showAlert("success", "The entire todolist was successfully cleaned.");
    displayTodos();
  }
});  
     

$(".fa-remove").click(function(){ // remove todos event
  let parent = $(this).parent().parent();
  let name = parent.find(".text-content").text();
  todolist.removeTodo(name);
  showAlert("success"," "+name+" is removed from the localstorage.");
  displayTodos();
  window.setTimeout(function(){
    location.reload();
  },2500);
});
       