import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word from "./Word";

function Day() {
  const { day } = useParams();
  const navigate = useNavigate();
  const words = useFetch(`http://localhost:3001/words?day=${day}`);
  // 커스텀 훅스 만든 케이스

  const prev = () => {
    if (day > 1) {
      navigate(`/day/${Number(day) - 1}`);
    }
  };

  // useParams를 이용해서 해결
  const next = () => {
    navigate(`/day/${Number(day) + 1}`);
  };

  return (
    <div>
      <div className="prevAndNext">
        <button onClick={() => prev()}>전날로 이동</button>
        <h2>Day {day}</h2>
        <button onClick={() => next()}>다음날로 이동</button>
      </div>
      {words.length === 0 ? <span>Loading...</span> : ""}
      {words.data && // 조건부 렌더링
        words.data.map((word) => {
          return <Word word={word} key={word.id} />;
        })}
    </div>
  );
}

export default Day;
