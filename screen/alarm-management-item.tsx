import { Switch, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import React from "react";
import { AlarmData } from "../models/alarm-data-model";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenList } from "../App";
import { UserData } from "../models/user-data-model";
import { loadUser, saveUser } from "./async_storage_helper";

const Touch = styled(TouchableOpacity)``;

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
  const navigations = useNavigation<StackNavigationProp<ScreenList>>();

  const [isActivated, setIsActivated] = useState(data.isActivated);
  const [user, setUser] = useState<UserData>();
  const dayText = ["월", "화", "수", "목", "금", "토", "일"];
  var displayDay = "";

  useEffect(() => {
    loadUser().then((user) => {
      setUser(user);
    });
  }, []);

  const toggleActivation = (alarmData: AlarmData) => {
    var tempUser = user;
    var tempList: AlarmData[] = [];
    var targetAlarm = alarmData;

    tempUser?.alarmData.forEach((alarm) => {
      if (alarm.alarmID == targetAlarm.alarmID) {
        targetAlarm.isActivated = !targetAlarm.isActivated;
        tempList.push(targetAlarm);
      } else {
        tempList.push(alarm);
      }
    });
    tempUser!.alarmData = tempList;
    saveUser(tempUser!);
  };

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  data.isEveryday ? (displayDay = "매일") : null;

  data.dayList.map((e, index) => {
    if (e) {
      displayDay += dayText[index] + " ";
    }
  });

  const goToEdit = () => {
    navigations.push("EditAlarm", data);
  };

  return (
    <Touch onPress={goToEdit}>
      <Container>
        <Info>
          <ContentText>{data.content}</ContentText>
          <TimeText>
            {formatNumber(data.hour)}:{formatNumber(data.minute)}
          </TimeText>
          <DayText>{displayDay}</DayText>
        </Info>

        <Switch
          value={isActivated}
          onChange={toggleActivation(data)}
          onValueChange={setIsActivated}
        />
      </Container>
    </Touch>
  );
};
