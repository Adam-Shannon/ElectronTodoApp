const todoObjectList = [];

class ToDo{
    constructor(item){
        this.ulElement = item;
    }

    add(){
        console.log("triggered");
        const textInput = document.querySelector("#taskInput").value;
        if (textInput == ""){
            alert("you didn't enter any task")
        } else {
            const newTaskObject = {id: todoObjectList.length, todoText: textInput, isDone: false}

            todoObjectList.unshift(newTaskObject)
            this.display();
            document.querySelector("#taskInput").value= '';
        }

    }
    do_undo(x){
        const selectedTask = todoObjectList.findIndex((item) => item.id == x);
        console.log(todoObjectList[selectedTask].isDone);
        todoObjectList[selectedTask].isDone == false ? 
        todoObjectList[selectedTask].isDone = true : todoObjectList[selectedTask].isDone = false;
        this.display();
    }
    delete(z){
        const toDelete = todoObjectList.findIndex((item) => item.id == z);
        todoObjectList.splice(toDelete,1);
        this.display();
    }
    display(){
        this.ulElement.innerHTML = "";

        todoObjectList.forEach((object_item) => {
            const listEle = document.createElement("li");
            const deleteBtn = document.createElement("button");

            listEle.innerText = object_item.todoText;
            listEle.setAttribute("data-id", object_item.id);

            deleteBtn.innerText = "delete";
            deleteBtn.setAttribute("data-id", object_item.id);
            deleteBtn.classList.add("deleteButton")

            listEle.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", function(e){
                const removed = e.target.getAttribute("data-id");
                todoList.delete(removed);
            })

            listEle.addEventListener("click", function(e){
                const selected = e.target.getAttribute("data-id");
                todoList.do_undo(selected);
            })

            if (object_item.isDone){
                listEle.classList.add("checked");
            }

            this.ulElement.appendChild(listEle);

        })
    }
}

const listSection = document.querySelector("#taskList");

todoList = new ToDo(listSection);

document.querySelector(".addButton").addEventListener("click", function(){
    todoList.add()
})