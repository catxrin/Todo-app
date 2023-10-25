import { errorSnackBar, successSnackBar } from "../components/snackbars";
import {
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  NO_EMPTY_FIELDS,
  USER_EXIST,
  SUCCESS_REGISTER,
} from "../constants/messages";

let usersData =
  Object.values(localStorage).map((data) => JSON.parse(data)) || [];

export const deleteUser = (gmailUser) => {
  localStorage.removeItem(gmailUser);
  usersData = Object.values(localStorage).map((data) => JSON.parse(data)) || [];
};

export function required(value) {
  return value != null && value !== "" ? undefined : "This field is required";
}

export const regexPhone = /^[0-9+]+$/;
export function validatePhone(value) {
  return value && regexPhone.test(value) ? undefined : "Wrong format";
}

export const regexEmail =
  /^[^\s]+[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?[^\s]+$/;

export function validateEmail(value) {
  return value && regexEmail.test(value) ? undefined : "Wrong format";
}

export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/;

export function validatePassword(value) {
  return value && regexPassword.test(value)
    ? undefined
    : "Wrong password format";
}

export function minLength(min) {
  return (value) =>
    value.length >= min
      ? undefined
      : { text: "APP.COMMON.FORM.LEAST_SYMBOLS", values: [min] };
}

export function maxLength(max) {
  return (value) =>
    value.length <= max
      ? undefined
      : { text: "APP.COMMON.FORM.MOST_SYMBOLS", values: [max] };
}
export const addUser = (data) => {
  const checkForUser = usersData?.find((user) => user.email === data.gmailUser);

  if (checkForUser) {
    errorSnackBar(USER_EXIST);
  } else {
    if (Object.values(data).some((value) => required(value) !== undefined)) {
      errorSnackBar(required());
    } else if (
      (validatePhone(data.phone) || validateEmail(data.gmailUser)) !== undefined
    ) {
      errorSnackBar(validatePhone());
    } else if (
      (minLength(3)(data.username) || maxLength(10)(data.username)) !==
      undefined
    ) {
      errorSnackBar("Username should be 3 to 10 characters.");
    } else if (
      (minLength(6)(data.userPassword) || maxLength(20)(data.userPassword)) !==
      undefined
    ) {
      errorSnackBar("Password should be 6 to 20 characters.");
    } else if (data.userPassword !== data.confirmPassword) {
      errorSnackBar("Passwords does not match!");
    } else if (validatePassword(data.userPassword) !== undefined) {
      errorSnackBar(validatePassword());
    } else {
      const newUser = {
        username: data.username,
        email: data.gmailUser,
        password: data.userPassword,
        phone: data.phone,
        country: data.country,
        tasks: [],
      };
      usersData.push(newUser);

      localStorage.setItem(data.gmailUser, JSON.stringify(newUser));

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
