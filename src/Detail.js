import React, {useState,useEffect,useContext} from 'react';
import { Navbar,Nav} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './App.js';
import {CSSTransition} from 'react-transition-group';
import { connect } from 'react-redux';

let box = styled.div`
padding:20px;`

let 제목 = styled.h4`
font-size : 25px;
color : ${props => props.색상}`

// let [modal, modal변경] = useState(false);

function Detail (props){

  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState('');
  let [tab, tab변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  useEffect(()=>{
    let timer = setTimeout(()=>{alert변경(false);
    return()=>{clearTimeout(timer)}},2000);
  },[]);
  

  let { id } = useParams();
  let history = useHistory();
  let 찾은상품 = props.shoes.find(function(상품){
    return 상품.id == id
  });
  let 재고 = useContext(재고context);

  useEffect(()=>{
    let arr = localStorage.getItem('watched');
    if(arr == null){arr=[]} else{ arr=JSON.parse(arr)};
    arr.push(id);
    arr = new Set(arr);
    arr = [...arr];
    localStorage.setItem('watched', JSON.stringify(arr))
  },[]);

  return(
    <div className="container">
      <box>
        <제목 className='red'> Detail </제목>
      </box>
      <input onChange={(e)=>{inputData변경(e.target.value)}}/>
      {inputData}

      {
        alert === true
        ? <Alert />
        : null
      }
      
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes'+(Number(id)+1)+'.jpg'} width="100%"/>
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <p>재고 : {재고[찾은상품.id]}</p>
          <button className="btn btn-danger" onClick={()=>{
            props.dispatch({type:'항목추가', data : {id:찾은상품.id, name:찾은상품.title, quan: 1}});
            history.push('/cart');
          }}>주문하기</button>
          <button className="btn btn-danger" onClick={()=>{history.push('/react_shoes-shop')}}>뒤로가기</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{스위치변경(false);tab변경(0)}}>상품설명</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false);tab변경(1)}}>배송정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>{스위치변경(false);tab변경(2)}}>후기</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <봤던상품 찾은상품={찾은상품} shoes={props.shoes}/> */}
      <CSSTransition in={스위치} classNames='wow' timeout={500}>
        <TabContent 스위치변경={스위치변경} tab={tab}/>
      </CSSTransition>

    </div>
  )
}
function 봤던상품(props){
  let 추천 = localStorage.getItem('watched');
  추천 = JSON.parse(추천);
  추천 = new Set(추천);
  추천 = [...추천];
  return(
    <div className="my-alert3">
      {추천.map((a)=>{
      return(
          <p>{props.shoes[a].title}</p>
      )
    })}
    </div>
    
  )
 
}

function Alert(){
  return(
    <div className="my-alert2">
      <p>재고가 얼마 남지 않았습니다.</p>
    </div>
  )
}

function TabContent(props){
  useEffect(()=>{
    props.스위치변경(true);
  })
  if(props.tab===0){
    return <div className='style'>상품설명 페이지입니다.</div>
  } else if(props.tab ===1){
    return <div className='style'>배송정보 페이지입니다.</div>
  } else if(props.tab===2){
    return <div className='style'>후기 페이지입니다.</div>
  }
}

function state를props를바꿔줌(state){
  return {
      state : state.reducer,
      alertOnOff : state.reducer2
  }
}
export default connect(state를props를바꿔줌)(Detail)