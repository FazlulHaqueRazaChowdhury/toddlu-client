import React from 'react';
import { toast } from 'react-toastify';

const Table = ({ tasks, isLoading, loading, user, refetch }) => {
    if (loading || isLoading) {
        return <p>Loading</p>
    }
    const handleDelete = (id) => {
        fetch(`http://localhost:4000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.error('Task Deleted');
                    refetch();
                }
                else {
                    toast.warn('Something went wrong')
                }

            });
    }
    const handleComplete = (id) => {
        const update = {
            status: 'Complete'
        }
        fetch(`http://localhost:4000/tasks/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            }
            ,
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount) {
                    toast.success('You have completed the task. Congrats!')
                    refetch();
                }
                else {
                    toast.danger('Something went wrong!')
                }

            });
    }
    return (
        <div className='container mx-auto'>
            <div class="overflow-x-auto my-[100px]">
                <h1 className='text-5xl font-bold my-[20px] text-center'>Your today's list.</h1>
                <table class="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>STATUS</th>
                            <th>Done</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map((task, index) =>
                                <tr >
                                    <th>{index + 1}</th>
                                    <td className={`${task?.status === 'Complete' ? 'line-through' : ''}`}>{task?.name}</td>
                                    <td className={`${task?.status === 'Complete' ? 'line-through' : ''}`}>{task?.desc}</td>
                                    <td className={`${task?.status === 'Complete' ? 'text-success' : ''}`}>{task?.status === 'Complete' ? 'Completed' : 'Pending'}</td>
                                    <td><button className='btn btn-primary' disabled={task?.status === 'Complete' ? true : false} onClick={() => {
                                        handleComplete(task._id);
                                    }} >Complete</button></td>
                                    <td><button className='btn btn-warning' onClick={() => {
                                        handleDelete(task._id);
                                    }}>Delete</button></td>
                                </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;