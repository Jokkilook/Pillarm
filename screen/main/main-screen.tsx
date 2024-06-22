import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import TabViewRender from "../tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { UserData } from "../../models/user-data-model";
import LoadingScreen from "../loading-screen";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { useEffect, useLayoutEffect, useState } from "react";

const SafeContainer = styled(View)`
  background-color: white;
`;

const DrawerButton = styled(TouchableOpacity)``;

const Header = styled(View)`
  background-color: white;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CalendarContainer = styled(View)`
  height: 50%;
  width: 100%;
  background-color: white;
`;

const Tabs = styled(View)`
  height: 50%;
  width: 100%;
`;

type Props = {
  user: UserData;
  loading: boolean;
  checkers: MarkedDates;
};

export default ({ user, loading, checkers }: Props) => {
  const setMark = (day:DateData) => {console.log(day)};

  // useLayoutEffect(()=>{
  //   Header
  // })

  return loading ? (
    <LoadingScreen />
  ) : (
    <SafeContainer>
      <CalendarContainer>
        <Calendar
          onDayPress={(day)=>{setMark(day)}}
          markedDates={checkers}
          theme={{
            selectedDayBackgroundColor: "blue",
            todayTextColor: "red",
          }}
        />
      </CalendarContainer>
      <Tabs>{TabViewRender()}</Tabs>
    </SafeContainer>
  );
};
