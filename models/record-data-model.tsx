export class RecordData {
  date: Date;
  alarmContent: String;
  alarmTime: String;
  isEaten: boolean;

  constructor(
    date: Date,
    alarmContent: String,
    alarmTime: String,
    isEaten: boolean
  ) {
    this.date = date;
    this.alarmContent = alarmContent;
    this.alarmTime = alarmTime;
    this.isEaten = isEaten;
  }
}
