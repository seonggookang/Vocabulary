import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SimpleSlider from "./SimpleSlider";
import Word from "./Word";

function Day() {
  const { day } = useParams();
  const navigate = useNavigate();
  // const words = useFetch(`/db/words.json?day=${day}`);
  const words = useFetch(`http://localhost:3001/words?day=${day}`);
  const days = useFetch("http://localhost:3001/days");
  console.log(words); // 3개만 잘나옴.
  // console.log(words2); // Day 1에 있는것처럼 단어 3개만 나오게 하고 싶은데 filter링이 안되고 11개 단어 전부 다나와버림...

  const prev = () => {
    if (day > 1) {
      navigate(`/day/${Number(day) - 1}`);
    }
  };

  // useParams를 이용해서 해결
  const next = () => {
    if (days.data[days.data.length - 1].day - 1 < day) {
      alert("마지막페이지입니다.");
      return;
    } else {
      navigate(`/day/${Number(day) + 1}`);
    }
  };
  console.log(days.data && days.data[days.data.length - 1].day);

  return (
    <div>
      <div className="prevAndNext">
        <button className="btn hover3" onClick={() => prev()}>
          전날로 이동
        </button>
        <h2>Day {day}</h2>
        <button className="btn hover3" onClick={() => next()}>
          다음날로 이동
        </button>
      </div>
      {words.length === 0 ? <span>Loading...</span> : ""}
      {words.data && // 조건부 렌더링
        words.data.map((word) => {
          return <Word word={word} key={word.id} />;
        })}
      <br />
      <SimpleSlider />
    </div>
  );
}

export default Day;
