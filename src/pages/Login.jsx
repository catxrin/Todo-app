import TextField from "@mui/material/TextField";
import usersData from "././../data/users.json";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
export default function Login() {
  const [gmailUser, setGmailUser] = useState("");
  const [userPassword, setUserPassword] = useState("");
  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-900 to-black w-screen h-screen">
      <div className="flex justify-center text-center m-auto place-items-center">
        <div className="flex flex-col gap-5 bg-white rounded-md px-6 py-16 mt-32">
          <Typography sx={{ fontFamily: "Gabarito" }} variant="h3">
            Login
          </Typography>
          <TextField
            onChange={(e) => setGmailUser(e.target.value)}
            sx={{
              width: 250,
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setUserPassword(e.target.value)}
            sx={{
              width: 250,
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button
            onClick={() => console.log(usersData.users)}
            variant="outlined"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
