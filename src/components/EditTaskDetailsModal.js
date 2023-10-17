import React, { useState } from 'react';
import { editTask } from '../services/TodoService';
const EditTaskDetailsModal = ({ task, onClose }) => {
  const [editedName, setEditedName] = useState(task.data.taskDetails.name);
  const [editedDescription, setEditedDescription] = useState(task.data.taskDetails.description);
  const handleEdit = () => {
    
editTask(task.data.taskDetails._id,editedName,editedDescription)
      .then((details) => {
        window.location.reload(true);
      })
      .catch((error) => {
        console.log("error fetching task details:", error.message);
      });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden">
      <div className="bg-white w-2/3 p-6 rounded-md shadow-lg transform transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Edit Task</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <label className="block text-sm font-semibold mb-2" htmlFor="editedName">
          Name:
        </label>
        <input
          type="text"
          id="editedName"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue mb-4"
        />
        <label className="block text-sm font-semibold mb-2" htmlFor="editedDescription">
          Description:
        </label>
        <textarea
          id="editedDescription"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue mb-4"
        ></textarea>
        <div className="flex items-center">
          <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-800">
            Save
          </button>
          <button onClick={onClose} className="text-blue-600 hover:text-blue-800">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskDetailsModal;
