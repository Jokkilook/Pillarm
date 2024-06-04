import { TouchableOpacity } from 'react-native';
import MainScreen from './screen/main-screen';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import AlarmAddScreen from './screen/alarm-add-screen';
import AlarmEditScreen from './screen/alarm-edit-screen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import Ionicons from '@expo/vector-icons/Ionicons';

const DrawerButton = styled(TouchableOpacity)`
  margin: 10px 20px;
`;

const Stack = createStackNavigator<ScreenList>();


export type ScreenList = {
  Main: undefined;
  AddAlarm: undefined;
  EditAlarm: undefined;
  Login: undefined;
  SignUp: undefined;
};

export default function App() {
  // const navigations = useNavigation<StackNavigationProp<ScreenList>>();

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen}
        options={({navigation})=>({
          headerTitle: "",
          headerLeft: () => (
            <DrawerButton onPress={()=>{
              // navigations.navigate("AddAlarm")
            }}>
                <Ionicons name="menu" size={24} color="black" />
            </DrawerButton>
          )
        })}
      />
      <Stack.Screen name="AddAlarm" component={AlarmAddScreen} />
      <Stack.Screen name="EditAlarm" component={AlarmEditScreen} />
    </Stack.Navigator>
  </NavigationContainer>
}