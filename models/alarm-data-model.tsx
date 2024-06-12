export class AlarmData {
  alarmID: String;
  hour: number;
  minute: number;
  isEveryday: boolean;
  dayList: Array<boolean>;
  content: String;
  realarmDuration: number;
  realarmTime: number;
  untilCheck: boolean;
  alarmSoundPath: String;
  isActivated: boolean;

  constructor(
    alarmID: String,
    hour: number,
    minute: number,
    isEveryday: boolean,
    dayList: Array<boolean>,
    content: String,
    realarmDuration: number,
    realarmTime: number,
    untilCheck: boolean,
    alarmSoundPath: String,
    isActivated: boolean
  ) {
    this.alarmID = alarmID;
    this.hour = hour;
    this.minute = minute;
    this.isEveryday = isEveryday;
    this.dayList = dayList;
    this.content = content;
    this.realarmDuration = realarmDuration;
    this.realarmTime = realarmTime;
    this.untilCheck = untilCheck;
    this.alarmSoundPath = alarmSoundPath;
    this.isActivated = isActivated;
  }

  static fromJson(json: any): AlarmData {
    return new AlarmData(
      json.alarmID,
      json.hour,
      json.minute,
      json.isEveryday,
      json.dayList,
      json.content,
      json.realarmDuration,
      json.realarmTime,
      json.untilCheck,
      json.alarmSoundPath,
      json.isActivated
    );
  }
}
