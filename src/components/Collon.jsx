import { Typography } from "@mui/material";

export default function Collon({ data, label, color }) {
  return (
    <div
      className={`overflow-y-auto rounded-t-lg shadow-md shadow-[#cccccccc] h-[400px] py-2 px-3 flex flex-col ${color}`}
    >
      <Typography
        style={{
          fontWeight: 550,
          textAlign: "center",
          marginBottom: 10,
        }}
        variant="p"
      >
        {label}
      </Typography>
      <div className="flex flex-col gap-3">{data}</div>
    </div>
  );
}
