
//*************************
//*************************
//**       REDUX          *
//*************************
//*************************

//labs, exercises:
// xoxo - tic tac toe on command line: https://learn.fullstackacademy.com/workshop/5ab80bfa9063b900046c4244/landing
/Users/javiercarey/GitHub/xoxo
// redux bank: https://learn.fullstackacademy.com/workshop/5a721343351b090004ef6355/content/5a721343351b090004ef6359/text
/Users/javiercarey/GitHub/Lab.ReduxBank/

// setup
import { createStore } from 'redux';


//constants
const DEPOSIT = 'deposit';
const WITHDRAW = 'withdraw';

//functions - generate the object that you send to you reducer
const deposit = amount => {
  return { type: DEPOSIT, amount: amount };
};


//build reducer
const reducer = (state = { balance: 0 }, action) => {
  switch (action.type) {
    case 'log':
      return state;
    case 'deposit':
      return { balance: state.balance + action.amount };
    default:
      return state;
  }
};


//build the redux store:
const store = createStore(reducer);

//subscribe to store changes to update the dom:
store.subscribe(() => {
  const x = document.getElementById('balance');
  x.innerHTML = `$${store.getState().balance}.00`;
});





//*************************
//*************************
//** REDUX  MIDDLEWARE    *
//*************************
//*************************

//labs:
// redux middleware: https://learn.fullstackacademy.com/workshop/5a9058a9ba75f300049f97c2/landing
// redux bank: https://learn.fullstackacademy.com/workshop/5a721343351b090004ef6355/content/5a721343351b090004ef6359/text
/Users/javiercarey/GitHub/Lab.ReduxBank/\

//setup import middleware:
import { createStore, applyMiddleware } from 'redux';

//write your middleware function:
// ALSO : this is an example of how to get middle ware to get state after state change
// ALSO: example of using console.group that will group CLs in the browser console for you
const midWare = store => next => action => {
  console.group(action.type);
  console.info('ACTION: ', action);
  console.log('current state: ', store.getState());
  let result = next(action);
  console.log('next state: ', store.getState());
  console.log('NEXT: ', next);
  console.groupEnd(action.type);
  return result;
};

//connect your middleware to your reducer:
const store = createStore(reducer, applyMiddleware(midWare));

// turns out there is a lot of middleware already written that does a lot of cools stuff.
import loggerMiddleware from 'redux-logger'
// see Pair exercise: redux groceries


//*************************
//*************************
//** REDUX   WITH REACT   *
//*************************
//*************************

class ConnectedBank extends Component {
  constructor () {
    super();
    this.state = {
      balance: store.getState().balance
    }
  }
  componentDidMount () {
// subscribe to redux store and make changes to local store
    this.unsubscribe = store.subscribe(() => {
      const storeState = store.getSatate();
      this.setState({
        balance: storeState.balance
      })
    })
  }

  componentWillUnmount () {
    // you want to stop listening to state changes
    this.unsubscribe()
  }


  render () {
    // make trigers to change state via dispatch
    return (
      <bank
        balance={this.state.balance}></bank>
      )
  }

}



//*************************
//*************************
//** THUNK THUNK THUNK    *
//*************************
//*************************


// thunk. if you have a dispatch that is a function then if you have thunk middleware hooked up, it will run that function.
// thunk lab: https://learn.fullstackacademy.com/workshop/5ab17c6313abf90004cc71f7/content/5ab17cdd4567d6000406aa4b/text
// in the lab we had to use an axios call to get data and that was done by using Thunk.

//store.js
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';

const GOT_PETS_FROM_SERVER = 'GOT_PETS_FROM_SERVER';

// VVV your code here VVV
const gotPets = pets => ({
  type: GOT_PETS_FROM_SERVER,
  pets
});

export const getPets = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/pets');
    console.log(data)
    dispatch(gotPets(data));
  };
};

// ^^^ your code here ^^^

const initialState = {
  pets: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PETS_FROM_SERVER:
      return { ...state, pets: action.pets };
    default:
      return state;
  }
};

const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;

