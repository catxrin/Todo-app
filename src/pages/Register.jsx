import { Typography } from "@mui/material";
import RegisterInputs from "../components/RegisterInputs";
import { APP_SLOGAN } from "../constants/messages";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Register() {
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
              Register
            </Typography>

            <Typography className="label" variant="p">
              {APP_SLOGAN}
            </Typography>
          </div>
          <RegisterInputs />
        </div>
      </div>
    </div>
  );
}
