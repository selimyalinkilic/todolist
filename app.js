/* TodoList Functions */

let todolist = (function () {
  
  let todos = []; // todos array

  function Todo(name, date){ // Todo's items 
    this.name = name;
    this.name = name;
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10)dd='0'+dd;

    if(mm<10)mm='0'+mm;
    today = dd+'/'+mm+'/'+yyyy;
    this.date = today;
  }
  function saveTodos() { // Saving Todos to localstorage
    localStorage.setItem("todolist", JSON.stringify(todos));
  }

  function loadTodos() { // Loading Todos from the localstorage
      todos = JSON.parse(localStorage.getItem("todolist"));
      if (todos === null) {
          todos = [];
      }
  }

  loadTodos();

  let obj = {};

  obj.addTodo = function (name, date) { // ading todos
    let item = new Todo(name, date);
    todos.push(item);
    saveTodos();
  };

  obj.removeTodo = function (name) { // removes todos by name
    for (var i in todos) {
      if (todos[i].name === name) {
        todos.splice(i, 1);      
      }
    }
    saveTodos();
  };
 
  obj.clearAllTodos = function () { // clear all todos from storage
    todos = [];
    saveTodos();
  }

  obj.listTodo = function () { // -> array of list
    let todoCopy = [];
    for (let i in todos) {
        let item = todos[i];
        let itemCopy = {};
        for (let p in item) {
            itemCopy[p] = item[p];
        }
        todoCopy.push(itemCopy);
    }
    return todoCopy;
};

return obj;

})();