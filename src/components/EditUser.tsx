import { useEffect, useState } from "react";
//library inports
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
                <form onSubmit={handleFormSubmit}>
                    <input type="text"
                        value={updatedUserFirstName} onInput={(e : React.ChangeEvent<HTMLInputElement>) => setUpdatedUserFirstName(e.target.value)} 
                        required
                        maxLength={60}
                        placeholder='Update User First Name'
                    />
                    <input type="text"
                        value={updatedUserLastName} onInput={(e : React.ChangeEvent<HTMLInputElement>) => setUpdatedUserLastName(e.target.value)} 
                        required
                        maxLength={60}
                        placeholder='Update User Last Name'
                    />
                    <button type='submit'>
                        <CheckIcon className="h-6 w-6 text-blue-500"/>
                    </button>
                    <button type='reset' onClick={() => setIsEdited(false)}>
                        Cancel
                    </button>
                </form>
                <button type='submit' onClick={() => setDeleteThisUser(true)}>
                    Delete User
                </button>
                {deleteThisUser === true && 
                    <div>
                        <p>Are you sure you want to delete this user?</p>
                        <button type='submit' onClick={handleDeleteUser}>Yes</button>
                        <button type='reset' onClick={() => setDeleteThisUser(false)}>No</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditUser