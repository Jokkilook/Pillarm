import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import TodayAlarmItem from "./today-alarm-item";
import { useEffect, useState } from "react";
import { UserData } from "../models/user-data-model";
import { loadUser } from "./async_storage_helper";
import { RecordData } from "../models/record-data-model";

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
  const [user, setUser] = useState<UserData>();

  
  var date = new Date();
  var tester:UserData|undefined;

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  useEffect(() => {
    if(!user){
      loadUser().then((user) => {
        
        if(user){
        setUser(user);
        }

        var day= (date.getDay()+ 6) % 7;
        var records:Array<RecordData> = [];

        user.alarmData.map((alarm)=>{
          if(alarm.isEveryday||alarm.dayList[day]){
            var time = `${formatNumber(alarm.hour)}:${formatNumber(alarm.minute)}`;
            records.push(new RecordData(date,alarm.content,time,false))
            user.records.set(date,records);
          }
        });
        tester = user;
        setUser(user);
      });
    }
  });

  

  return (
    <Container>
      <Header>
        <HeaderText>오늘 알람</HeaderText>
      </Header>
      <ScrollView style={{ padding: 10 }}>
        {
          tester?.records.get(date)?.map((record)=>{
            return (<TodayAlarmItem record={record}/>);
          })
        }
        <TodayAlarmItem record={new RecordData(date,"TEST","17:00",false)} />
      </ScrollView>
    </Container>
  );
};
