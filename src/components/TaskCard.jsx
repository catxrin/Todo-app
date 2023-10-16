import { Typography } from "@mui/material";
import Tags from "./Tags";
import { deleteTodo } from "../helpers/dataActions";
export default function Card({ label, tag, el }) {
  const userEmail = sessionStorage.getItem("loggedIn");

  return (
    <div className="bg-white relative border-l-[6px] flex flex-row justify-between shadow-sm shadow-[#cccccccc] p-1.5 rounded-md border-black w-[220px]">
      <div className="flex flex-col relative">
        <Typography
          style={{
            fontFamily: "Gabarito",
            padding: 0,
            margin: 0,
            wordBreak: "break-all",
          }}
          variant="p"
        >
          {label}
        </Typography>

        <Tags tag={tag} el={el} />
      </div>
      <span
        onClick={() => {
          deleteTodo(userEmail, el);
          location.reload();
        }}
        className="material-symbols-outlined absolute right-0 mr-2"
      >
        delete
      </span>
    </div>
  );
}
