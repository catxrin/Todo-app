import { Typography } from "@mui/material";
import Tags from "./Tags";
import { deleteTask } from "../helpers/userActions";

export default function TaskCard({ task, setUserData }) {
  return (
    <div className="bg-white relative border-l-[6px] flex flex-row justify-between shadow-sm shadow-[#cccccccc] p-1.5 rounded-md border-black w-[220px] sm:w-[450px]">
      <div className="flex flex-col relative">
        <Typography
          style={{
            fontFamily: "Gabarito",
            padding: 0,
            marginRight: 20,
            wordBreak: "break-all",
          }}
          variant="p"
        >
          {task.text}
        </Typography>

        <Tags task={task} setUserData={setUserData} />
      </div>
      <span
        onClick={() => {
          deleteTask(task._id, setUserData);
        }}
        className="material-symbols-outlined absolute right-0 mr-2"
      >
        delete
      </span>
    </div>
  );
}
