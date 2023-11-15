import { Autocomplete } from "@mui/material";
import { addUserToDb } from "../helpers/dataActions";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getCountriesData } from "../server/server";
import { HAVE_AN_ACCOUNT, SUCCESS_REGISTER } from "../constants/messages";
import { successSnackBar } from "./snackbars";

export default function RegisterInputs() {
  const [countriesData, setCountriesData] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getCountriesData(setCountriesData);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (await addUserToDb(data)) {
          navigate("/");
          successSnackBar(SUCCESS_REGISTER);
        }
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
          />

          <input
            {...register("gmailUser")}
            name="gmailUser"
            className="input-primary"
            placeholder="Email"
          />

          <input
            {...register("phone")}
            className="input-primary"
            placeholder="Phone"
            name="phone"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Autocomplete
            name="country"
            options={countriesData}
            style={{ width: 280, marginY: 8 }}
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

      <button className="btn-primary">Register</button>

      <Link className="form-links" to="/">
        {HAVE_AN_ACCOUNT}
      </Link>
    </form>
  );
}
