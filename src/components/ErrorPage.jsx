export default function ErrorPage() {
  return (
    <div className="text-center flex justify-center flex-col h-screen items-center">
      <div className="mb-20">
        <p className="font-bold text-[100px] text-gray-800">Oops!</p>
        <p className="text-gray-600 text-[40px] mb-2">
          Looks like there is an error
        </p>
        <p className="text-gray-600 text-[20px] w-[500px]">
          Sorry, it's not you. It's us.
        </p>
      </div>
    </div>
  );
}
