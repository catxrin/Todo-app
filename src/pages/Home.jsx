import TextField from "@mui/material/TextField";
import TaskCard from "../components/TaskCard";
import Collon from "../components/Collon";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { nanoid } from "nanoid";

export default function Home() {
  const [currentTask, setCurrentTask] = useState("");
  const [rotate, setRotate] = useState(false);
  const userEmail = sessionStorage.getItem("loggedIn");
  const id = nanoid();

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem(userEmail))
  );

  useEffect(() => {
    localStorage.setItem(userEmail, JSON.stringify(userData));
  }, [JSON.stringify(userData), userEmail]);

  return (
    <div className="flex flex-row sm:flex-col">
      <SideBar username={userData.username} userEmail={userEmail} />

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
              } cursor-pointer`}
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
