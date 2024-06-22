import { useEffect, useState } from "react";
import { UserData } from "../../models/user-data-model";
import { loadUser, saveUser } from "../async_storage_helper";
import TodayAlarmScreen from "./alarm-record-screen";
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

  const init = async () => {
    try {
      setLoading(true); // 비동기 작업 시작 전에 로딩 상태 설정
  
      const user = await loadUser();
      setUser(user);
      console.log(user);
  
      let tempUser = { ...user }; // 상태 객체를 직접 수정하지 않기 위해 사용자 객체 복제
      const day = (date.getDay() + 6) % 7; // 0은 월요일
      let records: Array<RecordData> = [];
  
      if (!tempUser.records) {
        tempUser.records = new Map<string, Array<RecordData>>();
      }

      if(tempUser.records.get(dateCode) == null) {
  
      tempUser.alarmData.forEach((alarm) => {
        if ((alarm.isEveryday || alarm.dayList[day]) && alarm.isActivated) {
          const time = `${formatNumber(alarm.hour)}:${formatNumber(alarm.minute)}`;
          records.push(new RecordData(dateCode, alarm.alarmID, alarm.content, time, false));
        }
      });
    }
  
      tempUser.records.set(dateCode, records);
      setList(tempUser.records.get(dateCode) ?? []);
      setUser(tempUser);
      await saveUser(tempUser);
  
    } catch (error) {
      console.error("사용자 데이터를 초기화하는 데 실패했습니다:", error);
    } finally {
      setLoading(false); // 작업이 끝난 후 로딩 상태 해제
    }
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
