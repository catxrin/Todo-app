import { Typography } from "@mui/material";
import TagsDropdown from "./TagsDropdown";
import { useState } from "react";

const tagColors = {
  Todo: "bg-[#D3E5EF]",
  "In Progress": "bg-[#E8DEEE]",
  Done: "bg-[#DBEDDB]",
};
export default function Tags({ task, setUserData }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={`${
          tagColors[task.status]
        } px-1 rounded-lg text-center flex self-start mt-1 relative`}
      >
        <Typography
          style={{
            fontFamily: "Gabarito",
            fontSize: 14,
          }}
          variant="p"
        >
          {task.status}
        </Typography>
      </div>
      {showOptions && <TagsDropdown task={task} setUserData={setUserData} />}
    </>
  );
}
