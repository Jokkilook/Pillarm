import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import AlarmManagementItem from "./widget/alarm-management-item";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { UserData } from "../../models/user-data-model";
import LoadingScreen from "../loading-screen";

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

const Header = styled(View)`
  padding: 10px 20px;
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  border-color: #d9d9d9;
  height: 14%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  flex-direction: row;
`;

const HeaderText = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

const AddButton = styled(TouchableOpacity)`
  /* width: 5%; */
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color:#0097ec;
  
`;

type Props = {
  user: UserData;
  loading: boolean;
};

export default ({ user, loading }: Props) => {
  const navigations = useNavigation<StackNavigationProp<ScreenList>>();

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Header>
        <HeaderText>알람 관리</HeaderText>
        <AddButton
          onPress={() => {
            navigations.navigate("AddAlarm");
          }} >
            <ButtonText>추가하기</ButtonText>
        </AddButton>
      </Header>
      <ScrollView style={{ padding: 10, backgroundColor: "#F5F5F5" }}>
        {user.alarmData.reverse().map((alarmData) => {
          return (
            <AlarmManagementItem key={alarmData.alarmID} data={alarmData} />
          );
        })}
      </ScrollView>
    </Container>
  );
};
