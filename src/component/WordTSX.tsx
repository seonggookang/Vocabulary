import React, { useState } from "react";


interface IProps {
    word:IWord;// any 남발하면 안된다. typescript쓰는 의미가 사라진다
  }

  export  interface IWord { // 항상 아래 5개의 프로퍼티를 모두 갖게끔 설정해줬다. 안쓸것은 ?를 붙여서 optional하게 만든다.
    // 하지만 이또한 좋은방법은아니다. 단순 에러를 없애기 위해서 생각했던 로직과 다르게 짜면 안된다. 결론: 
    // 사용될 부분에서 다른 값들을 써주면된다. -> ...word,
    day: string;
      eng: string;
      kor: string;
      isDone: boolean;
      id: number;
  }

function Word({ word: w }: IProps) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false); // 한글 보여줄래 말래 state
  const [isDone, setIsDone] = useState(w.isDone); // 다외웠냐 안외웠냐
  
  
  word. //어떤 속성들이 있나 확인 가능. word선언을 위에서 작성안해주면 dot을 찍어도 아무것도 안나옴
  // 장점: 오타를 내거나 없는 property를 사용할 실수를 없앰
  
  
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
          setWord({
            ...word, // 기존의 word객체를 그대로 사용하면서 id만 변경
            id: 0 });// 삭제된 후의 id를 0으로 바꿔줬다. 타입스크립트로 적용할 땐? 위의 선언에서 optional한부분을 다 물음표를 붙여준다.
        }
      });
    }
  }

  if (word.id === 0) {
    return null;
  }

  return (
    <>
      <table>
        <tbody>
          <tr className={isDone ? "off" : ""}>
            <td>
              <input type="checkbox" onChange={toggleDone} checked={isDone} />
            </td>
            <td>{word.eng}</td>
            <td>{isShow ? <div>{word.kor}</div> : null}</td>
            <td className="delete">
              <button className="de1" onClick={del}>
                삭제
              </button>
              {
                <button className="de1" onClick={toggleShow}>
                  뜻 {isShow === false ? "보이기" : "숨기기"}
                </button>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Word;

// 각 컴포넌트 별로 state를 가지고있다.
// 버튼을 눌렀을 때 뜻 감추기 나타내기는 해당 줄의 단어에만 해당하는것이므로 따로 컴포넌트 제작
