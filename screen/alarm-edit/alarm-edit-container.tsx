// import { useEffect, useState } from "react";
// import { UserData } from "../../models/user-data-model";
// import { loadUser } from "../async_storage_helper";
// import AlarmEditScreen from "./alarm-edit-screen";

// export default () => {
//   const [user, setUser] = useState<UserData>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadUser().then((user) => {
//       setUser(user);
//       setLoading(false);
//     });
//   }, []);

//   return <AlarmEditScreen />
// };
