import { CLICK_ADD_TASK } from "../actions/actionTypes";

const initialState = {
  task: { key: '', title: '', resume: '', priority: true, isDone: false}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_ADD_TASK:
    return { ...state, task: [...state.task, action.task] };
    default:
      return state;
  }
};

export default rootReducer;