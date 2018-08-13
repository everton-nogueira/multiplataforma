import { CLICK_ADD_TASK } from '../actions/actionTypes';

export const addTask = task => ({ type: CLICK_ADD_TASK, task: task });