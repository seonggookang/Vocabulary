import React, { useEffect, useState } from "react";
import item1 from "../images/item1.webp";
import item2 from "../images/item2.png";
function Parallax() {
  const [position, setPosition] = useState(0);

  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll); // window에 아예 설치를 해버렸기 때문에 언마운트될때도 작동 안하게 삭제해줘야함 -> return
    return () => {
      window.removeEventListener("scroll", onScroll); // 언마운트 되기 직전에 이 이벤트가 제거됨.
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="bg bg1" style={{ backgroundPositionY: position / 2 }}>
        <div>Welcome</div>
      </div>
      <div className="bg bg2" style={{ backgroundPositionY: position / -3 }}>
        <div>Welcome</div>
      </div>
      <p
        className="desc"
        style={{
          transform: `translateX(${-position}px)`,
        }}
      >
        Anim duis id non deserunt dolore cupidatat. Quis ad quis minim in magna
        minim non cupidatat pariatur sit aliquip fugiat occaecat occaecat. Est
        cillum excepteur exercitation laborum dolore eu sunt voluptate pariatur
      </p>
      <p
        className="desc2"
        style={{
          transform: `translateX(${position}px)`,
        }}
      >
        Anim duis id non deserunt dolore cupidatat. Quis ad quis minim in magna
        minim non cupidatat pariatur sit aliquip fugiat occaecat occaecat. Est
        cillum excepteur exercitation laborum dolore eu sunt voluptate pariatur
      </p>
      <p
        className="desc3"
        style={{
          opacity: (position - 700) / 150, // 서서히 나타내기 위해서
        }}
      >
        Nisi officia voluptate qui ullamco eiusmod occaecat sunt velit.
      </p>
      <p
        className="desc3"
        style={{
          opacity: (position - 800) / 150, // 서서히 나타내기 위해서
        }}
      >
        Nisi officia voluptate qui ullamco eiusmod occaecat sunt velit.
      </p>
      <p
        className="desc3"
        style={{
          opacity: (position - 900) / 150, // 서서히 나타내기 위해서
        }}
      >
        Nisi officia voluptate qui ullamco eiusmod occaecat sunt velit.
      </p>
      <p
        className="desc3"
        style={{
          opacity: (position - 1000) / 150, // 서서히 나타내기 위해서
        }}
      >
        Nisi officia voluptate qui ullamco eiusmod occaecat sunt velit.
      </p>
      <img
        src={item1}
        className="item"
        alt=""
        style={{
          transform: `translateY(${position / 2}px)`,
        }}
      />
      <img
        src={item2}
        className="item item_snow"
        style={{
          transform: `translateY(${position / 4}px)`,
        }}
        alt="왜안나와"
      />
    </div>
  );
}

export default Parallax;
