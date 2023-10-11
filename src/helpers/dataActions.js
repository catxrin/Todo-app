import { errorSnackBar, successSnackBar } from "../components/snackbars";
import {
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  NO_EMPTY_FIELDS,
  USER_EXIST,
  SUCCESS_REGISTER,
} from "../constants/messages";

const usersData = JSON.parse(localStorage.getItem("users")) || [];

export const addUser = (username, gmailUser, userPassword) => {
  const newData = usersData;

  const checkForUser = usersData?.find((user) => user.email === gmailUser);

  if (checkForUser) {
    errorSnackBar(USER_EXIST);
  } else if (
    (username !== "" || gmailUser !== "" || userPassword !== "") &&
    checkForUser === undefined
  ) {
    if (gmailUser === "" || username === "" || userPassword === "") {
      errorSnackBar("Do not leave empty fields");
    } else {
      newData.push({
        username: username,
        email: gmailUser,
        password: userPassword,
        tasks: [],
      });
      localStorage.setItem("users", JSON.stringify(newData));
      successSnackBar(SUCCESS_REGISTER);
    }
  }
};

// export const addTodo = (gmailUser, task) => {};

export const loginUser = (gmailUser, userPassword) => {
  const checkForUser = usersData?.find(
    (user) => user.email === gmailUser && user.password === userPassword
  );

  if (checkForUser) {
    localStorage.setItem("user", JSON.stringify(checkForUser));
    successSnackBar(SUCCESS_LOGIN);
    return true;
  } else if (gmailUser === "" || userPassword === "") {
    errorSnackBar(NO_EMPTY_FIELDS);
  } else {
    errorSnackBar(ERROR_LOGIN);
  }
};
