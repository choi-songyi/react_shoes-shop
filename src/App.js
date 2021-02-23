import React, {useState, useContext} from 'react';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Detail from './Detail.js';
import axios from 'axios';
import Cart from './Cart.js'

export let 재고context = React.createContext();

function App() {

  let [shoes,shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]);
  let history = useHistory();
  
  return (
    <div className="App">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={()=>{history.push('/')}}>Shoe Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  <Route exact path="/">
  <Jumbotron className="background">
    <h1>20% Season OFF</h1>
    <p>
      This is a simple hero unit, a simple jumbotron-style component for calling
      extra attention to featured content or information.
    </p>
    <p>
      <Button variant="primary">Learn more</Button>
    </p>
  </Jumbotron>
  <div className="container">
    <재고context.Provider value={재고}>
      <div className="row">
        {shoes.map(function(a,i){
          return (
            <Product shoes={shoes[i]} i={i} key={i}/>
          )
        })}
      </div>
    </재고context.Provider>
      <button className="btn btn-primary" onClick={()=>{
        // axios.post('서버url',{전달할 데이터})
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
          shoes변경([...shoes, ...result.data]);
        })
        .catch(()=>{
          console.log('fail')
        });
      }}>더보기</button>
  </div>
  </Route>

  <Route path="/detail/:id">
    <재고context.Provider value={재고}>
      <Detail shoes={shoes} 재고={재고}/>
    </재고context.Provider>
  </Route>
  
  <Route path='/cart'>
    <Cart />
  </Route>

 </div>
  );
}

function Product(props){

  let 재고 = useContext(재고context);
  let history = useHistory();
  return(
    <div className="col-md-4" onClick={()=>{history.push('/detail/'+props.shoes.id)}}>
          <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} width="100%"/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.content} & {props.shoes.price}</p>
          {재고[props.i]}
        </div>
  )
}

export default App;
