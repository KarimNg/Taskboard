import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import { Task, NewTask, TaskStatus, TaskDeleteList } from "./types/task";

const firebaseConfig = {
  apiKey: "AIzaSyCf4r4_JiAWZjMYxHx2oPdOOPBunUeG9zg",
  authDomain: "taskboard-drethedev.firebaseapp.com",
  databaseURL: "https://taskboard-drethedev.firebaseio.com",
  projectId: "taskboard-drethedev",
  storageBucket: "taskboard-drethedev.appspot.com",
  messagingSenderId: "868447749524",
  appId: "1:868447749524:web:bc280f2ee21da6c3fe7b81",
};
firebase.initializeApp(firebaseConfig);

export const addTask = (dbRef: string, newTask: NewTask) => {
  firebase.database().ref(dbRef).push(newTask);
};

export const updateTask = (dbRef: string, key: string, newValue: string) =>
  firebase
    .database()
    .ref(dbRef + key)
    .update({ task: newValue });

export const removeTask = (dbRef: string, key: string) =>
  firebase.database().ref(dbRef).child(key).remove();

export const moveTask = (dbRef: string, status: TaskStatus) => {
  firebase.database().ref(dbRef).update({ status });
};

export const clearTaskList = (dbRef: string, taskListItems: TaskDeleteList) => {
  firebase.database().ref(dbRef).update(taskListItems);
};

export const clearTaskboard = (dbRef: string) => {
  firebase.database().ref(dbRef).remove();
};

export const retrieveTaskItems = (dbRef: string, setTaskItems: (taskItems: Task[]) => void) => {
  firebase
    .database()
    .ref(dbRef)
    .on("value", (response) => {
      const tasksData = response.val();

      const taskItems: Task[] = [];
      for (const key in tasksData) {
        const taskItem: Task = {
          key: key,
          task: tasksData[key].task,
          status: tasksData[key].status,
        };
        taskItems.push(taskItem);
      }

      setTaskItems(taskItems);
    });
};

export default firebase;
