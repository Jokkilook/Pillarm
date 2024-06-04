import { TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import TabViewExample from "./tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";


const SafeContainer = styled(View)`
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
`;

const markedDates = {
    '2024-06-01':{selected:true, selectedColor:'yellow'},
    '2024-06-02':{selected:true, selectedColor:'blue'},
    '2024-06-03':{selected:true, selectedColor:'blue'}
}

export default () => {

    return (<SafeContainer>
        <CalendarContainer>
            <Calendar
            scr
            markedDates={markedDates}
                theme={{
                    selectedDayBackgroundColor: 'blue',
                    todayTextColor: "red"
                }}
            />
        </CalendarContainer>
        <Tabs>{TabViewExample()}</Tabs>
    </SafeContainer>);
}