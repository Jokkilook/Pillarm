import { TouchableOpacity } from "react-native";
import MainScreen from "./screen/main/main-container";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import AlarmAddScreen from "./screen/alarm-add/alarm-add-screen";
import AlarmEditScreen from "./screen/alarm-edit/alarm-edit-screen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { AlarmData } from "./models/alarm-data-model";
import loginScreen from "./screen/login/login-screen";
import registerScreen from "./screen/login/register-screen";
import { useEffect, useState } from "react";
import * as firebase from "firebase/auth";
import { auth } from "./firebaseConfig";



const DrawerButton = styled(TouchableOpacity)`
  margin: 10px 20px;
`;

const Stack = createStackNavigator<ScreenList>();

export type ScreenList = {
  Main: undefined;
  AddAlarm: undefined;
  EditAlarm: {
    alarm: AlarmData;
    editFunction: (alarm: AlarmData) => void;
    deleteFunction: (alarm: AlarmData) => void;
  };
  Login: undefined;
  Register: undefined;
};

export default function App() {
  // const navigations = useNavigation<StackNavigationProp<ScreenList>>();
  const [user,setUser] = useState<firebase.User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    auth.onAuthStateChanged((userState:firebase.User | null)=>{
      if(userState){
        setUser(userState);
      }else{
        setUser(null);
      }
      setLoading(false);
    })
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => (
              <DrawerButton
                onPress={() => {
                  // navigations.navigate("AddAlarm")
                }}
              >
                <Ionicons name="menu" size={24} color="black" />
              </DrawerButton>
            ),
          })}
        />
        <Stack.Screen
          name="AddAlarm"
          component={AlarmAddScreen}
          options={({ navigation }) => ({
            headerTitle: "알람 추가",
          })}
        />
        <Stack.Screen
          name="EditAlarm"
          component={AlarmEditScreen}
          options={({ navigation }) => ({
            headerTitle: "알람 수정",
          })}
        />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Register" component={registerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
