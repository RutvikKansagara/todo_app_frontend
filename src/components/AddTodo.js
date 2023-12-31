import React, { Fragment, useState } from "react";
import { addTask } from "../services/TodoService";

const AddTodo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    setName("");
    setDescription("");
    addTask(name, description)
      .then((addedTask) => {
        window.location.reload(true);
      })
      .catch((error) => {
        console.log("error adding task: " + error.message);
      });
  };

  return (
    <>
     <div className="flex flex-col items-center py-5">
  <h1 className="text-5xl font-bold mb-8">Todo App</h1>

  <form id="taskForm" className="flex flex-col items-center">
    <div className="mb-4">
      <input
        onChange={handleNameChange}
        type="text"
        id="task"
        name="name"
        value={name}
        className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:shadow-outline-blue"
        placeholder="Task name..."
      />
    </div>

    <div className="mb-4">
      <input
        onChange={handleDescriptionChange}
        type="text"
        id="description"
        name="description"
        value={description}
        className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:shadow-outline-blue"
        placeholder="Task description..."
      />
    </div>

    <button
      type="button"
      onClick={handleSubmit}
      className="p-3 px-6 bg-violet-500 text-white hover:bg-violet-700 rounded-full"
    >
      Add Todo Task
    </button>
  </form>
</div>

    </>
  );
};

export default AddTodo;
