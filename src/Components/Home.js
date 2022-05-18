import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Header from './Header';
const Home = ({ setTasks, user, refetch }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

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
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Task Added')
                    refetch();
                }
                else {
                    toast.error('Something went wrong')
                }

            })
    };


    return (
        <div>
            <div class="hero min-h-screen bg-base-200">

                <div class="hero-content flex-col lg:flex-row-reverse">

                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Toddlu</h1>
                        <p class="py-6">Hey {user?.email ? user.displayName : 'there'},I'm Toddlu ! Add your task right now and make your life more easy,</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" class="input input-bordered" {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Please give your task a name!'
                                        }
                                    })} />
                                    <p className='text-warning'>{errors?.name?.type === 'required' ? errors?.name?.message : ''}</p>
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Description</span>
                                    </label>
                                    <input type="text" placeholder="Description" class="input input-bordered" {...register("desc", {
                                        required: {
                                            value: true,
                                            message: 'Please right something!'
                                        }
                                    })} />
                                    <p className='text-warning'>{errors?.desc?.type === 'required' ? errors?.desc?.message : ''}</p>
                                </div>
                                <div class="form-control mt-6">
                                    {
                                        user?.email ? <button class="btn btn-primary" type='submit'>Add Task</button> : <Header />

                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;