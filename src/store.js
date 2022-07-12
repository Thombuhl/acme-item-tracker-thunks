import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import { DELETE_THING, UPDATE_THING, SET_THINGS, CREATE_THING} from './Types/ThingType';
import { DELETE_USER, SET_USERS, CREATE_USER, UPDATE_USER } from './Types/UserType';

const viewReducer = (state = window.location.hash.slice(1), action)=> { 
  if(action.type === 'SET_VIEW'){
    return action.view;
  }
  return state;
};

const usersReducer = (state = [], action)=> { 
  switch (action.type) {
    case DELETE_USER:
      return  state.filter(user => user.id !== action.user.id )
    case SET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user ]; 
    case UPDATE_USER:
      return state.map(user => user.id !== action.user.id ? user : action.user);
    default: 
      return state;
  };
};

const thingsReducer = (state = [], action)=> { 
  switch (action.type) {
    case DELETE_THING:
      return state.filter(thing => thing.id !== action.thing.id);
    case UPDATE_THING:
      return state.map(thing => thing.id !== action.thing.id ? thing : action.thing);
    case SET_THINGS:
      return action.things;
    case CREATE_THING: 
      return [...state, action.thing ]; 
    default: 
      return state
  };
};

const rootReducer = combineReducers({
  users: usersReducer,
  things: thingsReducer,
  view: viewReducer
});

const updateThing = (thing)=> {
  return async(dispatch)=> {
    thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
    dispatch({ type: 'UPDATE_THING', thing });
  };
};
const deleteThing = (thing)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/things/${thing.id}`);
    dispatch({ type: 'DELETE_THING', thing });
  };
};

const createUser = () => {
  return async(dispatch) => {
    const user = (await axios.post('/api/users', {name: Math.random()})).data;
    dispatch({ type: 'CREATE_USER', user});
  };
};

const removeThingFromUser = (thing) => {
  return async(dispatch) => {
    thing = {...thing, userId: null}
    const updatedThing = (await axios.put(`/api/things/${thing.id}`, thing)).data
    dispatch({ type: 'UPDATE_THING', thing: updatedThing});
  };
};

const deleteUser = (user) => {
  return async(dispatch) => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch({ type: 'DELETE_USER', user});
  };
};

const createThing = () => {
  return async(dispatch) => {
    const response = await axios.post('/api/things', { name: Math.random()});
    const thing = response.data;
    dispatch({ type: 'CREATE_THING', thing });
  };
};

const updateUser = (user) => {
  return async(dispatch) => {
    user = (await axios.put(`/api/user/${user.id}`, user)).data;
    dispatch({ type: 'UPDATE_USER', user });
  }
}


const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export { 
  deleteThing,
   updateThing,
    createUser, 
     removeThingFromUser,
      deleteUser,
       createThing, 
        updateUser, };

export default store;

