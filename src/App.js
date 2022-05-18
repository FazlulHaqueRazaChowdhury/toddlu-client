import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Table from './Components/Table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from './firebase.init';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Components/Loading';
function App() {

  const [user, loading, error] = useAuthState(auth);
  const { data: tasks, isLoading, refetch } = useQuery('tasks', () => fetch(`http://localhost:4000/tasks?email=${user?.email}`).then(res => res.json()))
  if (loading || isLoading) {
    return <p><Loading /></p>
  }
  return (
    <div className="App bg-base-200">

      <Home user={user} refetch={refetch} />
      {
        user ? <Table user={user} tasks={tasks} isLoading={isLoading} loading={loading} refetch={refetch} /> : <h1 className='text-4xl text-center'>Please Sign Up WIth Google</h1>
      }
      <ToastContainer />
    </div>
  );
}

export default App;
