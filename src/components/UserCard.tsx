type UserProps = {
    user: {
        image: string,
        firstName: string,
        lastName: string,
        company: {
            name: string,
            title: string,
        },
        username: string
    }
}

const UserCard = (props: UserProps) => {

    const { user } = props;

    return (
        <div className='border-4 m-2 p-4'>
            <div className='flex flex-col justify-center items-center w-[370px]'>
                <img src={user.image} alt={user.lastName} className='w-[108px] h-[108px] rounded-full' />
                <div className='flex flex-col items-center'>
                    <h4 className='font-poppins font-semibold text-[20px] leading-[32px]'>
                        {user.firstName} {user.lastName}
                    </h4>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        @{user.username}
                    </p>
                </div>
            </div>
            <div>
                <div className='flex flex-col'>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        Company:
                    </p>
                    <h4 className='font-poppins font-semibold text-[16px] leading-[32px]'>
                        {user.company.name}
                    </h4>
                </div>
                <div className='flex flex-col'>
                    <p className='font-poppins font-normal text-[16px] leading-[24px]'>
                        Position:
                    </p>
                    <h4 className='font-poppins font-semibold text-[16px] leading-[32px]'>
                        {user.company.title}
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default UserCard