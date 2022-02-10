import React from "react";
import { Link } from "react-router-dom";

function EmptyPage() {
  return (
    <div>
      <div>잘못된페이지입니다.</div>
      <Link to="/">돌아가기</Link>
    </div>
  );
}

export default EmptyPage;
