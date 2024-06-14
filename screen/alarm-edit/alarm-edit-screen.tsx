import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import Checkbox from "expo-checkbox";
import { loadUser, removeAllAlarm, saveUser } from "../async_storage_helper";
import { AlarmData } from "../../models/alarm-data-model";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenList } from "../../App";
import { UserData } from "../../models/user-data-model";

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

const TimeSection = styled(View)`
  width: 100%;
  height: 30%;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-bottom-color: grey;
  border-bottom-width: 1px;
`;

const TimePicker = styled(TextInput)`
  font-size: 80px;
  text-align: center;
  font-weight: bold;
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
  background-color: ${({ selected }) => (selected ? "#0097ec" : "white")};
`;

const DayText = styled(Text)<{ selected: boolean }>`
  font-size: 18px;
  color: ${({ selected }) => (selected ? "white" : "black")};
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

const CustomHeader = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled(Text)`
  color: red;
  font-size: 20px;
  margin-right: 15px;
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

export default ({ route }: { route: { params: any } }) => {
  const navigations = useNavigation<StackNavigationProp<ScreenList>>();
  const data = route.params.alarm;

  const [user, setUser] = useState<UserData>();
  const [hour, setHour] = useState(data.hour);
  const [minute, setMinute] = useState(data.minute);
  const [content, setContent] = useState(data.content);
  const [reMinute, setReMinute] = useState(data.realarmDuration);
  const [time, setTime] = useState(data.realarmTime);
  const [isEveryday, setIsEveryday] = useState(data.isEveryday);
  const [untilEat, setUntilEat] = useState(data.untilCheck);
  const [dayList, setDayList] = useState(data.dayList);
  const dayText = ["월", "화", "수", "목", "금", "토", "일"];

  useEffect(() => {
    loadUser().then((user) => {
      setUser(user);
    });
  }, []);

  const onChangeText = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: string
  ) => {
    const inputText = e.nativeEvent.text;
    var num;

    switch (type) {
      case "content":
        setContent(inputText);
        break;
      case "reminute":
        num = Number(inputText);
        if (num.toString() === "NaN") {
          num = 0;
        }
        setReMinute(Number(num));
        break;
      case "time":
        num = Number(inputText);
        if (num.toString() === "NaN") {
          num = 0;
        }
        setTime(Number(num));
        break;
      case "hour":
        num = Number(inputText);
        if (num.toString() === "NaN") {
          num = 0;
        }
        if (num < 0 || num > 24) {
          num = 0;
        }
        setHour(Number(num));
        break;
      case "minute":
        num = Number(inputText);
        if (num.toString() === "NaN") {
          num = 0;
        }
        if (num < 0 || num > 59) {
          num = 0;
        }
        setMinute(Number(num));
        break;
    }
  };

  const onChangeDay = (index: number) => {
    const list = [...dayList];
    list[index] = !list[index];
    setDayList(list);
  };

  const saveAlarm = async () => {
    if (content === "") {
      return;
    }
    var id = data.alarmID;
    var newData: AlarmData = new AlarmData(
      id,
      new Date(),
      hour,
      minute,
      isEveryday,
      dayList,
      content,
      reMinute,
      time,
      untilEat,
      "test",
      true
    );

    route.params.editFunction(newData);
    navigations.pop();
  };

  const deleteAlarm = async () => {
    route.params.deleteFunction(data);
    navigations.pop();
  };

  const toggleEveryday = () => {
    setDayList([false, false, false, false, false, false, false]);
    setIsEveryday(!isEveryday);
  };

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  useLayoutEffect(() => {
    navigations.setOptions({
      headerRight: () => {
        return (
          <CustomHeader onPress={() => deleteAlarm()}>
            <HeaderTitle>삭제</HeaderTitle>
          </CustomHeader>
        );
      },
    });
  }, []);

  return (
    <SafeContainer>
      <ScrollView
        contentContainerStyle={{ maxHeight: HEIGHT, alignItems: "center" }}
      >
        <TimeSection>
          <RowSection>
            <TimePicker
              keyboardType="numeric"
              value={formatNumber(hour)}
              onChange={(e) => onChangeText(e, "hour")}
            />
            <TitleText style={{ fontSize: 80 }}> : </TitleText>
            <TimePicker
              keyboardType="numeric"
              value={formatNumber(minute)}
              onChange={(e) => onChangeText(e, "minute")}
            />
          </RowSection>
        </TimeSection>
        <DaySelectionSection>
          <TitleText>요일 선택</TitleText>
          <RowSection>
            <Checkbox
              value={isEveryday}
              onValueChange={toggleEveryday}
              color={isEveryday ? "#0097ec" : undefined}
            />
            <ContentText> 매일</ContentText>
          </RowSection>
          <DayList>
            {dayText.map((e, index) => {
              return (
                <DayButton
                  disabled={isEveryday}
                  key={index}
                  selected={dayList[index]}
                  onPress={() => {
                    onChangeDay(index);
                  }}
                >
                  <DayText selected={dayList[index]}>{e}</DayText>
                </DayButton>
              );
            })}
          </DayList>
        </DaySelectionSection>
        <Divider />
        <ContentSection>
          <TitleText>내용</TitleText>
          <ContentInput
            maxLength={10}
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
              value={reMinute.toString()}
              onChange={(e) => onChangeText(e, "reminute")}
            />
            <ContentText> 분 후 다시 알림</ContentText>
          </MinuteLine>
          <TimeLine>
            <TimeInput
              keyboardType="numeric"
              value={time.toString()}
              onChange={(e) => onChangeText(e, "time")}
            />
            <ContentText> 번 다시 알림</ContentText>
          </TimeLine>
          <RowSection>
            <Checkbox
              value={untilEat}
              onValueChange={setUntilEat}
              color={untilEat ? "#0097ec" : undefined}
            />
            <ContentText> 복용 체크할 때 까지</ContentText>
          </RowSection>
        </RealarmSection>
        <Divider />
        <SoundSection>
          <TitleText>알람음</TitleText>
        </SoundSection>
        <AddButton onPress={() => saveAlarm()}>
          <AddButtonText>저장하기</AddButtonText>
        </AddButton>
      </ScrollView>
    </SafeContainer>
  );
};
