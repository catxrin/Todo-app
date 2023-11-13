import { LOADING } from "../constants/messages";
export default function Loading() {
  return (
    <div className="p-5 m-0 h-screen flex justify-center text-center items-center">
      <p className="font-medium text-lg">{LOADING}</p>
    </div>
  );
}
