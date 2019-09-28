// CODE EXPLAINED channel

// Select The Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Get item from localStorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // sets the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isnt empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show Todays Date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add to-do Function

function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Add an item to the list when user click the enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        // Check if the input value in const toDo up here is not empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

// Add item to localStorage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});


// Complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove/delete to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Add an eventListener to target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside the list
    const elementJob = element.attributes.job.value; //this will return complete or delete

     if(elementJob == "complete"){
        completeToDo(element);
     }else if(elementJob == "delete"){
        removeToDo(element);
     }

     // Add item to localStorage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
