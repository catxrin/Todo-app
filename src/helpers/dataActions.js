import { errorSnackBar, successSnackBar } from "../components/snackbars";
import { NO_EMPTY_FIELDS, SUCCESS_REGISTER } from "../constants/messages";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

export function required(value) {
  return value != null && value !== "" ? undefined : "This field is required";
}

export const regexPhone = /^[0-9+]+$/;

export function validatePhone(value) {
  return value && regexPhone.test(value) ? undefined : "Wrong phone format";
}

export const regexEmail =
  /^[^\s]+[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?[^\s]+$/;

export function validateEmail(value) {
  return value && regexEmail.test(value) ? undefined : "Wrong format";
}

export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/;

export function validatePassword(value) {
  return value && regexPassword.test(value) ? undefined : "Wrong format";
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
const signIn = async (data) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      data.gmailUser,
      data.userPassword
    );
    successSnackBar(SUCCESS_REGISTER);
  } catch (err) {
    errorSnackBar(err);
  }
};

export const loginUser = async (gmailUser, userPassword) => {
  if (gmailUser === "" || userPassword === "") {
    errorSnackBar(NO_EMPTY_FIELDS);
  } else {
    try {
      await signInWithEmailAndPassword(auth, gmailUser, userPassword);
      localStorage.setItem("loggedIn", gmailUser);
      return true;
    } catch (err) {
      errorSnackBar(err.message);
    }
  }
};

const createUserDataCollection = async (data) => {
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      country: data.country,
      phone: data.phone,
      tasks: [],
      username: data.username,
    });
  } catch (err) {
    errorSnackBar(err);
  }
};

export const addUser = async (data) => {
  if (Object.values(data).some((value) => required(value) !== undefined)) {
    errorSnackBar(required());
  } else if (
    (validatePhone(data.phone) || validateEmail(data.gmailUser)) !== undefined
  ) {
    errorSnackBar(validatePhone());
  } else if (
    (minLength(3)(data.username) || maxLength(10)(data.username)) !== undefined
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
    await signIn(data);
    await createUserDataCollection(data);
    return true;
  }
};
