import { Typography } from "@mui/material";
import Tags from "./Tags";

export default function TaskCard({ task, setUserData }) {
  return (
    <div className="bg-white relative border-l-[6px] flex flex-row justify-between shadow-sm shadow-[#cccccccc] p-1.5 rounded-md border-black">
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
          {task.task}
        </Typography>

        <Tags task={task} setUserData={setUserData} />
      </div>
      <span
        onClick={() => {
          setUserData((prev) => ({
            ...prev,
            tasks: prev.tasks?.filter(({ id }) => id !== task.id),
          }));
        }}
        className="material-symbols-outlined absolute right-0 mr-2 cursor-pointer"
      >
        delete
      </span>
    </div>
  );
}
