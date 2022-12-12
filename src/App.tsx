import React from 'react';
import Header from './components/Header';
import TaskBoardMenu from './components/TaskBoardMenu';
import TaskLists from './components/TaskLists';
import './App.css';

const App = () => {

  return (
  <div className="pageContainer">
    <Header/>

    <main>
      <div className="wrapper">
        <TaskBoardMenu />
        <TaskLists />
      </div>
    </main>
  </div>
  );
}

export default App;
