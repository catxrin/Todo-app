import { Autocomplete } from "@mui/material";
import { Link } from "@mui/material";
import { addUser } from "../helpers/dataActions";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getCountriesData } from "../server/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { errorSnackBar } from "./snackbars";

export default function RegisterInputs() {
  const [countriesData, setCountriesData] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const signIn = async (data) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.gmailUser,
        data.userPassword
      );
    } catch (err) {
      errorSnackBar(err);
    }
  };

  const createUserDataCollection = async (data) => {
    try {
      console.log(auth.currentUser.uid);
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        country: data.country,
        phone: data.phone,
        tasks: [],
        username: data.username,
      });
    } catch (err) {
      console.log(auth.currentUser.uid);
      errorSnackBar("Message from register form", err);
    }
  };

  useEffect(() => {
    getCountriesData(setCountriesData);
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        createUserDataCollection(data);
        signIn(data);
        addUser(data) && navigate("/");
      })}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-row gap-5 sm:flex sm:flex-col sm:gap-3">
        <div className="flex flex-col gap-3">
          <input
            {...register("username")}
            name="username"
            className="input-primary"
            placeholder="Username"
            type="text"
          />

          <input
            {...register("gmailUser")}
            name="gmailUser"
            className="input-primary"
            placeholder="Email"
            type="text"
          />

          <input
            {...register("phone")}
            className="input-primary"
            placeholder="Phone"
            type="text"
            name="phone"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Autocomplete
            name="country"
            options={countriesData}
            style={{ width: 280, marginTop: 8, marginBottom: 8 }}
            renderInput={(params) => (
              <TextField {...register("country")} {...params} label="Country" />
            )}
          />
          <input
            {...register("userPassword")}
            type="password"
            name="userPassword"
            className="input-primary"
            placeholder="Password"
          />

          <input
            type="password"
            {...register("confirmPassword")}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input-primary"
          />
        </div>
      </div>

      <button type="submint" className="btn-primary">
        Register
      </button>
      <Link style={{ textAlign: "right", fontSize: "16px" }} href="/">
        Already have an account? Login!
      </Link>
    </form>
  );
}
