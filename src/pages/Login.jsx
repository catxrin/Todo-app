import { Button, Typography, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loginIcon from ".././assets/loginIcon.svg";
import { loginUser } from "../helpers/dataActions";

export default function Login() {
  const [gmailUser, setGmailUser] = useState("");
  const [userPassword, setUserPassword] = useState("");
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

            <Typography sx={{ fontFamily: "Gabarito" }} variant="p">
              Reach your goals, stay organised.
            </Typography>
          </div>
          <div className="flex flex-col">
            <TextField
              onChange={(e) => setGmailUser(e.target.value)}
              style={{
                width: 280,
              }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />

            <TextField
              type="password"
              onChange={(e) => setUserPassword(e.target.value)}
              style={{
                width: 280,
                marginBottom: 1,
                marginTop: 19,
              }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />

            <Link
              style={{ textAlign: "right", fontSize: "16px" }}
              href="/register"
            >
              No account? Make one!
            </Link>
          </div>
          <Button
            onClick={() => {
              loginUser(gmailUser, userPassword) && navigate("/home");
            }}
            style={{
              borderRadius: 0,
              backgroundColor: "#3F3D56",
              padding: "12px 0px",
              marginTop: 5,
              fontSize: "16px",
            }}
            variant="contained"
          >
            Login
          </Button>
        </div>

        <div className="sm:hidden">
          <img src={loginIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
