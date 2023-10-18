import { Typography } from "@mui/material";
export default function TagsDropdown({ task, setUserData }) {
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
    <div className="flex flex-row p-1 mt-2 gap-2.5 border-t-2 border-gray-200 pt-2">
      <Typography
        onClick={() => {
          setUserData((prev) => {
            prev.tasks.find((el) => el.id === task.id).status = "Todo";
            return { ...prev };
          });
        }}
        className="shadow-sm"
        style={style("#D3E5EF")}
        variant="p"
      >
        Todo
      </Typography>
      <Typography
        onClick={() => {
          setUserData((prev) => {
            prev.tasks.find((el) => el.id === task.id).status = "In Progress";
            return { ...prev };
          });
        }}
        className="shadow-sm"
        style={style("#E8DEEE")}
        variant="p"
      >
        Progress
      </Typography>
      <Typography
        onClick={() => {
          setUserData((prev) => {
            prev.tasks.find((el) => el.id === task.id).status = "Done";
            console.log(prev);
            return { ...prev };
          });
        }}
        className="shadow-sm"
        style={style("#DBEDDB")}
        variant="p"
      >
        Done
      </Typography>
    </div>
  );
}
