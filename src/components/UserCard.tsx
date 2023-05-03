import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

type UserProps = {
    user: {
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
    },
    addTag: (userTag: string, userId: string) => void
    deleteTag: (userTag: string, userId: string) => void
    enterEditMode: (user: {firstName: string, lastName: string}) => void
}

const UserCard = (props: UserProps) => {

    const { user, addTag, deleteTag, enterEditMode } = props;

    const [tag, setTag] = useState('');

    const handleAddTag = (e: { preventDefault: () => void }, userId: string) => {
        e.preventDefault();
        if(user.userTag && user.userTag.includes(tag)){
            alert('Tag already exist, please enter different tag.');
            setTag('');
        }
        else if (user.userTag.length >= 5) {
            alert('No more than 5 tags per student');
            setTag('');
        } else {
            addTag(tag, userId);
            setTag('');
        }
    };

    return (
        <div className='border-4 m-2 p-4'>
            <div className='flex justify-between items-center w-[370px]'>
                <img src={user.image} alt={user.lastName} className='w-[108px] h-[108px] rounded-full' />
                <div className='flex flex-col items-center'>
                    <h4 className='font-poppins font-semibold text-[20px] leading-[32px]'>
                        {user.firstName} {user.lastName}
                    </h4>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        @{user.username}
                    </p>
                </div>
                <button onClick={() => enterEditMode(user)}>Edit<br /> User</button>
            </div>
            <div className='py-2'>
                <div className='flex items-center'>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        Company:&nbsp;
                    </p>
                    <h4 className='font-poppins font-semibold text-[16px] leading-[32px]'>
                        {user.company.name}
                    </h4>
                </div>
                <div className='flex items-center'>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        Position:&nbsp;
                    </p>
                    <h4 className='font-poppins font-semibold text-[16px] leading-[32px]'>
                        {user.company.title}
                    </h4>
                </div>
                <div className='flex items-center'>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        Email:&nbsp;
                    </p>
                    <h4 className='font-poppins font-semibold text-[16px] leading-[32px]'>
                        {user.email}
                    </h4>
                </div>
                <div className='flex items-center'>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        Phine Number:&nbsp;
                    </p>
                    <h4 className='font-poppins font-semibold text-[16px] leading-[32px]'>
                        {user.phone}
                    </h4>
                </div>
            </div>
            <div className='max-w-[350px] h-[80px] flex flex-wrap'>
                {user.userTag && user.userTag.map((tag: string, index) => (
                    <div key={index} className='flex flex-wrap justify-center items-center h-[20px]'>
                        <p className='p-2'>{tag}</p>
                        <button onClick={() => deleteTag(tag, user.id)}>
                            <TrashIcon width={24} height={24} />
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={(e) => handleAddTag(e, user.id)}>
                    <input 
                        type="text" 
                        value={tag} 
                        onInput={(e) => setTag((e.target as HTMLInputElement).value)} 
                        required
                        className='outline-none bg-slate-300 my-1 rounded mr-4' />
                    <button type='submit'>Add Tag</button>
                </form>
            </div>
        </div>
    )
}

export default UserCard