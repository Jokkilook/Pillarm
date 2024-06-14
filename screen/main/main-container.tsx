import { useEffect, useState } from "react";
import MainScreen from "./main-screen";
import { UserData } from "../../models/user-data-model";
import { loadUser, resetUser } from "../async_storage_helper";
import { MarkedDates } from "react-native-calendars/src/types";

export default () => {
  const [user, setUser] = useState<UserData>(UserData.emptyUser());
  const [loading, setLoading] = useState(true);
  var checkers: MarkedDates = {};

  useEffect(() => {
    loadUser().then((user) => {
      setUser(user);
      console.log(user);
      try {
        user.records.forEach((list, date) => {
          var check = true;

          list.forEach((record) => {
            check = check && record.isEaten;
          });

          if (check) {
            checkers[date] = {
              selected: check,
              selectedColor: check ? "0097EC" : "FFD600",
            };
          }
        });
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    });
  }, []);

  return <MainScreen user={user} loading={loading} checkers={checkers} />;
};
