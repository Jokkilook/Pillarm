import { Text, View } from "react-native";
import styled from "styled-components";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { RecordData } from "../../../models/record-data-model";
import { UserData } from "../../../models/user-data-model";
import { loadUser, saveUser } from "../../async_storage_helper";

const Container = styled(View)`
  scroll-margin: 10px;
  padding: 10px 25px 10px 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
  /* border: 0.5px solid black; */
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 5;
`;

const Info = styled(View)``;

const ContentText = styled(Text)`
  font-size: 20px;
  font-weight: 900;
  color: black;
`;

const TimeText = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  color: grey;
`;

const DayText = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  color: grey;
`;

export type Props = {
  record: RecordData;
  userData: UserData;
};

export default ({ record, userData }: Props) => {
  const [isChecked, setIsChecked] = useState(record.isEaten);

  const toggleCheck = () => {
    var tempUser = userData;
    var targetRecord = record;
    var tempRecordsList = tempUser.records.get(targetRecord.date);
    var newRecordsList: RecordData[] = [];

    targetRecord.isEaten = !isChecked;
    setIsChecked(!isChecked);

    tempRecordsList?.forEach((record) => {
      if (targetRecord.alarmId == record.alarmId) {
        newRecordsList.push(targetRecord);
      } else {
        newRecordsList.push(record);
      }
    });
    // console.log(newRecordsList);

    tempUser.records.set(targetRecord.date, newRecordsList);
    saveUser(tempUser);
  };

  return (
    <Container>
      <Info>
        <ContentText>{record.alarmContent}</ContentText>
        <TimeText>{record.alarmTime}</TimeText>
      </Info>

      <Checkbox
        style={{}}
        value={isChecked}
        onValueChange={() => toggleCheck()}
        color={isChecked ? "#0097ec" : undefined}
      />
    </Container>
  );
};
