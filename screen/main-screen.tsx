import { Platform, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import Ionicons from '@expo/vector-icons/Ionicons';
import TabViewExample from "./tabs";
import { SafeAreaView } from "react-native-safe-area-context";


const SafeContainer = styled(SafeAreaView)`
    background-color:white;
`;

const DrawerButton = styled(TouchableOpacity)`

`;

const Header = styled(View)`
    background-color: white;
    padding: 10px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const CalendarContainer = styled(View)`
    height:50%;
    width: 100%;
    background-color: white;
`;

const Tabs = styled(View)`
    height:50%;
    width: 100%;
    background-color: yellowgreen;
`;

export default () => {

    return (<SafeContainer>
        <Header>
        <DrawerButton>
            <Ionicons name="menu" size={24} color="black" />
        </DrawerButton>

        </Header>
        <CalendarContainer></CalendarContainer>
        <Tabs>{TabViewExample()}</Tabs>
    </SafeContainer>);
}