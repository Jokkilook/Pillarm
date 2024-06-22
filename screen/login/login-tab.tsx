import styled from "styled-components";
import LoadingScreen from "../loading-screen"
import { Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ScreenList } from "../../App";
import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import * as firebase from "firebase/auth";


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

const Main = styled(View)`
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
`;

const HeaderText = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

const Button = styled(TouchableOpacity)`
  width: 40%;
  background-color: #0097ec;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 18px;
`;

export default () => {
    const nav = useNavigation<StackNavigationProp<ScreenList>>();

    const [user,setUser] = useState<firebase.User | null>();

    useEffect(()=>{
        auth.onAuthStateChanged((userState:firebase.User | null)=>{
          if(userState){
            setUser(userState);
          }else{
            setUser(null);
          }
        })
      },[])


    const goToLogin = () =>{
        nav.navigate("Login");
    }

    const goToRegister = () =>{
        nav.navigate("Register");
    }

    const logout = () => {
        auth.signOut();
    }

    const name = <HeaderText>{user?.displayName}님이 로그인 중</HeaderText>

    const login = <Button onPress={goToLogin}>
                    <ButtonText>로그인</ButtonText>
                  </Button>

    const register =  <Button onPress={goToRegister}>
                        <ButtonText>회원가입</ButtonText>
                      </Button>
    const logoutS = <Button onPress={logout}>
                        <ButtonText>로그아웃</ButtonText>
                    </Button>

    return <Container>
        <Header>
            <HeaderText>로그인</HeaderText>
        </Header>
        <Main>
        {user? name : null}
        {user? null : login} 
        {user? null : register}
        {user? logoutS : null}
        </Main>
    </Container>
}