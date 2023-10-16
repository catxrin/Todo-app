import { Typography } from "@mui/material";
import { moveTask } from "../helpers/dataActions";
export default function TagsDropdown(el) {
  const userEmail = sessionStorage.getItem("loggedIn");

  const style = (color) => {
    return {
      padding: 5,
      backgroundColor: color,
      fontWeight: 500,
      borderRadius: 5,
      fontSize: 15,
    };
  };
  return (
    <div className="flex flex-row p-1 rounded-md mt-2 gap-2.5">
      <Typography
        onClick={() => moveTask(userEmail, el, "Todo")}
        className="shadow-sm"
        style={style("#D3E5EF")}
        variant="p"
      >
        Todo
      </Typography>
      <Typography
        onClick={() => moveTask(userEmail, el, "In Progress")}
        className="shadow-sm"
        style={style("#E8DEEE")}
        variant="p"
      >
        Progress
      </Typography>
      <Typography
        onClick={() => moveTask(userEmail, el, "Done")}
        className="shadow-sm"
        style={style("#DBEDDB")}
        variant="p"
      >
        Done
      </Typography>
    </div>
  );
}
