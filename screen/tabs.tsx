import { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import styled from "styled-components";
import todayAlarm from "./alarm-record/index";
import alarmManagement from "./alarm-management/index";
import { DateData } from "react-native-calendars";
import loginTab from "./login/login-tab";

const renderScene = SceneMap({
  first: todayAlarm,
  second: alarmManagement,
  third : loginTab  
});

export default function TabViewRender() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "오늘 알람" },
    { key: "second", title: "알람 관리" },
    { key: "third", title: "로그인" }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => null}
    />
  );
}
