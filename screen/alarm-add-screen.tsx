import React, { useEffect, useState } from "react";
import {
  Dimensions,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import Checkbox from "expo-checkbox";
import { loadAlarm, removeAllAlarm, saveAlarm } from "./async_storage_helper";
import { AlarmData } from "./alarm-data-model";

// {}를 써서 Dimensions 가 반환하는 여러 값에 접근하고 :를 써서 별칭을 붙여줌
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const SafeContainer = styled(SafeAreaView)`
  background-color: white;
  align-items: center;
  height: 100%;
`;

const Divider = styled(View)`
  width: 90%;
  border: 0.6px solid grey;
`;

const ContentText = styled(Text)`
font-size: 18px;
`;

const RowSection = styled(View)`
  flex-direction: row;
  align-items: center;
  align-content: center;
  margin-bottom: 20px;
`;

const DaySelectionSection = styled(View)`
  background-color: white;
  width: 100%;
  padding: 10px 20px;
`;

const DayList = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const DayButton = styled(TouchableOpacity)<{ selected: boolean }>`
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  width: ${WIDTH * 0.1}px;
  height: ${WIDTH * 0.1}px;
  background-color: ${({ selected }) => (selected ? "#0097ec" : "white" )};
`;

const DayText = styled(Text)<{ selected: boolean }>`

  font-size: 18px;
  color: ${({ selected }) => (selected ? "white" : "black" )};
`;

const TitleText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentSection = styled(View)`
  padding: 10px 20px;
  width: 100%;
  background-color: white;
`;

const ContentInput = styled(TextInput)`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: black;
  font-size: 18px;
`;

const RealarmSection = styled(View)`
  padding: 10px 20px;
  width: 100%;
  background-color: white;
`;

const SoundSection = styled(View)`
  padding: 10px 20px;
  width: 100%;
  background-color: white;
`;

const MinuteInput = styled(TextInput)`
  border-bottom-width: 1px;
  border-bottom-color: black;
  text-align: center;
  font-size: 18px;

`;

const TimeInput = styled(TextInput)`
  border-bottom-width: 1px;
  border-bottom-color: black;
  text-align: center;
  font-size: 18px;

`;

const MinuteLine = styled(View)`
  flex-direction: row;
  margin-bottom: 10px;
`;

const TimeLine = styled(View)`
  flex-direction: row;
  margin-bottom: 10px;
`;

const AddButton = styled(TouchableOpacity)``;

const AddButtonText = styled(Text)`
  font-size: 25px;
  font-weight: bold;
`;

export type AlarmDatas = {
  alarmID: String;
  isEveryday: boolean;
  dayList: Array<boolean>;
  content: String;
  realarmDuration: number;
  realarmTime: number;
  untilCheck: boolean;
  alarmSoundPath: String;
  isActivated: boolean;
};

export default () => {

  const [content, setContent] = useState("");
  const [minute, setMinute] = useState(0);
  const [time, setTime] = useState(0);
  const [isEveryday, setIsEveryday] = useState(false);
  const [untilEat, setUntilEat] = useState(false);
  const [dayList, setDayList] = useState([false,false,false,false,false,false,false]);
  var alarmList:Array<AlarmData> = [];
  var dayText = ["월", "화", "수", "목", "금", "토", "일"];

  useEffect(()=>{
    removeAllAlarm();
    loadAlarm().then((e)=>{
      alarmList = e;
    })
    console.log(alarmList);
  });

  

  //onChange Text : 사용자 입력에 따라 변경된 인풋 이벤트(e)를 받아와 실행
  const onChangeText = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: string
  ) => {
    //1. 'e'에 담겨있는 사용자의 입력 텍스트를 가져온다
    const inputText = e.nativeEvent.text;
    var num;

    //2. 입력 텍스트를 email, password state 에 저장한다.
    //2-1. 입력 텍스트가 email 이라면
    //2-2. 입력 텍스트가 password 라면
    switch (type) {
      case "content":
        setContent(inputText);
        break;
      case "minute":
        num = Number(inputText);
        if(num.toString()==="NaN"){
          num = 0;
        }
        setMinute(Number(num));
        break;
      case "time":
        num = Number(inputText);
        if(num.toString()==="NaN"){
          num = 0;
        }
        setTime(Number(num));
        break;
    }
  };

  const onChangeDay = (index:number) =>{
    const list = [...dayList];
    list[index] = !list[index];
    setDayList(list)
    };

  const addAlarm = async () => {
    await removeAllAlarm();
    var data:AlarmData = new AlarmData("asd",isEveryday,dayList,content,minute,time,untilEat,"test",true);
    alarmList.push(data);
    console.log(alarmList);
    await saveAlarm(alarmList);
    console.log("done")
    var datas = await loadAlarm();
    console.log("RESULT: "+datas)

  };

  return (
    <SafeContainer>
      <DaySelectionSection>
        <TitleText>요일 선택</TitleText>
        <RowSection>
          <Checkbox
            value={isEveryday}
            onValueChange={setIsEveryday}
            color={isEveryday ? "#0097ec" : undefined}
          />
          <ContentText>  매일</ContentText>
        </RowSection>
        <DayList>
          {dayText.map((e, index) => {
            return (
              <DayButton 
              key={index}
              selected = {dayList[index]}
              onPress={()=>{
                onChangeDay(index);
              }}
              >
                <DayText selected = {dayList[index]}>{e}</DayText>
              </DayButton>
            );
          })}
        </DayList>
      </DaySelectionSection>
      <Divider />
      <ContentSection>
        <TitleText>내용</TitleText>
        <ContentInput
          value={content}
          onChange={(e) => onChangeText(e, "content")}
        />
      </ContentSection>
      <Divider />
      <RealarmSection>
        <TitleText>다시 알림 시간</TitleText>
        <MinuteLine>
          <MinuteInput
            keyboardType="numeric"
            value={minute.toString()}
            onChange={(e) => onChangeText(e, "minute")}
          />
          <ContentText>  분 후 다시 알림</ContentText>
        </MinuteLine>
        <TimeLine>
          <TimeInput
            keyboardType="numeric"
            value={time.toString()}
            onChange={(e) => onChangeText(e, "time")}
          />
          <ContentText>  번 다시 알림</ContentText>
        </TimeLine>
        <RowSection>
          <Checkbox
            value={untilEat}
            onValueChange={setUntilEat}
            color={untilEat ? "#0097ec" : undefined}
          />
          <ContentText>  복용 체크할 때 까지</ContentText>
        </RowSection>
      </RealarmSection>
      <Divider />
      <SoundSection>
        <TitleText>알람음</TitleText>
      </SoundSection>
      <AddButton onPress={addAlarm}>
        <AddButtonText>추가하기</AddButtonText>
      </AddButton>
    </SafeContainer>
  );
};
