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
      const newUser = {
        username: username,
        email: gmailUser,
        password: userPassword,
        tasks: [],
      };
      usersData.push(newUser);

      localStorage.setItem(gmailUser, JSON.stringify(newUser));

      successSnackBar(SUCCESS_REGISTER);
      return true;
    }
  }
};

export const addTodo = (gmailUser, task) => {
  usersData?.find((user) => user.email === gmailUser)?.tasks.push(task);
  localStorage.setItem(
    gmailUser,
    JSON.stringify(usersData?.find((user) => user.email === gmailUser))
  );
};

export const sortTasks = (gmailUser) => {
  usersData?.find((user) => user.email === gmailUser)?.tasks.reverse();
  localStorage.setItem(
    gmailUser,
    JSON.stringify(usersData?.find((user) => user.email === gmailUser))
  );
};

export const deleteTodo = (gmailUser, task) => {
  const user = usersData
    ?.find((user) => user.email === gmailUser)
    ?.tasks.filter((el) => el.id !== task.id);

  usersData.find((user) => user.email === gmailUser).tasks = user;
  console.log(user);
  localStorage.setItem(
    gmailUser,
    JSON.stringify(usersData?.find((user) => user.email === gmailUser))
  );
};

export const deleteAccount = (gmailUser) => {
  usersData.filter((user) => user.email !== gmailUser);
};

export const moveTask = (gmailUser, task, changeTo) => {
  usersData
    .find((user) => user.email === gmailUser)
    .tasks.find((el) => el.id === task.el.id).status = changeTo;

  localStorage.setItem(
    gmailUser,
    JSON.stringify(usersData?.find((user) => user.email === gmailUser))
  );
};

export const loginUser = (gmailUser, userPassword) => {
  const checkForUser = usersData?.find(
    (user) => user.email === gmailUser && user.password === userPassword
  );

  if (checkForUser) {
    localStorage.setItem(gmailUser, JSON.stringify(checkForUser));
    successSnackBar(SUCCESS_LOGIN);
    sessionStorage.setItem("loggedIn", gmailUser);
    return true;
  } else if (gmailUser === "" || userPassword === "") {
    errorSnackBar(NO_EMPTY_FIELDS);
  } else {
    errorSnackBar(ERROR_LOGIN);
  }
};
