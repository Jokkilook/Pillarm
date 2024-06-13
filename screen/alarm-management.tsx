import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import AlarmManagementItem from "./alarm-management-item";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenList } from "../App";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AlarmData } from "../models/alarm-data-model";
import { loadUser } from "./async_storage_helper";
import { useEffect, useState } from "react";
import { UserData } from "../models/user-data-model";

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

const Header = styled(View)`
  padding: 10px 20px;
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  border-color: #d9d9d9;
  height: 14%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  flex-direction: row;
`;

const HeaderText = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

const AddButton = styled(TouchableOpacity)`
  width: 5%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default () => {
  const navigations = useNavigation<StackNavigationProp<ScreenList>>();
  const [alarmList, setList] = useState(Array<AlarmData>);
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const unsubscribe = navigations.addListener("focus", () => {
      // 화면이 focus 됐을 때 필요한 작업 수행 (예: 데이터 새로고침)
      console.log("RERERE");
      loadUser().then((user) => {
        if (user) {
          setUser(user);
          setList(user?.alarmData);
        }
      });
    });

    if (!user) {
      console.log("DO IT!!");
      loadUser().then((user) => {
        if (user) {
          setUser(user);
          setList(user?.alarmData);
        }
      });
    }
  }, []);

  return (
    <Container>
      <Header>
        <HeaderText>알람 관리</HeaderText>
        <AddButton
          onPress={() => {
            navigations.push("AddAlarm");
          }}
        >
          <Ionicons name="add" size={30} color="black" />
        </AddButton>
      </Header>
      <ScrollView style={{ padding: 10 }}>
        {alarmList.reverse().map((alarmData) => {
          return <AlarmManagementItem data={alarmData} />;
        })}
        <AlarmManagementItem
          data={
            new AlarmData(
              "test",
              12,
              10,
              true,
              [false, false, false, false, false, false, false],
              "test",
              5,
              5,
              true,
              "test",
              true
            )
          }
        />
      </ScrollView>
    </Container>
  );
};
