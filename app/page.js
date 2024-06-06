"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Ensure correct import from 'next/navigation'
import axios from 'axios';
import Layout from '../components/Layout';
import Note from '../components/Note';
import { Button } from '@radix-ui/themes';

const BACKEND_URL = "https://notes-app-sugam.up.railway.app";

const Home = () => {
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/notes?page=${page}`);
        setNotes(response.data.notes);
        setTotalPages(response.data.pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddClick = () => {
    router.push('/add');
  };

  return (
    <Layout>
      <Button
        className='border-2 m-4 ml-0 px-4 border-white rounded-md'
        onClick={handleAddClick}
      >
        Add
      </Button>
      {loading ? (
        <div className='text-center mt-10'>
          Loading...
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notes.map(note => (
              <Note key={note._id} title={note.title} content={note.content} id={note._id} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-1 border ${page === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
