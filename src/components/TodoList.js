import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  deleteTask,
  completeTask,
  getTaskDetails,
  deleteAllTasks,
} from "../services/TodoService";
import editIcon from "../edit-round-icon.svg";
import deleteIcon from "../recycle-bin-line-icon.svg";
import completeIcon from "../green-checkmark-line-icon.svg";
import viewIcon from "../eye-look-icon.svg";
import TaskDetailsModal from "./TaskDetailsModal";
import EditTaskDetailsModal from "./EditTaskDetailsModal";

const TodoList = () => {
  const [data, setData] = useState({ status: "", message: "", allTasks: [] });
  const [selectedTask, setSelectedTask] = useState(null);
  const [EditSelectedTask, setEditSelectedTask] = useState(null);

  const handleEdit = (id) => {
    getTaskDetails(id)
      .then((details) => {
        setEditSelectedTask(details);
      })
      .catch((error) => {
        console.log("error fetching task details:", error.message);
      });
  };

  const handleDelete = (id) => {
    deleteTask(id)
      .then((deletedTask) => {
        window.location.reload(true);
      })
      .catch((error) => {
        console.log("error deleting task: " + error.message);
      });
  };

  const handleComplete = (id) => {
    completeTask(id)
      .then((completedTask) => {
        setData((prevData) => {
          const updatedTasks = prevData.allTasks.map((task) => {
            if (task._id === id) {
              return { ...task, isCompleted: true };
            }
            return task;
          });
          return { ...prevData, allTasks: updatedTasks };
        });
      })
      .catch((error) => {
        console.log("error completing task: " + error.message);
      });
  };

  const handleView = (id) => {
    getTaskDetails(id)
      .then((details) => {
        setSelectedTask(details);
      })
      .catch((error) => {
        console.log("error fetching task details:", error.message);
      });
  };
  const handledeleteAllTasks = () => {
    deleteAllTasks()
      .then(() => {
        window.location.reload(true);
        setData({ status: "", message: "", allTasks: [] })
      })
      .catch((error) => {
        console.log("error deleting task: " + error.message);
      });
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };
  const handleEditCloseModal = () => {
    setEditSelectedTask(null);
  };
  useEffect(() => {
    const fetchData = () => {
      getAllTasks()
        .then((tasks) => {
          setData(tasks);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {}, [data]);

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-md p-6 mt-10 overflow-y-auto max-h-96">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {data && data.allTasks && data.allTasks.length > 0 && (
        <button onClick={() => handledeleteAllTasks()} className="text-red-600">
          delete all tasks
        </button>
      )}

      <ul>
        {data && data.allTasks && data.allTasks.map((task) => (
          <li key={task._id} className="mb-4">
            <div className="bg-gray-100 p-4 rounded-md relative">
              <h2 className="text-lg font-semibold mb-2">{task.name}</h2>
              <p className="text-gray-700">
                {task.description.substring(0, 20)}...
              </p>

              <div className="absolute top-0 right-0 mt-2 mr-2 flex">
                <button
                  onClick={() => handleView(task._id)}
                  className="mr-3 text-red-600"
                >
                  <img src={viewIcon} alt="view" />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="mr-3 text-red-600"
                >
                  <img src={deleteIcon} alt="delete" />
                </button>
                <button
                  onClick={() => handleEdit(task._id)}
                  className="mr-3 text-blue-600"
                >
                  <img src={editIcon} alt="edit" />
                </button>
                {task.isCompleted && (
                  <span className="text-green-600 bg-green-200 px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
                {task.isCompleted === false && (
                  <button
                    onClick={() => handleComplete(task._id)}
                    className="text-green-600"
                  >
                    <img src={completeIcon} alt="completed" />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={handleCloseModal} />
      )}

      {EditSelectedTask && (
        <EditTaskDetailsModal
          task={EditSelectedTask}
          onClose={handleEditCloseModal}
        />
      )}
    </div>
  );
};

export default TodoList;
