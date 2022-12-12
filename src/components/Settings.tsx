import React, { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';
import { UserContext } from '../contexts/UserContext';
import { clearTaskboard } from '../firebase';


const Settings: React.FC = () => {
  const { user, signInUser, logoutUser } = useContext(UserContext);
  const { taskItems, loadComplete } = useContext(TasksContext);

  const numOfTasks = taskItems ? taskItems.length : 0;

  const handleClearTaskboard = () => {
    if (user) {
      clearTaskboard(user.dbRef);
    }
  }

  return (
    <div className="settings">
      <button onClick={handleClearTaskboard}  className="btn btn--black btn__taskBoard btn__taskBoard--clear" disabled={numOfTasks === 0}>Clear Task Board</button>
          {
            loadComplete
            ? user && user.loggedIn
                ? <button  onClick={logoutUser} className="btn btn--green btn__taskBoard btn__taskBoard--auth">Log Out</button>
                : <button  onClick={signInUser} className="btn btn--red btn__taskBoard btn__taskBoard--auth">Sign In With Google</button>
            : null
          }
    </div>
  )
}

export default Settings;