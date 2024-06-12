import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlarmDatas } from "./alarm-add-screen";
import { AlarmData } from "../models/alarm-data-model";
import { UserData } from "../models/user-data-model";
import { RecordData } from "../models/record-data-model";

export const loadUser = async () => {
  var data = await AsyncStorage.getItem("user");
  var map: Map<Date, Array<RecordData>> = new Map();
  var user: UserData = new UserData([], map);
  if (data) {
    user = UserData.fromJson(JSON.parse(data));
  }

  return user;
};

export const saveUser = async (data: UserData) => {
  var json = JSON.stringify(data);
  await AsyncStorage.setItem("user", json);
};

export const loadAlarm = async () => {
  var data = await AsyncStorage.getItem("alarm");
  var list: Array<AlarmData> = [];
  if (data) {
    JSON.parse(data).map((e: AlarmData) => {
      var alarm = AlarmData.fromJson(e);
      list.push(alarm);
    });
  }

  return list;
};

export const loadRecord = async () => {
  return await AsyncStorage.getItem("record");
};

export const removeAllAlarm = async () => {
  await AsyncStorage.removeItem("alarm");
};

export const saveAlarm = async (alarmList: Array<AlarmData>) => {
  var json = JSON.stringify(alarmList);
  await AsyncStorage.setItem("alarm", json);
};

export const saveRecord = async (alarmList: Array<AlarmData>) => {
  var json = JSON.stringify(alarmList);
  await AsyncStorage.setItem("record", json);
};
