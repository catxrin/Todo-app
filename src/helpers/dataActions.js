import { errorSnackBar } from "../components/snackbars";
import { NO_EMPTY_FIELDS } from "../constants/messages";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

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

const createUserDataCollection = async (data) => {
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    country: data.country,
    phone: data.phone,
    tasks: [],
    username: data.username,
  });
};

const addUserDataToFirebase = async (data) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      data.gmailUser,
      data.userPassword
    );
    await createUserDataCollection(data);
    return true;
  } catch (err) {
    errorSnackBar(err.message);
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
      errorSnackBar("Incorrect email or password!");
    }
  }
};

const validatePassword = (password, confirmPassword) => {
  if (minLength(6)(password) || maxLength(20)(password)) {
    errorSnackBar("Password should be from 6 to 20 characters.");
    return false;
  }
  if (password !== confirmPassword) {
    errorSnackBar("Passwords does not match!");
    return false;
  }
  if (!regexPassword.test(password)) {
    errorSnackBar("Wrong password format");
    return false;
  }
  return true;
};

const validateUsername = (username) => {
  if (minLength(3)(username) || maxLength(10)(username)) {
    errorSnackBar("Username should be from 3 to 10 characters.");
    return false;
  }
  return true;
};

const validateEmptyFields = (data) => {
  if (Object.values(data).some((value) => required(value))) {
    errorSnackBar(required());
    return false;
  }
  return true;
};

const validatePhoneAndEmail = (phone, email) => {
  if (validatePhone(phone) || validateEmail(email)) {
    errorSnackBar(validatePhone());
    return false;
  }
  return true;
};

const validateData = (data) => {
  if (!validateEmptyFields(data)) return false;

  if (!validatePhoneAndEmail(data.phone, data.gmailUser)) return false;

  if (!validateUsername(data.username)) return false;

  if (!validatePassword(data.userPassword, data.confirmPassword)) return false;

  return true;
};

export const addUserToDb = async (data) => {
  if (validateData(data) && (await addUserDataToFirebase(data))) return true;
};
