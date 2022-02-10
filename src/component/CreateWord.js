import React, { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function CreateWord() {
  const days = useFetch("http://localhost:3001/days");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/words/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: dayRef.current.value,
          eng: engRef.current.value,
          kor: korRef.current.value,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성 완료됐습니다!");
          navigate(`/day/${dayRef.current.value}`);
          console.log(dayRef.current);
          setIsLoading(false);
        }
      });
    }
  };

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  // useRef hook : dom에 접근할 수 있게해줌. 스크롤위치확인 또는 focus하고 싶거나

  return (
    <form>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨 터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>

        {/* {console.log(days.data)} */}
        {/* {console.log(days.data)} */}
        <select ref={dayRef}>
          {days.data &&
            days.data.map((day) => (
              <option key={day.id} value={day.day}>
                {day.day}
              </option>
            ))}
        </select>
      </div>
      <button style={{ opacity: isLoading ? 0.3 : 1 }} onClick={onSubmit}>
        {isLoading ? "Saving..." : "저장"}
      </button>
    </form>
  );
}

export default CreateWord;
