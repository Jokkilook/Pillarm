import { Text, View } from "react-native"
import styled from "styled-components"

const Container = styled(View)`
    scroll-margin: 10px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: lightcoral;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Info = styled(View)`

`;

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

export default () => {
    return <Container>
        <Info>
            <ContentText>약먹기</ContentText>
            <TimeText>17:00</TimeText>
            <DayText>월 화</DayText>
        </Info>
        <DayText>췤</DayText>
    </Container>
}