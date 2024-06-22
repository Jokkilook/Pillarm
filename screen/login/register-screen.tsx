import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { auth } from '../../firebaseConfig'
import { ScreenList } from "../../App";

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

const UserName = styled(UserID)``;

const UserPW = styled(UserID)``;

const Footer = styled(View)`
  margin-top: 15px;
`;

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<ScreenList>>();

  const goToSignin = () => {
    navigation.goBack();
  };

  const onChangeText = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: string
  ) => {
    const inputText = e.nativeEvent.text;

    switch (type) {
      case "email":
        setEmail(inputText);
        break;
      case "password":
        setPassword(inputText);
        break;
      case "name":
        setName(inputText);
        break;
    }
  };

  //서버에 계정 정보를 보내는 함수 -파이어베이스
  //서버와 통신하기 때문에 비동기로 선언해야함
  const onSubmit = async () => {
    //계정정보
    //1.Id
    //2.Pw
    //3.Name
    try {
      setLoading(true);
      if (name === "" || email === "" || password === "") {
        setError("Please input user info");
        return;
      }

      var id = email+"@pillarm.com"

      //파이어베이스로 보내기
      const credential = await createUserWithEmailAndPassword(
        auth,
        id,
        password
      );
      await updateProfile(credential.user, { displayName: name });
      goToSignin();
      
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
        console.log(error);
      setLoading(false);
    }
  };

  //화면 디자인 코드
  return (
    <Container >
      <SiginBox>
        <InputField>
          <UserName
            placeholder="닉네임"
            value={name}
            onChange={(e) => onChangeText(e, "name")}
            keyboardType="default"
            returnKeyType="done"
          />
          <UserID
            placeholder="아이디"
            value={email}
            onChange={(e) => onChangeText(e, "email")}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <UserPW
            secureTextEntry={true}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => onChangeText(e, "password")}
            returnKeyType="done"
          />
        </InputField>
        <Footer>
          <Button onPress={onSubmit}>
            <ButtonText>
              {loading ? "가입 중..." : "회원가입"}
            </ButtonText>
          </Button>
        </Footer>
      </SiginBox>
    </Container>
  );
};
