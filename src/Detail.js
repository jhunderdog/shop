import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { 재고context } from "./App";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

let 박스 = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);
  let 재고 = useContext(재고context);
  let [alert, alert변경] = useState(true);
  useEffect(() => {
    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    console.log("안녕");
    return () => {
      clearTimeout(타이머);
    };
  }, []);

  let history = useHistory();
  let { id } = useParams();
  let selected_item = props.shoes.find((item) => item.id == id);

  let [inputData, inputData변경] = useState("");

  console.log(selected_item);
  return (
    <div className="container">
      <박스>
        <제목 className="red">상세페이지</제목>
      </박스>
      {inputData}
      <input
        onChange={(e) => {
          inputData변경(e.target.value);
        }}
      />
      {alert === true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{selected_item.title}</h4>
          <p>{selected_item.content}</p>
          <p>{selected_item.price}</p>
          <p>{재고}</p>
          <Info 재고={props.재고}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 10, 11]);
              props.dispatch({
                type: "항목추가",
                payload: {
                  id: selected_item.id,
                  name: selected_item.title,
                  quantity: 1,
                },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              누른탭변경(1);
            }}
          >
            Active1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              스위치변경(false);
              누른탭변경(2);
            }}
          >
            Active1
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={스위치} classNames="wow" timeout={1000}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
    return <div>0번째내용입니다.</div>;
  } else if (props.누른탭 === 1) {
    return <div>1번째내용입니다.</div>;
  } else if (props.누른탭 === 2) {
    return <div>2번째내용입니다.</div>;
  }
}
function Info(props) {
  return <p>재고:{props.재고[0]}</p>;
}

function state를props화(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  };
}
export default connect(state를props화)(Detail);
