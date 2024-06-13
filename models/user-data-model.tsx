import { AlarmData } from "./alarm-data-model";
import { RecordData } from "./record-data-model";

export class UserData {
  id:string;
  alarmData: Array<AlarmData>;
  records: Map<string, Array<RecordData>>;

  constructor(id:string,
    alarmData: Array<AlarmData>,
    records: Map<string, Array<RecordData>>
  ) {
    this.id = id;
    this.alarmData = alarmData;
    this.records = records ?? new Map();
  }

  static fromJson(json: any): UserData {
    return new UserData(json.id, json.alarmData, json.records);
  }

  static emptyUser(): UserData {
    return new UserData("",[],new Map());
  }
}
