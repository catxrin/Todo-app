import { Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import loginIcon from ".././assets/loginIcon.svg";
import { Field, Form } from "react-final-form";
import { loginUser } from "../helpers/dataActions";
import { APP_SLOGAN, CREATE_ACCOUNT } from "../constants/messages";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) navigate("/home");
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-900 to-black flex justify-center items-center w-full h-screen sm:bg-gradient-to-br sm:from-white sm:to-white">
      <div className="flex flex-row bg-white rounded-md shadow-lg px-16 sm:px-10 gap-9 py-12 mx-10 sm:shadow-none">
        <div className="flex flex-col text-center gap-5">
          <div className="mb-2">
            <Typography className="label" variant="h3">
              Login
            </Typography>

            <Typography className="label" variant="p">
              {APP_SLOGAN}
            </Typography>
          </div>
          <Form
            onSubmit={async (e) => {
              (await loginUser(e.gmailUser, e.userPassword)) &&
                navigate("/home");
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <Field
                  autoComplete="on"
                  name="gmailUser"
                  component="input"
                  className="input-primary"
                  placeholder="Email"
                />

                <Field
                  autoComplete="on"
                  type="password"
                  name="userPassword"
                  component="input"
                  className="input-primary"
                  placeholder="Password"
                />

                <button className="btn-primary">Login</button>

                <Link className="form-links" to="/register">
                  {CREATE_ACCOUNT}
                </Link>
              </form>
            )}
          />
        </div>
        <div className="sm:hidden">
          <img src={loginIcon} />
        </div>
      </div>
    </div>
  );
}
