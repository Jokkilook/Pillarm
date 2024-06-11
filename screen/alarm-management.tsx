import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import AlarmManagementItem from "./alarm-management-item";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenList } from "../App";
import { useNavigation } from "@react-navigation/native";

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
  align-items: center;
  justify-content: center;
`;

export default () => {
  const navigations = useNavigation<StackNavigationProp<ScreenList>>();

  return (
    <Container>
      <Header>
        <HeaderText>알람 관리</HeaderText>
        <AddButton
          onPress={() => {
            navigations.push("AddAlarm");
          }}
        >
          <Ionicons name="add" size={30} color="black" />
        </AddButton>
      </Header>
      <ScrollView style={{ padding: 10 }}>
        <AlarmManagementItem />
      </ScrollView>
    </Container>
  );
};
