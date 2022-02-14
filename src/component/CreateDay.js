import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function CreateDay() {
  const days = useFetch("http://localhost:3004/days");
  // const days = useFetch("/data/data.json/days");
  const navigate = useNavigate();

  const addDay = () => {
    fetch(`http://localhost:3004/days/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: days.data.length + 1,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("생성 완료됐습니다!");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <h1>현재 일수 : {days.data && days.data.length}</h1>
      <button className="btn hover3" onClick={addDay}>
        Day 추가
      </button>
    </div>
  );
}

export default CreateDay;
