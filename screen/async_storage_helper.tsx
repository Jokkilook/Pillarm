import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlarmDatas } from './alarm-add-screen';
import { AlarmData } from './alarm-data-model';


export const loadAlarm = async ()=>{
   var data = await AsyncStorage.getItem("alarm")??"[]"
   var da = JSON.parse(data)
  
  return da
}

export const loadRecord = async ()=>{
    return await AsyncStorage.getItem("record")
}

export const removeAllAlarm = async () => {
    await AsyncStorage.removeItem("alarm")
}

export const saveAlarm = async (alarmList:Array<AlarmData>) =>{
    var json:string = JSON.stringify(alarmList)
    await AsyncStorage.setItem("alarm", json)
}

export const saveRecord = async (alarmList:Array<AlarmData>) =>{
    var json:string = JSON.stringify(alarmList)
    await AsyncStorage.setItem("record", json)
}