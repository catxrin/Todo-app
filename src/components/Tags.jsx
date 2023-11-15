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
        className={`flex self-start mt-1 relative`}
      >
        <p className={`tag-primary ${tagColors[task.status]}`}>{task.status}</p>
      </div>
      {showOptions && <TagsDropdown task={task} setUserData={setUserData} />}
    </>
  );
}
