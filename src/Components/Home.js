import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Header from './Header';
const Home = ({ setTasks, user, refetch }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = data => {
        const task = {
            status: `Pending`,
            email: `${user?.email}`,
            name: `${data.name}`,
            desc: `${data.desc}`,
        };
        fetch(`http://localhost:4000/tasks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(task)
        })
            .then(res => {
                if (res.status === 403 || res.status === 404 || res.status === 401) {
                    return signOut(auth);
                }
                return res.json()
            })
            .then(data => {
                if (data.insertedId) {
                    toast.success('Task Added')
                    refetch();
                    reset();
                }
                else {
                    toast.error('Something went wrong')
                }

            })
    };


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">

                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Toddlu</h1>
                        <p className="py-6">Hey {user?.email ? user.displayName : 'there'},I'm Toddlu ! Add your task right now and make your life more easy,</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" className="input input-bordered" {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Please give your task a name!'
                                        }
                                    })} />
                                    <p className='text-warning'>{errors?.name?.type === 'required' ? errors?.name?.message : ''}</p>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input type="text" placeholder="Description" className="input input-bordered" {...register("desc", {
                                        required: {
                                            value: true,
                                            message: 'Please right something!'
                                        }
                                    })} />
                                    <p className='text-warning'>{errors?.desc?.type === 'required' ? errors?.desc?.message : ''}</p>
                                </div>
                                <div className="form-control mt-6">
                                    {
                                        user?.email && <button className="btn btn-primary" type='submit'>Add Task</button>
                                    }
                                </div>
                            </form>
                            {
                                user?.email ? <>
                                    <button onClick={() => {
                                        signOut(auth);
                                        refetch();
                                        localStorage.removeItem('accessToken');
                                    }} className='btn btn-xs my-2'>Sign Out</button></> : <Header />

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;