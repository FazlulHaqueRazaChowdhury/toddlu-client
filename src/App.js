
import './App.css';
import Home from './Components/Home';
import Table from './Components/Table';

import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from './firebase.init';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Components/Loading';

function App() {

  const [user, loading, error] = useAuthState(auth);
  const { data: tasks, isLoading, refetch } = useQuery(['email', user], () => fetch(`http://localhost:4000/tasks?email=${user?.email}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearere ${localStorage.getItem('acccessToken')}`
    }
  })

    .then(res => {
      return res.json()
    }))

  if (loading || isLoading) {
    return <Loading />
  }
  if (error) {
    toast.error('Something wrong with authenticatoin');
  }
  return (
    <div className="App bg-base-200 ">

      <Home user={user} refetch={refetch} />
      {
        user?.email ? <Table tasks={tasks} isLoading={isLoading} loading={loading} refetch={refetch} /> : <h1 className='text-4xl text-center'>Please Sign Up WIth Google</h1>
      }
      <ToastContainer />
    </div>
  );
}

export default App;
