import { Typography } from "@mui/material";
import Tags from "./Tags";
export default function Card({ label }) {
  return (
    <div className="bg-white border-l-[6px] flex flex-row justify-between shadow-sm shadow-[#cccccccc] p-1.5 rounded-md border-black w-[220px]">
      <div className="flex flex-col">
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
        <Tags tag="In Progress" />
      </div>
      <span className="material-symbols-outlined">delete</span>
    </div>
  );
}
