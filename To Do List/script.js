let totaltasks = 0;
let completedtasks = 0;
const pendingTasks = document.querySelector('.footer-left')
const completedTasks = document.querySelector('.footer-right')

function updatefooter(){
    pendingTasks.textContent = `Tasks remainig : ${totaltasks-completedtasks}`;
    completedTasks.textContent = `Completed : ${completedtasks}`;
}

function addList(){
    const input = document.getElementById('taskInput')
    const inputText = input.value.trim()

    if(inputText===""){
        return
    }

    const toDoList = document.querySelector('.to-doList')

    const placeholder = toDoList.querySelector('.placeholder');
    if (placeholder) placeholder.remove();

    const li = document.createElement('li')
    li.className = 'todo-item'

    const checkBox = document.createElement('input')
    checkBox.className = 'cbox'
    checkBox.type = "checkbox"

    const span = document.createElement('span')
    span.className = 'span-text'
    span.textContent = inputText

    totaltasks++;
    updatefooter()
    checkBox.addEventListener("change",()=>{

        if (checkBox.checked){
            completedtasks++;
            span.style.textDecoration = 'line-through'
            span.style.color = '#a09d9d';
        }else{
            completedtasks--;
            span.style.textDecoration = 'none';
            span.style.color = 'black'
        }
        updatefooter()
    });

    const deletebtn = document.createElement('button')
    deletebtn.className = 'deletebtn'
    deletebtn.textContent = '❌'

    deletebtn.addEventListener('click',()=>{
        if(checkBox.checked){
            completedtasks--;
        }
        totaltasks--;
        updatefooter()
        li.remove()
        if (toDoList.children.length === 0) {
            const placeholderLi = document.createElement('li');
            placeholderLi.className = 'placeholder';
            placeholderLi.textContent = 'No tasks yet. Add one to get Started!';
            toDoList.appendChild(placeholderLi);
            completedtasks = 0
            totaltasks = 0
            updatefooter()
        }
    })

    li.appendChild(checkBox)
    li.appendChild(span)
    li.appendChild(deletebtn)
    toDoList.appendChild(li)

    input.value = "";

}
