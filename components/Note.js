import React, { useState } from 'react';
import axios from 'axios';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

const BACKEND_URL = "https://notes-app-sugam.up.railway.app";

const Note = ({ title, content, id }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/notes/${id}`);
      setIsDeleted(true);
      setDeleteFailed(false);
      console.log(`Note with id ${id} deleted successfully`);
    } catch (error) {
      setDeleteFailed(true);
      console.error(`Error deleting note with id ${id}:`, error);
    }
  };

  return (
    <div className="max-w-[350px] block bg-gray-800 shadow-md rounded-md p-4 hover:bg-gray-700 transition duration-300">
      {isDeleted ? (
        <div className="text-green-500 text-xl font-bold">Note deleted successfully</div>
      ) : (
        <>
          <div className="text-xl font-bold">{title}</div>
          <div className="text-gray-600">{content}</div>
          <Button onClick={handleDelete}>
            <Cross1Icon />
          </Button>
          {deleteFailed && (
            <div className="text-red-500 text-xl font-bold mt-2">
              Note not deleted
              <Button onClick={handleDelete} className="ml-2">
                Retry
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Note;
