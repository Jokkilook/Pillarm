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
    this.records = records;
  }

  static fromJson(json: any): UserData {
    const alarmData = json.alarmData.map((alarm: any) => AlarmData.fromJson(alarm));

    const recordsMap = new Map<string, Array<RecordData>>();
    for (const key in json.records) {
      if (json.records.hasOwnProperty(key)) {
        const recordArray = json.records[key].map((record: any) => RecordData.fromJson(record));
        recordsMap.set(key, recordArray);
      }
    }

    return new UserData(json.id, alarmData, recordsMap);
  }

  static emptyUser(): UserData {
    return new UserData("",[],new Map());
  }
}
