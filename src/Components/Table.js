import React from 'react';

const Table = ({ tasks }) => {
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
                                    <td>{task?.name}</td>
                                    <td>{task?.desc}</td>
                                    <td>{task?.status}</td>
                                    <td><button className='btn btn-primary'>Complete</button></td>
                                    <td><button className='btn btn-warning'>Delete</button></td>
                                </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;