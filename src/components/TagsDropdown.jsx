export default function TagsDropdown({ task, setUserData }) {
  function changeTaskStatus(newStatus) {
    setUserData((prev) => {
      prev.tasks.find((el) => el.id === task.id).status = newStatus;
      return { ...prev };
    });
  }

  return (
    <div className="flex flex-row flex-wrap relative p-1 mt-2 gap-2.5 border-t-2 border-gray-200 pt-2">
      <p
        onClick={() => changeTaskStatus("Todo")}
        className="tag-primary bg-[#D3E5EF]"
      >
        Todo
      </p>
      <p
        onClick={() => changeTaskStatus("In Progress")}
        className="tag-primary bg-[#E8DEEE]"
      >
        Progress
      </p>
      <p
        onClick={() => changeTaskStatus("Done")}
        className="tag-primary bg-[#DBEDDB]"
      >
        Done
      </p>
    </div>
  );
}
