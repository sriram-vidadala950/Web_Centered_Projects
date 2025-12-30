import React from "react";

export function TaskItem({
  task,
  deleteTask,
  completedtodotask,
  showActions
}) {
  return (
    
    <li className='task d-flex justify-content-between'>
        <div>
            <strong>
                {task.text}
            </strong> 
            <div style={{ fontSize: "12px", color: "#555" }}>
                Started At : {task.createdAt.toLocaleString()}
                {task.completedAt &&(
                    <>| Completed At : {task.completedAt.toLocaleString()}</>
                )}
            </div>
        </div>

      {showActions && (
        <div className='task-buttons d-flex gap-2'>
          <button
            className='btn btn-sm btn-success'
            onClick={() => completedtodotask(task.id)}
          >
            Complete
          </button>
          <button
            className='btn btn-sm btn-danger'
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  )
}