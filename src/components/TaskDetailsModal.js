// TaskDetailsModal.js
import React from 'react';

const TaskDetailsModal = ({ task, onClose }) => {
  const modalStyle = {
    maxHeight: '30vh', 
    overflowY: 'auto',
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden">
      <div className="bg-white w-2/3 p-6 rounded-md shadow-lg transform transition-all duration-300" style={modalStyle}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{task.data.taskDetails.name}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p className="text-gray-700 mb-4">{task.data.taskDetails.description}</p>
        <div className="flex items-center">
          <span className={`text-sm font-semibold mr-2 ${task.data.taskDetails.isCompleted ? 'text-green-600' : 'text-red-600'}`}>
            {task.data.taskDetails.isCompleted ? 'Completed' : 'Not Completed'}
          </span>
          <button onClick={onClose} className="ml-auto text-blue-600 hover:text-blue-800">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
