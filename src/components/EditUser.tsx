import { useEffect, useState } from "react";
//library inports
import { CheckIcon } from '@heroicons/react/24/solid'

type EditProps = {
    setIsEdited: (user: boolean) => void
    editUser: {
        firstName: string,
        lastName: string,
    },
    updateUser: (user: {id: string, firstName: string, lastName: string}) => void,
}

const EditUser = (props: EditProps) => {

    const { editUser, setIsEdited, updateUser } = props;

    const [updatedUserFirstName, setUpdatedUserFirstName] = useState(editUser.firstName);
    const [updatedUserLastName, setUpdatedUserLastName] = useState(editUser.lastName);

    const handleFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        updateUser({
            ...editUser, firstName: updatedUserFirstName, lastName: updatedUserLastName,
            id: ""
        });
        setIsEdited(false);
    }

    useEffect(() => {
        const closeModalIfEscaped = (e: { key: string; }) => {e.key === 'Escape' && setIsEdited(false)};
        window.addEventListener('keydown', closeModalIfEscaped);

        return () => {window.removeEventListener('keydown', closeModalIfEscaped)};
    }, [setIsEdited]);

    return (
        <div className='border-4 m-2 p-4'>
            <div role='dialog' aria-labelledby='editTask' 
                    onClick={(e) => {e.target === e.currentTarget && setIsEdited(false)}}>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" id='editTask' className='input' 
                        value={updatedUserFirstName} onInput={(e : React.ChangeEvent<HTMLInputElement>) => setUpdatedUserFirstName(e.target.value)} 
                        // can be don in two ways first one above and second one below
                        // value={task} onInput={(e) => setTask((e.target as HTMLInputElement).value)} 
                        required
                        // autoFocus
                        maxLength={60}
                        placeholder='Update User'
                    />
                    <input type="text" id='editTask' className='input' 
                        value={updatedUserLastName} onInput={(e : React.ChangeEvent<HTMLInputElement>) => setUpdatedUserLastName(e.target.value)} 
                        // can be don in two ways first one above and second one below
                        // value={task} onInput={(e) => setTask((e.target as HTMLInputElement).value)} 
                        required
                        // autoFocus
                        maxLength={60}
                        placeholder='Update User'
                    />
                    <button type='submit'>
                        <CheckIcon className="h-6 w-6 text-blue-500"/>
                    </button>
                    <button type='reset' onClick={() =>setIsEdited(false)}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditUser