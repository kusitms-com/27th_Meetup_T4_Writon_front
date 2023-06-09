import React from "react";
import styled from "styled-components";
import ChallengeItem from "./ChallengeItem";

const ChallengeList = ({ item }) => {
  {
    return (
      <Container>
        <ChallengeItem title={item.title} category={item.category} />
      </Container>
    );
  }
};

export default ChallengeList;

const Container = styled.div`
  width: 920px;
  height: 180px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;
