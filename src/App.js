import "./App.css";
import DayList from "./component/DayList";
import Day from "./component/Day";
import Header from "./component/Header";
import EmptyPage from "./component/EmptyPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateWord from "./component/CreateWord";
import CreateDay from "./component/CreateDay";
import SimpleSlider from "./component/SimpleSlider";
import Parallax from "./parallax/Parallax";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<DayList />} />
          <Route path="/day/:day" element={<Day />} />
          <Route path="/day/*" element={<EmptyPage />} />
          <Route path="/create_word" element={<CreateWord />} />
          <Route path="/create_day" element={<CreateDay />} />
          <Route path="/slick" element={<SimpleSlider />} />
          <Route path="/para" element={<Parallax />} />
          <Route path="/*" element={<EmptyPage />} />

          {/* 기본적으로 exact가 들어가있고 wild(광범위하게) 다루고 싶으면 뒤에 *(별표)포함 */}
          {/* day다음에 정해져있지 않은 숫자 또는 문자가 와도 EmptyPage로 넘어가게 하려면? */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
