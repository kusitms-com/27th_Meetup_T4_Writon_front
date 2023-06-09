import React from "react";
import styled from "styled-components";
import RecordCalendar from "../components/record/RecordCalendar";
import RecordChallenges from "../components/record/RecordChallenges";
import RecordGrowth from "../components/record/RecordGrowth";
import SubscribeCupon from "../components/record/SubscribeCupon";
import { useRecoilValue } from "recoil";
import { recordModalState } from "../atoms/auth";
function Record() {
  return (
    <div>
      <SubscribeCupon />
      <Container>
        <RecordCalendar />
        <RecordChallenges />
      </Container>
      <RecordGrowth />
    </div>
  );
}

export default Record;

const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  position: relative;
  max-width: 1178px;
  margin: auto;
  height: auto;
  margin-top: 80px;
  padding-bottom: 85px;
  padding-left: 140px;
`;
