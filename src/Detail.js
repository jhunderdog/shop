import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { 재고context } from "./App";

let 박스 = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
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
    </div>
  );
}

function Info(props) {
  return <p>재고:{props.재고[0]}</p>;
}
export default Detail;
