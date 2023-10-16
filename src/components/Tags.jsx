import { Typography } from "@mui/material";
export default function Tags({ tag }) {
  return (
    <div
      className={`${tag === "In Progress" && "bg-[#E8DEEE]"} ${
        tag === "Done" && "bg-[#DBEDDB]"
      } ${
        tag === "Todo" && "bg-[#D3E5EF]"
      } px-1 rounded-lg text-center flex self-start mt-1`}
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
  );
}
