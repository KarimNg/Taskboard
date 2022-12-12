import React from 'react';

import SearchBar from './SearchBar';
import TaskListFilter from './TaskListFilter';

const TaskBoardMenu: React.FC = () => {

  return(
    <section className="taskBoard__menu">
      <TaskListFilter />
      <SearchBar />
    </section>
  )
}

export default TaskBoardMenu;