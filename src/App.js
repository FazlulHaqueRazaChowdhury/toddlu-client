import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Table from './Components/Table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from './firebase.init';
function App() {

  const [user, loading, error] = useAuthState(auth);
  const { data: tasks, isLoading, refetch } = useQuery('tasks', () => fetch(`http://localhost:4000/tasks?email=${user.email}`).then(res => res.json()))
  if (loading || isLoading) {
    return <p>Loading</p>
  }
  return (
    <div className="App">
      <Home />
      <Table tasks={tasks} />
    </div>
  );
}

export default App;
