import {Task} from '../types/task';

export const filterTaskItems = (searchText: string, taskItems: Task[]) => {
  const searchRegex = new RegExp(searchText, 'i');

  const searchItems = taskItems.filter(({task}) => searchRegex.test(task));

  return searchItems
}