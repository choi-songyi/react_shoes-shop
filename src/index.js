import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';


let 기본state =[];

let alert기본state = true;

function reducer(state=기본state, action){
  if(action.type === '항목추가'){
    let again = state.findIndex((a)=>{return a.id ===action.data.id});
    if(again >= 0){
      let copy=[...state];
      copy[again].quan++;
      return copy;
    } 
    let copy = [...state];
    copy.push(action.data);
    return copy;
  } else if(action.type === '수량증가'){
    let copy=[...state];
    copy[action.data].quan++;
    return copy;
  } else if(action.type === '수량감소'){
    let copy=[...state];
    copy[action.data].quan--;
    if(copy[action.data].quan<0){
      copy[action.data].quan = 0;
      return copy;
    }
    return copy;
  } else {
    return state;
  }}


function reducer2(state=alert기본state,action){
  if(action.type === 'close'){
    state= false;
    return state;
  } else{
    return state;
  }
}
// --> 요런 특정 모달에서만 필요한 정보는 그냥 useState쓰지 redux에 저장 ㄴㄴ


let store = createStore(combineReducers({reducer,reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
