import React, { useState, useContext } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Jumbotron,
} from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";
import data from "./data.js";
import Detail from "./Detail.js";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";

import Cart from "./Cart";
export let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(data);
  let [재고, 재고변경] = useState([10, 11, 12]);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              Detail
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map((item, j) => {
                  return <Item shoes={shoes[j]} j={j} />;
                })}
              </div>
            </재고context.Provider>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              axios.post("url", { id: "codingapple", pw: 1234 });
              axios
                .get("https://codingapple1.github.io/shop/data2.json")
                .then((result) => {
                  console.log(result.data);
                  let newArray = [...shoes, ...result.data];
                  console.log(newArray);
                  shoes변경(newArray);
                })
                .catch(() => {
                  console.log("실패했어요");
                });
            }}
          >
            더 보기
          </button>
        </Route>

        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
          </재고context.Provider>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
        <Route path="/:id">
          <div>아무거나적었을때 이거 보여주셈</div>
        </Route>
      </Switch>
    </div>
  );
}

function Item(props) {
  let 재고 = useContext(재고context);
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.j + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <h4>{props.shoes.price}</h4>
      <h4>{props.shoes.content}</h4>
      <Test></Test>
    </div>
  );
}
function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고[0]}</p>;
}
export default App;
