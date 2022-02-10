import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function DayList() {
  const days = useFetch("http://localhost:3001/days"); //fetch는 렌더링 된 직후 실행
  // 이제 커스텀훅스를 이용해서 API를 불러올 수 있다.
  // console.log(days);
  // useEffect(() => {
  //   fetch("http://localhost:3001/days") //  promise 객체 반환 , axios로 바꿔보자!
  //     .then((res) => {
  //       // res는 http응담. json으로 바꿔주는 작업 필요(이게 싫어서 axios사용한다)
  //       return res.json(); //  json으로 변환 후 promise반환
  //     })
  //     .then((data) => {
  //       setDays(data);
  //     });
  // }, []);

  if (days.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container">
      <ul className="list_day">
        {days.data && // 조건부 렌더링
          days.data.map((day) => (
            <li key={day.id}>
              <Link to={`/day/${day.day}`}>Day {day.day}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DayList;
