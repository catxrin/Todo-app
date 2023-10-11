import { errorSnackBar, successSnackBar } from "../components/snackbars";
import {
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  NO_EMPTY_FIELDS,
  USER_EXIST,
  SUCCESS_REGISTER,
} from "../constants/messages";

const usersData =
  Object.values(localStorage).map((data) => JSON.parse(data)) || [];

export const addUser = (username, gmailUser, userPassword) => {
  const checkForUser = usersData?.find((user) => user.email === gmailUser);

  if (checkForUser) {
    errorSnackBar(USER_EXIST);
  } else {
    if (gmailUser === "" || username === "" || userPassword === "") {
      errorSnackBar("Do not leave empty fields");
    } else {
      localStorage.setItem(
        gmailUser,
        JSON.stringify({
          username: username,
          email: gmailUser,
          password: userPassword,
          tasks: [],
        })
      );
      successSnackBar(SUCCESS_REGISTER);
      return true;
    }
  }
};

export const loginUser = (gmailUser, userPassword) => {
  const checkForUser = usersData?.find(
    (user) => user.email === gmailUser && user.password === userPassword
  );

  if (checkForUser) {
    localStorage.setItem(gmailUser, JSON.stringify(checkForUser));
    successSnackBar(SUCCESS_LOGIN);
    return true;
  } else if (gmailUser === "" || userPassword === "") {
    errorSnackBar(NO_EMPTY_FIELDS);
  } else {
    errorSnackBar(ERROR_LOGIN);
  }
};
