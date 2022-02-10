import React, { useState } from "react";

function Word({ word: w }) {
  const [isShow, setIsShow] = useState(false); // 한글 보여줄래 말래 state
  const [isDone, setIsDone] = useState(w.isDone); // 다외웠냐 안외웠냐

  const [word, setWord] = useState(w);

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  const toggleDone = () => {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        // 보내는 리소스의 타입 : json형식으로 보낼거기때문에 아래와같이 작성
        "Content-Type": "application/json",
      },
      // 단순히 정보를 가져오는 GET과 달리 수정하고자하는 정보를 보내야한다.
      body: JSON.stringify({
        // JSON문자열로 변환
        // 기존 data에 isDone을 바꿔입력
        ...word,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });

    // setIsDone(!isDone);
    // setDisable(!disable);
  };

  // const deleteHandler = (id) => {
  //   let updatedWord = [...day1Wordlist].filter((word) => {
  //     return word.id !== id;
  //   });
  //   setDay1Wordlist(updatedWord);
  // };

  function del() {
    if (window.confirm("삭제 정말 할래요?")) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        // 어떤 경우에 fetch를 useEffect에 넣는건지?
        method: "DELETE", // 삭제는 특별한 정보를 넘겨줄 필요없기 때문에 여기까지만 잓성
      }).then((res) => {
        // 여기선 왜 json을 객체로 변환하는 작업을 안해주지?
        if (res.ok) {
          setWord({ id: 0 });
        }
      });
    }
  }

  if (word.id === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        <tr className={isDone ? "off" : ""}>
          <td className="checkbox_center">
            <input type="checkbox" onChange={toggleDone} />
          </td>
          <td>{word.eng}</td>
          <td>{isShow ? <div>{word.kor}</div> : null}</td>
          <td className="delete">
            <button className="de1 btn_del" onClick={del} disabled={isDone}>
              삭제
            </button>
            <button className="de1" onClick={toggleShow} disabled={isDone}>
              뜻 {isShow === false ? "보이기" : "숨기기"}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Word;

// 각 컴포넌트 별로 state를 가지고있다.
// 버튼을 눌렀을 때 뜻 감추기 나타내기는 해당 줄의 단어에만 해당하는것이므로 따로 컴포넌트 제작
