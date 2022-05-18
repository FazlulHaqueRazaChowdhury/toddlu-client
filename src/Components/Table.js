import { signOut } from 'firebase/auth';
import React from 'react';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Loading from './Loading';

const Table = ({ tasks, isLoading, loading, user, refetch }) => {

    const handleDelete = (id) => {
        fetch(`http://localhost:4000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
                ,
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 404 || res.status === 401) {
                    return signOut(auth);
                }
                return res.json()
            })
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
                ,
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
            ,
            body: JSON.stringify(update)
        })
            .then(res => {
                if (res.status === 403 || res.status === 404 || res.status === 401) {
                    return signOut(auth);
                }
                return res.json()
            })
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
    if (loading || isLoading) {
        return <Loading />;
    }

    return (
        <div className='container mx-auto min-h-screen'>
            <div className="overflow-x-auto my-[100px]">
                <h1 className='text-5xl font-bold my-[20px] text-center'>Your today's list.</h1>
                <table className="table w-full">

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
                                <tr key={task._id}>
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