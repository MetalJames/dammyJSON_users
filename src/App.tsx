import { useEffect, useState } from 'react';
import { fetchFromAPI, BASE_URL } from './fetchData';
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await fetchFromAPI(BASE_URL);
      setUsers(usersData);
    };
    fetchUsersData();
  }, []);

  return (
    <div>
      <h1>New Project</h1>
      <div className='flex flex-wrap w-full justify-center items-center'>
        {users.map((user, id) => (
            <UserCard key={id} user={user}/>
            ))
          }
      </div>
    </div>
  )
}

export default App
