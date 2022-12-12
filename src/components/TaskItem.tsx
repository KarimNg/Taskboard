import React, { useContext, useState } from "react";
import TaskForm from "./TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../contexts/UserContext";
import { moveTask } from "../firebase";
import { TasksContext } from "../contexts/TasksContext";

import { TaskStatus } from "../types/task"

type Direction = -1 | 1;

interface TaskItemProps {
  id: string;
  task: string;
  status: TaskStatus
}

const TaskItem: React.FC<TaskItemProps> = ({ id, task, status }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { taskStatus } = useContext(TasksContext);

  const changeStatus = (direction: Direction) => {
    if (user && taskStatus) {
      const currentIdx = taskStatus.indexOf(status);

      let newIdx = currentIdx + direction;
      newIdx =
        newIdx < 0
          ? 0
          : newIdx >= taskStatus.length
            ? taskStatus.length - 1
            : newIdx;

      if (status !== taskStatus[newIdx]) {
        moveTask(user.dbRef + id, taskStatus[newIdx]);
      }
    }

  };
  const handleMovePrev = () => { changeStatus(-1); };
  const handleMoveNext = () => { changeStatus(1); };
  const toggleEdit = () => {
    setIsEditing(isEditing => !isEditing);
  };

  return (
    <li className={`taskItem taskItem--${status}`}>
      {
        status !== "open" && (
          <>
            <label htmlFor={`btnPrev--${id}`} className="srOnly">
              Move task to the previous status
            </label>
            <button
              id={`btnPrev--${id}`}
              className="taskItem__btn taskItem__btn--prev"
              onClick={handleMovePrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
              <span className="srOnly">Move task to the previous status</span>
            </button>
          </>
        )
      }

      {
        !isEditing ? (
          <>
            <label htmlFor={`taskItem--${id}`} className="srOnly">
              Click or focus on the text of the task to enter edit mode and
              modify or delete the task
            </label>
            <button
              id={`taskItem--${id}`}
              className="taskItem__text"
              onClick={toggleEdit}
              onFocus={toggleEdit}
            >
              {task}
            </button>
          </>
        ) : (
          <TaskForm
            id={id}
            type="edit"
            taskValue={task}
            closeForm={() => setIsEditing(false)}
          />
        )
      }

      {
        status !== "complete" && (
          <>
            <label htmlFor={`btnNext--${id}`} className="srOnly">
              Move task to the previous status
            </label>
            <button
              id={`btnNext--${id}`}
              className="taskItem__btn taskItem__btn--next"
              onClick={handleMoveNext}
            >
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
              <span className="srOnly">
                Click to move task to the next status
              </span>
            </button>
          </>
        )
      }
    </li>
  );
};

export default TaskItem;
