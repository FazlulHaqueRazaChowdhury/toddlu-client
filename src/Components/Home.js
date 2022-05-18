import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
const Home = ({ setTasks }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {

    };

    return (
        <div>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Toddlu</h1>
                        <p class="py-6">Hey I'm Toddlu ! Add your task right now and make your life more easy,</p>
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
                                    <button class="btn btn-primary" type='submit'>Add Task</button>
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