import { useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import styled from 'styled-components';
import todayAlarm from './today-alarm';
import alarmManagement from './alarm-management';


const renderScene = SceneMap({
  first: todayAlarm,
  second: alarmManagement,
});


export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '오늘 알람' },
    { key: 'second', title: '알람 관리' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => null}
    />
  );
}