import { Typography } from "@mui/material";
import RegisterInputs from "../components/RegisterInputs";

export default function Register() {
  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-900 to-black flex justify-center items-center w-full h-screen sm:bg-gradient-to-br sm:from-white sm:to-white">
      <div className="flex flex-row bg-white rounded-md shadow-lg px-16 sm:px-10 gap-9 py-12 mx-10 sm:shadow-none">
        <div className="flex flex-col text-center gap-5">
          <div className="mb-2">
            <Typography
              style={{ fontFamily: "Gabarito", padding: 0, margin: 0 }}
              variant="h3"
            >
              Register
            </Typography>

            <Typography sx={{ fontFamily: "Gabarito" }} variant="p">
              Reach your goals, stay organised.
            </Typography>
          </div>
          <RegisterInputs />
        </div>
      </div>
    </div>
  );
}
