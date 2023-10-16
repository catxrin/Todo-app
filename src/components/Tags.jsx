import { Typography } from "@mui/material";
import TagsDropdown from "./TagsDropdown";
import { useState } from "react";
export default function Tags({ tag, el }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={`${tag === "In Progress" && "bg-[#E8DEEE]"} ${
          tag === "Done" && "bg-[#DBEDDB]"
        } ${
          tag === "Todo" && "bg-[#D3E5EF]"
        } px-1 rounded-lg text-center flex self-start mt-1 relative`}
      >
        <Typography
          style={{
            fontFamily: "Gabarito",
            fontSize: 14,
          }}
          variant="p"
        >
          {tag}
        </Typography>
      </div>
      {showOptions && <TagsDropdown el={el} />}
    </>
  );
}
