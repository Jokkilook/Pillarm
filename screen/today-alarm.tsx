import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import TodayAlarmItem from "./today-alarm-item";

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
  justify-content: center;
  background-color: white;
`;

const HeaderText = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

const Test = styled(View)`
  border-radius: 10px;
  margin: 5px;
  width: 97.5%;
  height: 100px;
  background-color: grey;
`;

export default () => {
  return (
    <Container>
      <Header>
        <HeaderText>오늘 알람</HeaderText>
      </Header>
      <ScrollView style={{ padding: 10 }}>
        <TodayAlarmItem />
      </ScrollView>
    </Container>
  );
};
