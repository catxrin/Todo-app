import { Typography } from "@mui/material";

export default function Collon({ data, label, color }) {
  return (
    <div
      className={`overflow-y-auto rounded-lg w-[250px] shadow-md shadow-[#cccccccc] h-[400px] py-2 px-3 flex flex-col ${color}`}
    >
      <Typography
        style={{
          fontWeight: 550,
          textAlign: "center",
          marginBottom: 7,
        }}
        variant="p"
      >
        {label}
      </Typography>
      <hr />
      <div className="flex mt-4 flex-col gap-3">{data}</div>
    </div>
  );
}
