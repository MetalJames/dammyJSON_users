import { useEffect, useState } from "react";
//library imports
import { CheckIcon } from '@heroicons/react/24/solid'

type EditProps = {
    setIsEdited: (user: boolean) => void
    editUser: {
        id: string,
        firstName: string,
        lastName: string,
    },
    updateUser: (user: {id: string, firstName: string, lastName: string}) => void,
    deleteUser: (user: {id: string}) => void
}

const EditUser = (props: EditProps) => {

    const { editUser, setIsEdited, updateUser, deleteUser } = props;

    const [updatedUserFirstName, setUpdatedUserFirstName] = useState(editUser.firstName);
    const [updatedUserLastName, setUpdatedUserLastName] = useState(editUser.lastName);

    const [deleteThisUser, setDeleteThisUser] = useState(false);

    const handleFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        updateUser({
            ...editUser, id:editUser.id, firstName: updatedUserFirstName, lastName: updatedUserLastName,
        });
        setIsEdited(false);
    }

    const handleDeleteUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        deleteUser(editUser);
        setIsEdited(false);
    }

    useEffect(() => {
        const closeModalIfEscaped = (e: { key: string; }) => {e.key === 'Escape' && setIsEdited(false)};
        window.addEventListener('keydown', closeModalIfEscaped);

        return () => {window.removeEventListener('keydown', closeModalIfEscaped)};
    }, [setIsEdited]);

    return (
        <div className='border-4 m-2 p-4'>
            <div role='dialog' aria-labelledby='editUser' 
                    onClick={(e) => {e.target === e.currentTarget && setIsEdited(false)}}>
                <form onSubmit={handleFormSubmit} className="flex">
                    <input type="text"
                        value={updatedUserFirstName} onInput={(e : React.ChangeEvent<HTMLInputElement>) => setUpdatedUserFirstName(e.target.value)} 
                        required
                        maxLength={60}
                        placeholder='Update User First Name'
                        className="border-2 m-1"
                    />
                    <input type="text"
                        value={updatedUserLastName} onInput={(e : React.ChangeEvent<HTMLInputElement>) => setUpdatedUserLastName(e.target.value)} 
                        required
                        maxLength={60}
                        placeholder='Update User Last Name'
                        className="border-2 m-1"
                    />
                    <div className="flex items-center">
                        <button type='submit' className="item-center bg-green-600 hover:bg-green-900 px-4 rounded transition-all mx-2">
                            <CheckIcon className="h-6 w-6 text-white"/>
                        </button>
                        <button type='reset' onClick={() => setIsEdited(false)} className="item-center bg-red-600 hover:bg-red-900 text-white px-4 rounded transition-all mx-2">
                            Cancel
                        </button>
                    </div>
                </form>
                <button type='submit' onClick={() => setDeleteThisUser(true)} className="item-center bg-red-600 hover:bg-red-900 text-white px-4 rounded transition-all mx-1 mt-2">
                    Delete User
                </button>
                {deleteThisUser === true && 
                    <div>
                        <p className="m-1">Are you sure you want to delete this user?</p>
                        <div className="ml-1">
                            <button 
                                type='submit' 
                                onClick={handleDeleteUser} 
                                className="bg-green-600 hover:bg-green-900 text-white font-bold mr-2 px-4 rounded transition-all"
                                >Yes</button>
                            <button 
                                type='reset' 
                                onClick={() => setDeleteThisUser(false)}
                                className="bg-red-600 hover:bg-red-900 text-white font-bold px-4 rounded transition-all"
                                >No</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditUser