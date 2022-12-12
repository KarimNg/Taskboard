import React, { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';
import {TaskStatusFilter} from "../types/task"

export default function TaskListFilter() {
  const { setListFilter } = useContext(TasksContext);

  const changeListFilter = (filter: TaskStatusFilter) => {
    if (setListFilter) {
      setListFilter(filter)
    }
  }

  return (
    <fieldset className="taskBoard__listFilter">
    <div className="inputContainer__filter">
      <legend className="srOnly">Filter the task items by list</legend>
      <input type="radio" className="srOnly taskBoard__filterInput" name="listFilter" id="filterAll" value="all" onChange={() => changeListFilter("all")} defaultChecked />
      <label className="btn btn--black" htmlFor="filterAll">All</label>

      <input type="radio" className="srOnly taskBoard__filterInput" name="listFilter" id="filterOpen" value="open" onChange={() => changeListFilter("open")} />
      <label className="btn btn--red" htmlFor="filterOpen">Open</label>

      <input type="radio" className="srOnly taskBoard__filterInput" name="listFilter" id="filterInProgress" value="inProgress" onChange={() => changeListFilter("inProgress")} />
      <label className="btn btn--blue" htmlFor="filterInProgress">In Progress</label>

      <input type="radio" className="srOnly taskBoard__filterInput" name="listFilter" id="filterComplete" value="complete" onChange={() => changeListFilter("complete")} />
      <label className="btn btn--green" htmlFor="filterComplete">Complete</label>
    </div>
  </fieldset>
  )
}
