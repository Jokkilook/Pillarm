import { Text, View } from "react-native";
import styled from "styled-components";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";

const Container = styled(View)`
  scroll-margin: 10px;
  padding: 10px 25px 10px 15px;
  border-radius: 10px;
  background-color: white;
  border: 0.5px solid black;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled(View)``;

const ContentText = styled(Text)`
  font-size: 20px;
  font-weight: 900;
  color: black;
`;

const TimeText = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  color: grey;
`;

const DayText = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  color: grey;
`;

export default () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {});

  return (
    <Container>
      <Info>
        <ContentText>약먹기</ContentText>
        <TimeText>17:00</TimeText>
        <DayText>월 화</DayText>
      </Info>

      <Checkbox
        style={{}}
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? "#0097ec" : undefined}
      />
    </Container>
  );
};
