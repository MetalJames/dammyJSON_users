import { useEffect, useState } from 'react';
import { fetchFromAPI, BASE_URL } from './fetchData';
import UserCard from './components/UserCard';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Pagination from './components/Pagination';
import Button from './components/Button';

function App() {
  const [users, setUsers] = useState([]);
  console.log(users);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  const numOfPages = Math.ceil(users.length / 6);
  const pages = [...Array(numOfPages + 1).keys()].slice(1);
  console.log(pages)

  const indexOfLastUser = currentPage * 6;
  const indexOfFirstUser = indexOfLastUser - 6;

  const visibleUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePrevPage = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if(currentPage !== numOfPages) setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await fetchFromAPI(BASE_URL);
      setUsers(usersData);
    };
    setTimeout(fetchUsersData, 500);
  }, []);

  const style = {
    leftChevron: `${
      currentPage === 1 && "text-transparent cursor-default"
    } cursor-pointer`,
    rightChevron: `${
      currentPage === numOfPages ? "text-transparent cursor-default" : ""
    } cursor-pointer`,
  };

  if (!users.length) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>New Project</h1>
      <div className="flex flex-wrap w-full justify-center items-center">
        {visibleUsers.map((user, id) => (
          <UserCard key={id} user={user} />
        ))}
      </div>
      <div className="flex justify-center w-full">
        <Button propFunction={() => setCurrentPage(1)} value={style.leftChevron} propsButton={<ChevronDoubleLeftIcon strokeWidth={2} width={24} height={24} />} />
        <Button propFunction={handlePrevPage} value={style.leftChevron} propsButton={<ChevronLeftIcon strokeWidth={2} width={24} height={24} />}/>
        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <Button propFunction={handleNextPage} value={style.rightChevron} propsButton={<ChevronRightIcon strokeWidth={2} width={24} height={24} />} />
        <Button propFunction={()=> setCurrentPage(numOfPages)} value={style.rightChevron} propsButton={<ChevronDoubleRightIcon strokeWidth={2} width={24} height={24} />} />
      </div>
    </div>
  );
}

export default App
