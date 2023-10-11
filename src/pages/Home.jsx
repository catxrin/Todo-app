import { Typography, Button } from "@mui/material";
import profilePicture from "../assets/undraw_relaunch_day_902d.svg";
import TextField from "@mui/material/TextField";
import Card from "../components/TaskCard";
import Collon from "../components/Collon";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row">
      <div className="h-screen flex flex-col justify-center text-center bg-slate-50 shadow-md w-[300px]">
        <div className="flex flex-col justify-center place-items-center mb-16">
          <div className="w-[170px]">
            <img className="object-contain" src={profilePicture} />
          </div>
          <Typography
            style={{ fontFamily: "Gabarito", padding: 0, marginBottom: 10 }}
            variant="h5"
          >
            Welcome, Jonh
          </Typography>
          <div className="flex flex-row gap-3 justify-center">
            <Button
              onClick={() => {}}
              style={{
                borderRadius: 2,
                backgroundColor: "#3F3D56",
                padding: "5px 5px",
                marginTop: 5,
                fontSize: "14px",
              }}
              variant="contained"
            >
              Delete Account
            </Button>
            <Button
              onClick={() => navigate("/")}
              style={{
                borderRadius: 2,
                backgroundColor: "#3F3D56",
                padding: "5px 5px",
                marginTop: 5,
                fontSize: "14px",
              }}
              variant="contained"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen justify-center place-items-center m-auto">
        <TextField
          style={{
            width: 500,
            marginBottom: 30,
          }}
          id="outlined-basic"
          label="Write your tasks here..."
          variant="outlined"
        />
        <div className="flex flex-row justify-between gap-6 items-end">
          <Collon
            label="Todo"
            color="bg-[#F5FAFC]"
            data={
              <>
                <Card color="bg-[#D3E5EF]" label="GYM" />
                <Card color="bg-[#D3E5EF]" label="GYM" />
                <Card color="bg-[#D3E5EF]" label="GYM" />
                <Card color="bg-[#D3E5EF]" label="GYM" />
              </>
            }
          />
          <Collon
            color="bg-[#FBF9FD]"
            label="In Progress 🔥"
            data={
              <Card
                color="bg-[#E8DEEE]"
                label="GYM,kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
              />
            }
          />
          <Collon
            label="Done 🚀"
            color="bg-[#F7FAF7]"
            data={<Card color="bg-[#DBEDDB]" label="Go take a shower" />}
          />
        </div>
      </div>
    </div>
  );
}
