import { Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import loginIcon from ".././assets/loginIcon.svg";
import { Field, Form } from "react-final-form";
import { loginUser } from "../helpers/dataActions";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-900 to-black flex justify-center items-center w-full h-screen sm:bg-gradient-to-br sm:from-white sm:to-white">
      <div className="flex flex-row bg-white rounded-md shadow-lg px-16 sm:px-10 gap-9 py-12 mx-10 sm:shadow-none">
        <div className="flex flex-col text-center gap-5">
          <div className="mb-2">
            <Typography
              style={{ fontFamily: "Gabarito", padding: 0, margin: 0 }}
              variant="h3"
            >
              Login
            </Typography>

            <Typography style={{ fontFamily: "Gabarito" }} variant="p">
              Reach your goals, stay organised.
            </Typography>
          </div>
          <Form
            onSubmit={(e) =>
              loginUser(e.gmailUser, e.userPassword) && navigate("/home")
            }
            initialValues={{ gmailUser: "", userPassword: "" }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <Field
                  type="text"
                  name="gmailUser"
                  component="input"
                  className="input-primary"
                  placeholder="Email"
                />

                <Field
                  type="password"
                  name="userPassword"
                  component="input"
                  className="input-primary"
                  placeholder="Password"
                />

                <button type="submit" className="btn-primary">
                  Login
                </button>
                <Link
                  style={{
                    textAlign: "right",
                    fontSize: "16px",
                  }}
                  href="/register"
                >
                  No account? Make one!
                </Link>
              </form>
            )}
          />
        </div>
        <div className="sm:hidden">
          <img src={loginIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
