import { Typography } from "@mui/material";
import { updateTask } from "../helpers/userActions";
export default function TagsDropdown({ task, setUserData }) {
  const statuses = {
    statusTodo: "Todo",
    statusInProgress: "In Progress",
    statusDone: "Done",
  };

  const tagStyle = (color) => {
    return {
      padding: 5,
      backgroundColor: color,
      fontWeight: 500,
      borderRadius: 5,
      fontSize: 15,
    };
  };
  return (
    <div className="flex flex-row p-1 mt-2 gap-2.5 border-t-2 border-gray-200 pt-2">
      <Typography
        onClick={() => {
          updateTask(task._id, statuses.statusTodo, setUserData);
        }}
        className="shadow-sm"
        style={tagStyle("#D3E5EF")}
        variant="p"
      >
        Todo
      </Typography>
      <Typography
        onClick={() => {
          updateTask(task._id, statuses.statusInProgress, setUserData);
        }}
        className="shadow-sm"
        style={tagStyle("#E8DEEE")}
        variant="p"
      >
        Progress
      </Typography>
      <Typography
        onClick={() => {
          updateTask(task._id, statuses.statusDone, setUserData);
        }}
        className="shadow-sm"
        style={tagStyle("#DBEDDB")}
        variant="p"
      >
        Done
      </Typography>
    </div>
  );
}
