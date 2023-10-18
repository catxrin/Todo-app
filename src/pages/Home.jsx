import { Typography, Button } from "@mui/material";
import profilePicture from "../assets/undraw_relaunch_day_902d.svg";
import TextField from "@mui/material/TextField";
import TaskCard from "../components/TaskCard";
import Collon from "../components/Collon";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../helpers/dataActions";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

export default function Home() {
  const [currentTask, setCurrentTask] = useState("");
  const [rotate, setRotate] = useState(false);
  const [quote, setQuote] = useState("");
  const userEmail = sessionStorage.getItem("loggedIn");
  const navigate = useNavigate();
  const id = nanoid();

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem(userEmail))
  );

  useEffect(() => {
    localStorage.setItem(userEmail, JSON.stringify(userData));
  }, [JSON.stringify(userData), userEmail]);

  const styleBtn = {
    borderRadius: 2,
    backgroundColor: "#3F3D56",
    padding: "5px 5px",
    marginTop: 5,
    fontSize: "14px",
  };

  const getQuote = () => {
    axios
      .get("https://dummyjson.com/quotes/random")
      .then((res) => setQuote(res.data.quote))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="flex flex-row sm:flex-col">
      <div className="h-screen sm:h-[300px] mb-10 flex flex-col justify-center text-center bg-slate-100 shadow-md shadow-slate-300 w-[300px] sm:w-screen px-5">
        <div className="flex flex-col justify-center place-items-center mb-16 sm:mb-0">
          <div className="w-[170px] sm:hidden">
            <img
              className="object-contain border-2 border-black rounded-full"
              src={profilePicture}
            />
          </div>
          <Typography
            style={{ fontFamily: "Gabarito", padding: 0 }}
            variant="h5"
            type="text"
          >
            Welcome, {userData.username}
          </Typography>
          <div className="shadow-sm shadow-[#cccccccc] bg-white border-x-4 border-black rounded p-2 mb-5 mt-3">
            <Typography variant="p">“{quote}„</Typography>
          </div>
          <div className="flex flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                deleteUser(userEmail);
                navigate("/");
              }}
              style={styleBtn}
              variant="contained"
            >
              Delete Account
            </Button>

            <Button
              onClick={() => navigate("/")}
              style={styleBtn}
              variant="contained"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:px-10 gap-1 h-screen sm:h-auto justify-center place-items-center m-auto">
        <div className="flex flex-row gap-1">
          <TextField
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setUserData((prev) => {
                  prev?.tasks.push({
                    task: currentTask.trim(),
                    status: "Todo",
                    id: id,
                  });
                  return prev;
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
                setUserData({
                  ...userData,
                  tasks: userData.tasks.reverse(),
                });
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

        <div className="flex flex-row sm:flex-col justify-between gap-8 items-end">
          <Collon
            label="Todo"
            color="bg-[#F5FAFC]"
            data={userData.tasks
              ?.filter((t) => t.status === "Todo")
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setUserData={setUserData}
                  color="bg-[#D3E5EF]"
                />
              ))}
          />
          <Collon
            color="bg-[#FBF9FD]"
            label="In Progress 🔥"
            data={userData.tasks
              ?.filter((t) => t.status === "In Progress")
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setUserData={setUserData}
                  color="bg-[#D3E5EF]"
                />
              ))}
          />
          <Collon
            label="Done 🚀"
            color="bg-[#F7FAF7]"
            data={userData.tasks
              ?.filter((t) => t.status === "Done")
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setUserData={setUserData}
                  color="bg-[#D3E5EF]"
                />
              ))}
          />
        </div>
      </div>
    </div>
  );
}
