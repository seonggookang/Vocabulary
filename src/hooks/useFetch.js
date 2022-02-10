// Custom hooks

import { useEffect, useState } from "react";
import axios from "axios";
import DayList from "../component/DayList";

function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then((data) => {
      setData(data);
    });
  }, [url]);
  // fetch랑 axios를 썼을때 반환되는 값이 다르다.
  // 컨솔 찍고 그때그때 대응하자
  // 근데 요즘은 굳이 fetch를 안쓴다. json() 변환식을 한번 더 써줘야하기 때문에 귀찮음.
  return data;
}

export default useFetch;
