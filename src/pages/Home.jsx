import TextField from "@mui/material/TextField";
import TaskCard from "../components/TaskCard";
import Collon from "../components/Collon";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { nanoid } from "nanoid";
import { db, auth } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

export default function Home() {
  const [currentTask, setCurrentTask] = useState("");
  const [rotate, setRotate] = useState(false);
  const [userData, setUserData] = useState();
  const [tasksUser, setTasksUser] = useState(userData?.tasks);
  const id = nanoid();

  const updateUser = (data) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, data);
      }
    });
  };
  async function getUser() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
      }
    });
  }

  useEffect(() => {
    getUser();
    setTasksUser(userData?.tasks);
  }, []);

  useEffect(
    () => {
      updateUser({
        tasks: userData?.tasks,
      });
      setTasksUser(userData?.tasks);
    },
    [userData],
    []
  );

  return (
    <div className="flex flex-row sm:flex-col sm:w-screen">
      <SideBar username={userData?.username} />
      <div className="flex flex-col gap-1 w-full h-screen sm:mb-10 sm:h-auto justify-center place-items-center m-auto">
        <div className="flex flex-row gap-1 ">
          <TextField
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && currentTask.trim().length > 0) {
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
              marginBottom: 30,
            }}
            className="sm:w-[65vw] w-[40vw]"
            id="outlined-basic"
            label="Write your tasks here..."
            variant="outlined"
          />
          <div>
            <span
              onClick={() => {
                setTasksUser(tasksUser.reverse());
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
        <div className="flex flex-row sm:flex-col mx-10 justify-between gap-8 items-end">
          <Collon
            label="Todo"
            color="bg-[#F5FAFC]"
            data={tasksUser
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
            data={tasksUser
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
            data={tasksUser
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
