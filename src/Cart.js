import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props){
    return(
        <div>
            <Table striped bordered hover>
                <tr>
                <th>제품번호</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
                </tr>
                {props.state.map((a,i)=>{
                    return(
                        <tr key ={i}>
                            <td>{ a.id }</td>
                            <td>{ a.name }</td>
                            <td>{ a.quan }</td>
                            <td><button onClick={()=>{ props.dispatch({type : '수량증가', data : i})}}>+</button>
                            <button onClick={()=>{ props.dispatch({type : '수량감소', data : i})}}>-</button></td>
                        </tr>
                    )
                })}
            </Table>
            {props.alertOnOff === true
                ? (
                    <div className='my-alert2'>
                        <p>지금 구매하시면 신규할인 20%</p>
                        <button onClick={()=>{ props.dispatch({type:'close'})}}>닫기</button>
                    </div>
                )
                : null
            }
            
        </div>
    )
}

function state를props를바꿔줌(state){
    return {
        state : state.reducer,
        alertOnOff : state.reducer2
    }
}
export default connect(state를props를바꿔줌)(Cart)
// export default Cart;