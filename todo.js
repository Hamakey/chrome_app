const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "todos";
let toDos = [];


function deleteToDo(event){

  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
    //parseInt(string) => type(int)로 변함
});
  toDos = cleanToDos;
  saveToDos();
}


function saveToDos(){

  localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
  //JSON.stringify(value); 는 localStorage가 js의 값을 전부 string으로 저장하기때문에 js의 값을 string으로 변환해주는 기법( string(local storage) ↔ object(js))
}


function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length +1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click",deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id=newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text:text,
    id:newId
  };
  toDos.push(toDoObj);
  //save 순서주의할 것. 데이터 들어오고 넣어야함.
  saveToDos();
}

function handleSubmit(event){

  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}
function init(){
  loadToDos();
  toDoForm.addEventListener("submit",handleSubmit);

}

init();
