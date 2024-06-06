"use client"

import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import * as Form from '@radix-ui/react-form';

const BACKEND_URL = "https://notes-app-sugam.up.railway.app";

export default function Add() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_URL}/notes`, { title, content });
            setTitle('');
            setContent('');
            setSuccessMessage('Note added successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding note:', error);
            const serverErrorMessage = error.response?.data?.message || 'Error adding note. Please try again.';
            setErrorMessage(serverErrorMessage);
            setSuccessMessage('');
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center h-full">
                <Form.Root className="w-[260px]" onSubmit={handleSubmit}>
                    <Form.Field className="grid mb-[10px]" name="title">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Title</Form.Label>
                        </div>
                        <Form.Control asChild>
                            <input
                                className="box-border w-full bg-gray-800 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 border-white"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                                required
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="content">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                                Content
                            </Form.Label>
                        </div>
                        <Form.Control asChild>
                            <textarea
                                className="box-border w-full bg-gray-800 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none border-white"
                                value={content} 
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                        <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                            Post question
                        </button>
                    </Form.Submit>
                    {successMessage && (
                        <p className="mt-[10px] text-green-500">{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className="mt-[10px] text-red-500">{errorMessage}</p>
                    )}
                </Form.Root>
            </div>
        </Layout>
    );
};
