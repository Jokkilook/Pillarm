export class AlarmData {
  alarmID: string;
  hour: number;
  minute: number;
  isEveryday: boolean;
  dayList: Array<boolean>;
  content: string;
  realarmDuration: number;
  realarmTime: number;
  untilCheck: boolean;
  alarmSoundPath: string;
  isActivated: boolean;

  constructor(
    alarmID: string,
    hour: number,
    minute: number,
    isEveryday: boolean,
    dayList: Array<boolean>,
    content: string,
    realarmDuration: number,
    realarmTime: number,
    untilCheck: boolean,
    alarmSoundPath: string,
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
