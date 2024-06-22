import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { UserData } from "../../models/user-data-model";
import { RecordData } from "../../models/record-data-model";
import LoadingScreen from "../loading-screen";
import TodayAlarmItem from "./widget/record-item";
import { saveUser } from "../async_storage_helper";

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
  align-content: space-between;
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

const Button = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
  background-color: blue;
`;

type Props = {
  user: UserData;
  loading: boolean;
  recordList: RecordData[];
  refresh: () => void;
};

export default ({ user, loading, recordList, refresh }: Props) => {
  const [u, setUser] = useState(user);
  const [list, setList] = useState<RecordData[]>(recordList);
  var date = new Date();

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  var dateCode = `${date.getFullYear()}-${formatNumber(
    date.getMonth()
  )}-${formatNumber(date.getDay())}`;

  useEffect(() => {}, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Header>
        <HeaderText>오늘 알람</HeaderText>
      </Header>
      <ScrollView style={{ padding: 10, backgroundColor: "#F5F5F5" }}>
        {recordList.map((record) => {
          return (
            <TodayAlarmItem
              key={record.alarmId}
              record={record}
              userData={user}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};
