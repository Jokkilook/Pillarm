import { useEffect, useState } from "react";
import { UserData } from "../../models/user-data-model";
import { loadUser, saveUser } from "../async_storage_helper";
import TodayAlarmScreen from "./today-alarm-screen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenList } from "../../App";
import { RecordData } from "../../models/record-data-model";

export default () => {
  const navigations = useNavigation<StackNavigationProp<ScreenList>>();

  const [users, setUser] = useState<UserData>(UserData.emptyUser());
  const [list, setList] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    loadUser().then((user) => {
      setLoading(true);
      setUser(user);
      setLoading(false);
    });
  };

  var date = new Date();

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  var dateCode = `${date.getFullYear()}${formatNumber(
    date.getMonth()
  )}${formatNumber(date.getDay())}`;

  const init = () => {
    loadUser().then((user) => {
      setLoading(true);
      setUser(user);

      var tempUser = user;
      var day = (date.getDay() + 6) % 7; //0부터 월요일
      var records: Array<RecordData> = [];

      if (tempUser.records) tempUser.records = new Map();

      tempUser.alarmData.forEach((alarm) => {
        if ((alarm.isEveryday || alarm.dayList[day]) && alarm.isActivated) {
          var time = `${formatNumber(alarm.hour)}:${formatNumber(
            alarm.minute
          )}`;
          records.push(
            new RecordData(dateCode, alarm.alarmID, alarm.content, time, false)
          );
        }
      });
      tempUser.records.set(dateCode, records);
      setList(tempUser.records.get(dateCode) ?? []);
      setUser(tempUser);
      saveUser(tempUser);

      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = navigations.addListener("focus", () => {
      init();
    });

    init();
    return unsubscribe;
  }, []);

  return (
    <TodayAlarmScreen
      user={users}
      loading={loading}
      recordList={list}
      refresh={refresh}
    />
  );
};
