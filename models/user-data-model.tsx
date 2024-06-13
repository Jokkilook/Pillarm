import { AlarmData } from "./alarm-data-model";
import { RecordData } from "./record-data-model";

export class UserData {
  alarmData: Array<AlarmData>;
  records: Map<string, Array<RecordData>>;

  constructor(
    alarmData: Array<AlarmData>,
    records: Map<string, Array<RecordData>>
  ) {
    this.alarmData = alarmData;
    this.records = records ?? new Map();
  }

  static fromJson(json: any): UserData {
    return new UserData(json.alarmData, json.records);
  }
}
