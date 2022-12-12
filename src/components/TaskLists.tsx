import React, { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../contexts/TasksContext';
import { filterTaskItems } from '../util';
import TaskList from './TaskList';

const TaskLists: React.FC = () => {
  const { taskItems, taskStatus, searchTerms, listFilter } = useContext(TasksContext);
  const [filteredItems, setFilteredItems] = useState(taskItems || [])
  const [filteredStatus, setFilteredStatus] = useState(taskStatus)

  useEffect(() => {
    if (searchTerms !== undefined && taskItems?.length) {
      const filteredItems = filterTaskItems(searchTerms, taskItems)
      setFilteredItems(filteredItems)
    }
  }, [searchTerms, taskItems])

  useEffect(() => {
    if (listFilter) {
      const lists = listFilter === 'all' ? taskStatus : [listFilter];
      setFilteredStatus(lists)
    }
  }, [listFilter, taskStatus])


  return (
    <section className="taskLists">
      {
        filteredStatus && filteredStatus.map((status) => {
          const tasks = filteredItems ? filteredItems.filter(task => task.status === status) : [];
          return (
            <TaskList
              key={status}
              status={status}
              tasks={tasks}
            />
          )
        })
      }
    </section>
  )

}

export default TaskLists;