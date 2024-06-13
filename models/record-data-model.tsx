export class RecordData {
  date: string;
  alarmId: string;
  alarmContent: string;
  alarmTime: string;
  isEaten: boolean;

  constructor(
    date: string,
    alarmId: string,
    alarmContent: string,
    alarmTime: string,
    isEaten: boolean
  ) {
    this.date = date;
    this.alarmId = alarmId;
    this.alarmContent = alarmContent;
    this.alarmTime = alarmTime;
    this.isEaten = isEaten;
  }
}
