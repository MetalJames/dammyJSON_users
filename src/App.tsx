import { useEffect, useMemo, useState, useDeferredValue } from 'react';
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
import SearchBar from './components/SearchBar';
import EditUser from './components/EditUser';

type UserProps = {
  id: string,
  image: string,
  firstName: string,
  lastName: string,
  company: {
      name: string,
      title: string,
  },
  email: string,
  phone: string,
  username: string,
  userTag: string[]
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any>([]);

  //search
  const [searchByName, setSearchByName] = useState('');
  const deferredValueName = useDeferredValue(searchByName);
  const [searchByTag, setSearchByTag] = useState('');
  const deferredValueTag = useDeferredValue(searchByTag);

  //edit user const
  const [editUser, setIsEditUser] = useState<{id: string, firstName: string, lastName: string}>({id: '', firstName: '', lastName: ''});
  const [isEdited, setIsEdited] = useState(false);

  const searchedUsers = useMemo(() => {
    return users.filter((user: {firstName: string, lastName: string, userTag: string}) => {
      const fullName = user.firstName + ' ' + user.lastName;
      return (
        fullName.toLowerCase().includes(deferredValueName.toLowerCase())
        &&
        user.userTag.toString().toLowerCase().includes(deferredValueTag.toLowerCase())
      )
    })
  }, [users, deferredValueName, deferredValueTag]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(6)

  const numOfPages = Math.ceil(searchedUsers.length / usersPerPage);
  const pages = [...Array(numOfPages + 1).keys()].slice(1);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const visibleUsers = searchedUsers.slice(indexOfFirstUser, indexOfLastUser);

  //functions

  const addTag = (tag: string, userId: string) => {
    setUsers((prevState: {id: string, userTag: string[]}[] ) => {
      const updatedUser = prevState.map((user: {id: string, userTag : string[]}) => {
        if (user.id === userId) {
          const userTag = [...(user.userTag || []), tag];
          return {...user, userTag};
        } else {
          return user;
        }
      });
      return updatedUser
    });
  };

  const deleteTag = (tag: string, userId: string) => {
    setUsers((prevState: { id: string; userTag: string; }[] ) => {
      const updatedUser = prevState.map((user: {id: string, userTag : string}) => {
        if (user.id === userId) {
          const userTag = [...(user.userTag || [])].filter(t => t !== tag);
          return {...user, userTag};
        } else {
          return user;
        }
      });
      return updatedUser
    });
  };

  const updateUser = (user: {id: string, firstName: string, lastName: string}) => {
    setUsers((prevState: { id: string; firstName: string; lastName: string; }[]) => 
      prevState.map((oldUser: {id: string, firstName: string, lastName: string}) => oldUser.id === user.id ? { ...oldUser, firstName: user.firstName, lastName: user.lastName } : oldUser));
  }

  const enterEditMode = (user: {id: string, firstName: string, lastName: string}) => {
    setIsEditUser(user)
    setIsEdited(true);
  }

  const deleteUser = (user: {id: string}) => {
    setUsers((prevState: []) => prevState.filter((prevUser: {id: string}) => prevUser !== user));
    setIsEdited(false);
  }

  //handle pages
  const handlePrevPage = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if(currentPage !== numOfPages) setCurrentPage(currentPage + 1)
  }

  //handle search
  const handleSearchName = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchByName(e.currentTarget.value);
    setCurrentPage(1);
  };

  const handleSearchTag = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchByTag(e.currentTarget.value);
    setCurrentPage(1);
  };

  //handle sort
  const handleSort = (value: string) => {
    if (value === 'Sort Original') {
      setUsers(searchedUsers.sort((a: {id: number}, b: {id: number}) => a.id - b.id));
    }
    else if (value === 'Sort A-Z') {
      setUsers(searchedUsers.sort((a: {firstName: string}, b: {firstName: string}) => a.firstName.localeCompare(b.firstName)));
    }
    else if (value === 'Sort Z-A') {
      setUsers(searchedUsers.sort((a: {firstName: string}, b: {firstName: string}) => b.firstName.localeCompare(a.firstName)));
    }
  }

  //handle display users per page
  const handleDisplayPerPage = (value: string) => {
    if (Number(value) === 6) {
      setUsersPerPage(6);
      setCurrentPage(1);
    }
    else if (Number(value) === 12) {
      setUsersPerPage(12);
      setCurrentPage(1);
    }
    else if (Number(value) === 24) {
      setUsersPerPage(24);
      setCurrentPage(1);
    }
  }

  console.log(searchedUsers)

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await fetchFromAPI(BASE_URL);
      setUsers(usersData);
    };
    setTimeout(fetchUsersData, 500);
  }, []);

  //styles
  const style = {
    navbar: `flex justify-between items-center p-4`,
    doubleleftChevron: `${
      pages.length < 5 ? 'text-transparent pointer-events-none' : currentPage === 1 && 'text-transparent pointer-events-none'
    } cursor-pointer`,
    leftChevron: `${
      currentPage === 1 && 'text-transparent pointer-events-none'
    } cursor-pointer`,
    rightChevron: `${
      numOfPages < 1 ? 'text-transparent pointer-events-none' : currentPage === numOfPages && 'text-transparent pointer-events-none'
    } cursor-pointer`,
    doublerightChevron: `${
      pages.length < 5 ? 'text-transparent pointer-events-none' : currentPage === numOfPages && 'text-transparent pointer-events-none'
    } cursor-pointer`,
  };

  if (!users.length) return <h1>Loading...</h1>;
  return (
    <div>
      <div className={style.navbar}>
        <div>
          <SearchBar placeholder='Search by Name' value={searchByName} propFunction={handleSearchName} />
          <SearchBar placeholder='Search by Tag' value={searchByTag} propFunction={handleSearchTag} />
        </div>
        <div className='flex flex-col'>
          <select onChange={(e) => handleSort(e.currentTarget.value)} className='outline-none bg-slate-300 my-1 rounded'>
            <option value="Sort Original">Sort Original</option>
            <option value="Sort A-Z">Sort A-Z</option>
            <option value="Sort Z-A">Sort Z-A</option>
          </select>
          <select onChange={(e) => handleDisplayPerPage(e.currentTarget.value)} className='outline-none bg-slate-300 my-1 rounded'>
            <option value={6}>Display 6</option>
            <option value={12}>Display 12</option>
            <option value={24}>Display 24</option>
          </select>
        </div>
      </div>
      {isEdited && <EditUser editUser={editUser} updateUser={updateUser} setIsEdited={setIsEdited} deleteUser={deleteUser} />}
      <div className="flex flex-wrap w-full justify-center items-center">
        {visibleUsers.map((user: UserProps, id: number) => (
          <UserCard key={id} user={user} addTag={addTag} deleteTag={deleteTag} enterEditMode={enterEditMode} />
        ))}
      </div>
      <div className="flex justify-center w-full">
        <Button propFunction={() => setCurrentPage(1)} value={style.doubleleftChevron} propsButton={<ChevronDoubleLeftIcon strokeWidth={2} width={24} height={24} />} />
        <Button propFunction={handlePrevPage} value={style.leftChevron} propsButton={<ChevronLeftIcon strokeWidth={2} width={24} height={24} />}/>
        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <Button propFunction={handleNextPage} value={style.rightChevron} propsButton={<ChevronRightIcon strokeWidth={2} width={24} height={24} />} />
        <Button propFunction={()=> setCurrentPage(numOfPages)} value={style.doublerightChevron} propsButton={<ChevronDoubleRightIcon strokeWidth={2} width={24} height={24} />} />
      </div>
    </div>
  );
}

export default App
