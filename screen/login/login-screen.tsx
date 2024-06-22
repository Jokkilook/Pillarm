import styled from "styled-components";
import LoadingScreen from "../loading-screen"
import { Alert, NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { ScreenList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SiginBox = styled(View)`
  background-color: white;
  width: 80%;
  padding: 20px;
  border-radius: 30px;
`;

const InputField = styled(View)`
  padding: 3px;
`;
const UserID = styled(TextInput)`
  background-color: #efeded;
  margin-bottom: 7px;
  font-size: 20px;
  padding: 5px 12px;
  border-radius: 10px;
`;

const UserPW = styled(UserID)``;

const Button = styled(TouchableOpacity)`
  background-color: #0097ec;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 18px;
`;

export default () => {
    const nav = useNavigation<StackNavigationProp<ScreenList>>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>,
        type: string
      ) => {
        //1. 'e'에 담겨있는 사용자의 입력 텍스트를 가져온다
        const inputText = e.nativeEvent.text;
    
        //2. 입력 텍스트를 email, password state 에 저장한다.
        //2-1. 입력 텍스트가 email 이라면
        //2-2. 입력 텍스트가 password 라면
        switch (type) {
          case "email":
            setEmail(inputText);
            break;
          case "password":
            setPassword(inputText);
            break;
        }
      };

      const onSubmit = async () => {
        try {
          setLoading(true);
          if (email === "" || password === "") {
            setError("Please input user info");
            return;
          }
          
          var id = email+"@pillarm.com"
    
          await signInWithEmailAndPassword(auth, id, password);
          setError("");
          nav.goBack();
          
        } catch (e) {
          if (e instanceof FirebaseError) {
            setError(e.message);
            console.error(e.message);
          }
        } finally {
          setLoading(false);
        }
      };

    return <Container>
        <SiginBox>
            <InputField>
            <UserID
                placeholder="아이디"
                value={email}
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                returnKeyType="next"
            />
            <UserPW
                secureTextEntry={true}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => onChange(e, "password")}
                returnKeyType="done"
            />
            </InputField>
            <Button onPress={onSubmit}>
                <ButtonText>로그인</ButtonText>
            </Button>
      </SiginBox>
    </Container>
}