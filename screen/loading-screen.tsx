import { ActivityIndicator, Text, View } from "react-native";
import styled from "styled-components";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const LoadingText = styled(Text)`
  color: white;
  font-size: 30px;
  font-weight: bold;
`;

export default () => {
  return (
    <Container>
      <ActivityIndicator size={"large"} color={"#FF0000"} />
    </Container>
  );
};
