import React, { useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {console.log(props.state)}

          {props.state.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      props.dispatch({ type: "수량증가", 데이터: item.id });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      props.dispatch({ type: "수량감소", 데이터: item.id });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alert열렸니 === true ? (
        <div className="my-alert2">
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              props.dispatch({ type: "alert삭제" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
      <Parent 이름="존박2" 나이="20"></Parent>
    </div>
  );
}

function Parent(props) {
  return (
    <div>
      <Child1 이름={props.이름}></Child1>
      <Child2 나이={props.나이}></Child2>
    </div>
  );
}

function Child1() {
  useEffect(() => {
    console.log("렌더링됨1");
  });
  return <div>1111</div>;
}

let Child2 = memo(function () {
  useEffect(() => {
    console.log("렌더링된2");
  });
  return <div>2222</div>;
});

function state를props화(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  };
}
export default connect(state를props화)(Cart);
