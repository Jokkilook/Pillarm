import { useEffect, useState } from "react";
import { UserData } from "../../models/user-data-model";
import { loadUser } from "../async_storage_helper";
import AlarmManagementScreen from "./alarm-management-screen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenList } from "../../App";

export default () => {
  const navigations = useNavigation<StackNavigationProp<ScreenList>>();

  const [user, setUser] = useState<UserData>(UserData.emptyUser());
  const [loading, setLoading] = useState(true);

  const updateUser = (user: UserData) => {
    setUser(user);
  };

  useEffect(() => {
    const unsubscribe = navigations.addListener("focus", () => {
      // 화면이 focus 됐을 때 필요한 작업 수행 (예: 데이터 새로고침)
      loadUser().then((user) => {
        setLoading(true);
        setUser(user);
        setLoading(false);
      });
    });

    loadUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return <AlarmManagementScreen user={user} loading={loading} />;
};
