import { Switch, Text, View } from "react-native";
import styled from "styled-components";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import React from "react";
import { AlarmData } from "../models/alarm-data-model";

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
  margin-bottom: 10px;
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

type Props = {
  data: AlarmData;
};

export default ({ data }: Props) => {
  const [isActivated, setIsActivated] = useState(data.isActivated);
  const dayText = ["월", "화", "수", "목", "금", "토", "일"];
  var displayDay = "";

  data.isEveryday ? (displayDay = "매일") : null;

  data.dayList.map((e, index) => {
    if (e) {
      displayDay += dayText[index] + " ";
    }
  });

  return (
    <Container>
      <Info>
        <ContentText>{data.content}</ContentText>
        <TimeText>
          {data.hour}:{data.minute}
        </TimeText>
        <DayText>{displayDay}</DayText>
      </Info>

      <Switch style={{}} value={isActivated} onValueChange={setIsActivated} />
    </Container>
  );
};
