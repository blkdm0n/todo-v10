// DATA AND METHODS THAT CHANGE DATA => SPECIFIC

var todoList = {
  todos: [],
  addTodo: function(todoText) {
    if (todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false,
      });
    } else {
      console.log(`Please enter a valid todo`);
    }
  },
  changeTodo: function(oldTodo, newTodo) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].todoText === oldTodo) {
        this.todos[i].todoText = newTodo;
      }
    }
  },
  toggleCompleted: function(completedTodo) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].todoText === completedTodo) {
        this.todos[i].completed = !this.todos[i].completed;
      }
    }
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //Get number of completed todos.
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  },
  deleteTodo: function(index) {
    this.todos.splice(index, 1);
  }
};

// HANDLERS OBJECT FOR `HANDLING` USER INTERACTION

const handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    views.displayTodos();
  },
  addTodo: function() {
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    views.displayTodos();
  },
  changeTodo: function() {
    let changeTodoCurrentText = document.getElementById("changeTodoCurrentText");
    let changeTodoNewText = document.getElementById("changeTodoNewText");
    todoList.changeTodo(changeTodoCurrentText.value, changeTodoNewText.value);
    changeTodoCurrentText.value = "";
    changeTodoNewText.value = "";
    views.displayTodos();
  },
  deleteTodo: function() {
    let deleteTodoText = document.getElementById("deleteTodoText");
    todoList.deleteTodo(deleteTodoText.value);
    deleteTodoText.value = "";
    views.displayTodos();
  },
  toggleCompleted: function() {
    let completedTodoText = document.getElementById("completedTodoText");
    todoList.toggleCompleted(completedTodoText.value);
    completedTodoText.value = "";
    views.displayTodos();
  }
};

// RESPONSIBLE FOR THINGS VIEWER SEES (NO LOGIC => JUST VIEWS)

const views = {
  displayTodos: function() {
    var node;
    var textNode;
    var ul = document.getElementById(`todo-list`);
    //  Clears list so we don't end up with duplicate lists
    ul.innerHTML = "";
    for (var i = 0; i < todoList.todos.length; i++) {
      if (todoList.todos[i].completed === true) {
        textNode = document.createTextNode(`[X] ${todoList.todos[i].todoText}`);
        node = document.createElement(`li`);
      } else {
        textNode = document.createTextNode(`[ ] ${todoList.todos[i].todoText}`);
        node = document.createElement(`li`);
      }
      node.appendChild(textNode);
      node.id = i;
      node.appendChild(this.createDeleteButton());
      ul.appendChild(node);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement(`button`);
    deleteButton.textContent = `Delete`;
    deleteButton.className = `delete-button`;
    return deleteButton;
  },
};

var todosUl = document.querySelector(`ul`);
todosUl.addEventListener(`click`, e => {
  var clickedElement = e.target;
  if (clickedElement.className === `delete-button`) {
    handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
    console.log(typeof clickedElement.parentNode.id);
  }

});
