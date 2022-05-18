import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Table from './Components/Table';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  return (
    <div className="App">
      <Home setTasks={setTasks} />
      <Table tasks={tasks} />
    </div>
  );
}

export default App;
