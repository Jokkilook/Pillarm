import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import Ionicons from '@expo/vector-icons/Ionicons';

const Container = styled(View)`
    height:100%;
    width: 100%
`;

const Header = styled(View)`
    padding: 10px 20px;
    border-top-width: 0.5px;
    border-bottom-width: 0.5px;
    border-color:#D9D9D9;
    height: 14%;
    width:100%;
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
    return <Container>
    <Header>
        <HeaderText>알람 관리</HeaderText>
        <AddButton onPress={()=>{}}>
            <Ionicons name="add" size={30} color="black" />
        </AddButton>
    </Header>
    <ScrollView>

    </ScrollView>
    </Container>
}