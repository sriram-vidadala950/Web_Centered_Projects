  import { useState } from 'react'
  import './App.css'
  import { TaskItem } from './components/TaskItem'
  function App() {
    const [newTask, setNewTask] = useState("")
    const [myTasks, setMyTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    function handleInput(e){
      let newValue = e.target.value
      setNewTask(newValue)
    }
    function addTask(){
      if (newTask.trim()===''){
        return
      }

      const task={
        id: Date.now(),
        text: newTask,
        createdAt: new Date(), //start At()
        completedAt:null
      }
      setMyTasks(prev=>[...prev,task])
      setNewTask("")
    }

    function completedTodoTasks(taskId){
      let completedTasksId = myTasks.find(t=>t.id===taskId)
      if(!completedTasksId){
        return
      }
      const completedTask = {
        ...completedTasksId, completedAt : new Date()
      }
      setCompletedTasks(prev=>[...prev,completedTask])
      setMyTasks(prev=>prev.filter(t=>t.id!==taskId))
    }

    function deleteTodoTask(taskId){
    setMyTasks(prev=>prev.filter(t=> t.id!== taskId))
    }
    return (
      <div className='main-body'>
        <div className="todo-list-maindiv">
          <h3>My Todo List</h3>
          <div>
            <div className='tood-task-input-div'>
              <div className="form-floating w-75">
                <input type="email" className="form-control" id="floatingInput" placeholder="Todo task" onChange={(e)=>{
                  handleInput(e)
                }} value={newTask}/>
                <label htmlFor="floatingInput">Todo task</label>
              </div>
              <button className='btn btn-danger btn-sm w-10' id='add-button' onClick={()=>{
                addTask()
              }}>+</button>
            </div>
              
            <h4>Tasks</h4>
            {myTasks.length === 0 ? (
              <p className="empty-text">No pending tasks</p>
            ) : (
              <ul className="task-list">
                {myTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTodoTask}
                    completedtodotask={completedTodoTasks}
                    showActions={true}
                  />
                ))}
              </ul>)}

              <h4>Completed Tasks</h4>

              {completedTasks.length === 0 ? (
                <p className="empty-text">No completed tasks</p>
              ) : (
                <ul className="task-list">
                  {completedTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      showActions={false}
                    />
                  ))}
                </ul>)}
          </div>
        </div>
      </div>
    ) 
  }

  export default App
