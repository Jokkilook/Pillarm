import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlarmDatas } from "./alarm-add/alarm-add-screen";
import { AlarmData } from "../models/alarm-data-model";
import { UserData } from "../models/user-data-model";
import { RecordData } from "../models/record-data-model";

export const resetUser = async () => {
  await AsyncStorage.setItem("user", JSON.stringify(UserData.emptyUser()));
};

export const loadUser = async () => {
  var data = await AsyncStorage.getItem("user");
  if (data) {
    return UserData.fromJson(JSON.parse(data));
  } else {
    return new UserData("", [], new Map());
  }
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
  var user = await loadUser();
  user.alarmData = [];
  await saveUser(user);
};
