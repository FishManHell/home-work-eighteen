class Model{
  constructor(){
    this.todos = JSON.parse(localStorage.getItem('list')) || [];
  }
  addTodo(text){
    const todo = {
      id: Date.now().toString(),
      text: text
    }
     this.todos.push(todo);
    localStorage.setItem('list', JSON.stringify(this.todos));
   
  }
  deleteTodo(id){
    this.todos = this.todos.filter(todo => todo.id !== id);
    
    localStorage.setItem('list', JSON.stringify(this.todos));
  }
  
  updateTodo(id, value) {
      const matched_index = this.todos.findIndex(v => v.id == id);
      this.todos[matched_index].text = value;
 
      console.log(matched_index)
      
      localStorage.setItem('list', JSON.stringify(this.todos));
  }
  
}
 
class View{
  constructor(){
    this.root = document.getElementById("root");
    this.input = document.createElement("input");
    this.addBtn = document.createElement("button");
    this.showBtn = document.createElement("button");
    
    
    this.render();
  }
  render(){
    this.root.innerHTML = "";
    this.addBtn.innerHTML = "Add";
    this.showBtn.innerHTML = 'SHOW'
    this.root.append(
      this.input,
      this.addBtn,
      this.showBtn
    )
  }
}
 
class View2 {
  constructor(){
    this.root = document.getElementById("root");
    this.todoList = document.createElement("ul");
    this.backBtn = document.createElement("button");
  }
  
  render() {
    this.root.innerHTML = "";
    this.backBtn.innerHTML = 'BACK';
    this.root.append(
      this.todoList,
      this.backBtn
    )
  }
  
  renderTodos(todos){
    this.todoList.innerHTML = "";
    if(todos.length){
      todos.forEach(todo => {
        const li = document.createElement("li");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("span");
        const inputEdit = document.createElement('input');
        li.dataset.id = todo.id;
        inputEdit.value = todo.text;
        deleteBtn.innerHTML = "&times;";
        deleteBtn.className = "deleteBtn";
        editBtn.innerHTML = "Change";
        editBtn.className = "EditBtn"
        inputEdit.setAttribute('type', "text");
        inputEdit.className = 'inputEdit';
        li.appendChild(inputEdit)
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        this.todoList.appendChild(li);
      })
    }
  }
}
 
class Controller{
  constructor(model, view, view2){
    this.model = model;
    this.view = view;
    this.view2 = view2;
    this.view.addBtn.addEventListener("click", this.handleAdd.bind(this))
    this.view.showBtn.addEventListener("click", this.handleShow.bind(this))
    this.view2.backBtn.addEventListener("click", this.handleBack.bind(this))
  }
  
  
  
  // VIEW1
  handleAdd(){
    const value = this.view.input.value;
    if(value.trim()){
      this.model.addTodo(value);
      this.view.input.value = "";
    }else{
      alert("Поле пустое")
    }
  }
  handleShow(event){
    this.view2.render();
    this.view2.renderTodos(this.model.todos);
    this.view2.todoList.addEventListener("click", this.handleDelete.bind(this));
    this.view2.todoList.addEventListener("click", this.handleEdit.bind(this));
  }
  
  
  // VIEW2
  handleDelete(event){
    const deleteBtn = event.target.closest(".deleteBtn");
    if(deleteBtn){
      const id = deleteBtn.parentElement.dataset.id;
      this.model.deleteTodo(id);
      this.view2.renderTodos(this.model.todos);
    }
  }
  handleBack(event){
    this.view.render();
  }
  
    handleEdit(event) {
        if (!event.target.classList.contains('EditBtn'))
            return false;
 
        const parent = event.target.parentElement;
        const id = parent.dataset.id;
        const value = parent.getElementsByTagName('input')[0].value;
 
        console.log(id, value)
        
        this.model.updateTodo(id, value); 
    }
}
 
const model = new Model();
const view = new View();
const view2 = new View2();
const controller = new Controller(model, view, view2);