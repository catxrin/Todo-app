import { Typography, Button } from "@mui/material";
import profilePicture from "../assets/undraw_relaunch_day_902d.svg";
import TextField from "@mui/material/TextField";
import Card from "../components/TaskCard";
import Collon from "../components/Collon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { sortTasks, addTodo, deleteAccount } from "../helpers/dataActions";

export default function Home() {
  const [currentTask, setCurrentTask] = useState("");
  const [rotate, setRotate] = useState(false);
  const userEmail = sessionStorage.getItem("loggedIn");
  const userData = JSON.parse(localStorage.getItem(userEmail));
  const navigate = useNavigate();
  const id = nanoid();

  return (
    <div className="flex flex-row">
      <div className="h-screen flex flex-col justify-center text-center bg-slate-100 shadow-md shadow-slate-300 w-[300px]">
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
              onClick={() => {
                deleteAccount(userEmail);
                navigate("/");
              }}
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
      <div className="flex flex-col gap-1 h-screen justify-center place-items-center m-auto">
        <div className="flex flex-row gap-1">
          <TextField
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTodo(userEmail, {
                  task: currentTask.trim(),
                  status: "Todo",
                  id: id,
                });
                setCurrentTask("");
              }
            }}
            style={{
              width: 500,
              marginBottom: 30,
            }}
            id="outlined-basic"
            label="Write your tasks here..."
            variant="outlined"
          />
          <div>
            <span
              onClick={() => {
                sortTasks(userEmail);
                setRotate(!rotate);
              }}
              className={`material-symbols-outlined text-[50px] text-[#3F3D56] ${
                rotate && "rotate-180"
              }`}
            >
              sort
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-8 items-end">
          <Collon
            label="Todo"
            color="bg-[#F5FAFC]"
            data={
              <>
                {userData.tasks?.map((el, i) => {
                  if (el.status === "Todo") {
                    return (
                      <Card
                        el={el}
                        key={i}
                        color="bg-[#D3E5EF]"
                        label={el.task}
                        tag={el.status}
                      />
                    );
                  }
                })}
              </>
            }
          />
          <Collon
            color="bg-[#FBF9FD]"
            label="In Progress 🔥"
            data={
              <>
                {userData.tasks?.map((el, i) => {
                  if (el.status === "In Progress") {
                    return (
                      <Card
                        el={el}
                        key={i}
                        color="bg-[#D3E5EF]"
                        label={el.task}
                        tag={el.status}
                      />
                    );
                  }
                })}
              </>
            }
          />
          <Collon
            label="Done 🚀"
            color="bg-[#F7FAF7]"
            data={
              <>
                {userData.tasks?.map((el, i) => {
                  if (el.status === "Done") {
                    return (
                      <Card
                        el={el}
                        key={i}
                        color="bg-[#D3E5EF]"
                        label={el.task}
                        tag={el.status}
                      />
                    );
                  }
                })}
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
