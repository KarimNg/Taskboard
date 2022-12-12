import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UserContext from './contexts/UserContext';
import TasksContext from './contexts/TasksContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
        <TasksContext>
          <App />
        </TasksContext>
    </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
);