import React, { useState, useContext, createContext, useEffect, useCallback } from 'react';
import { retrieveTaskItems } from '../firebase';
import { UserContext, UserContextData } from './UserContext';
import {Task, TaskStatus, TaskStatusFilter} from '../types/task';
interface TasksContextData {
  taskStatus: TaskStatus[];
  taskItems: Task[];
  numOfTasks: number;
  loadComplete: boolean;
  searchTerms: string;
  listFilter: TaskStatusFilter;
  setSearchTerms: (searchTerms: string) => void;
  setListFilter: (filter: TaskStatusFilter) => void;
}

export const TasksContext = createContext<Partial<TasksContextData>>({});

const TasksProvider: React.FC = ({children}) => {
  const [ loadComplete, setLoadComplete ] = useState<boolean>(false);
  const [ taskItems, setTaskItems ] = useState<Task[]>([]);
  const { user, checkForUser } = useContext<Partial<UserContextData>>(UserContext);

  const [ listFilter, setListFilter ] = useState<TaskStatusFilter>("all");
  const [ searchTerms, setSearchTerms ] = useState<string>("");

  const taskStatus: TaskStatus[] = ['open', 'inProgress', 'complete'];

  const fetchTasks = useCallback(() => {
    if (user && user.dbRef) {
      retrieveTaskItems(user.dbRef, setTaskItems)
    }
  }, [user])

  useEffect(function fetchTasksAfterUserCheck() {
    if (!checkForUser) {
      fetchTasks();
      setLoadComplete(true);
    }

  }, [checkForUser, fetchTasks])

  const value = {
    taskStatus,
    taskItems,
    numOfTasks: taskItems.length,
    loadComplete,
    searchTerms,
    listFilter,
    setSearchTerms,
    setListFilter,
  }

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider