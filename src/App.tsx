import { useEffect, useState } from 'react';
import { fetchFromAPI, BASE_URL } from './fetchData';

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
    </div>
  )
}

export default App
