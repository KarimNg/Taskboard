import React, { useContext, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { clearTaskList } from "../firebase";
import { UserContext } from "../contexts/UserContext";

import { Task, TaskStatus, TaskDeleteList } from '../types/task'

interface TaskListProps {
  status: TaskStatus;
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ status, tasks}) => {
  const [isStaging, setIsStaging] = useState(false);
  const [menuEnabled, setMenuEnabled] = useState(false);

  const { user } = useContext(UserContext);

  const statusString = {
    open: "Todo",
    inProgress: "In Progress",
    complete: "Completed",
  };

  const toggleMenuEnabled = () => setMenuEnabled(menuEnabled => !menuEnabled);

  const toggleTaskStaging = () => setIsStaging(isStaging => !isStaging);

  const handleClearList = () => {
    if (user && tasks.length) {
      const taskListItems = tasks
        .filter((task) => task.status === status)
        .reduce((deleteList: TaskDeleteList, taskItem) => {
          deleteList[taskItem.key] = null;
          return deleteList;
        }, {});
      clearTaskList(user.dbRef, taskListItems);
    }
    setMenuEnabled(false);
  };

  return (
    <div className="taskList">
      <div className={`taskList__header taskList__header--${status}`}>
        <label htmlFor={`taskListMenuBtn--${status}`} className="srOnly">
          Click the button to toggle the task list menu to clear the task list's
          items
        </label>
        <button
          id={`taskListMenuBtn--${status}`}
          className={
            menuEnabled
              ? "btn taskList__menuBtn taskList__menuBtn--active"
              : "btn taskList__menuBtn"
          }
          onClick={toggleMenuEnabled}
        >
          <span className="srOnly">Toggle the task list's menu</span>
          {!menuEnabled ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          )}
        </button>

        <h2 className="taskList__headingText">
          {statusString[status]}
          {tasks.length > 0 && (
            <span className="taskList__count">{tasks.length}</span>
          )}
        </h2>

        {
          !menuEnabled ? (
            <>
              <label htmlFor={`taskListAddBtn--${status}`} className="srOnly">
                Click the button to toggle the add new task form
              </label>
              <button
                id={`taskListAddBtn--${status}`}
                onClick={toggleTaskStaging}
                className={`btn taskList__addBtn`}
                disabled={isStaging}
              >
                Add Task
              </button>
            </>
          ) : (
            <>
              <label htmlFor={`taskListClearBtn--${status}`} className="srOnly">
                Click the button to clear the task list's items
              </label>
              <button
                id={`taskListClearBtn--${status}`}
                onClick={handleClearList}
                className={`btn btn--black taskList__clearBtn`}
                disabled={tasks.length === 0}
              >
                Clear List
              </button>
            </>
          )
        }
      </div>
      <ul className="taskList__list">
        {
          isStaging && (
            <li className={`taskItem taskItem--${status}`}>
              <TaskForm type="staging" id={status} closeForm={() => setIsStaging(false)} />
            </li>
          )
        }
        {
          tasks.map(({ key, task, status }) => (
            <TaskItem
              key={key}
              id={key}
              task={task}
              status={status}
            />
          ))
        }
      </ul>
    </div>
  );
};
export default TaskList;
