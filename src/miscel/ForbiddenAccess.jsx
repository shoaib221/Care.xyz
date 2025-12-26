import React from 'react';

export const ForbiddenAccess = () => {
    return (
        <div className='gap-2 flex-1 flex flex-col justify-center items-center' >
            <div className='text-3xl text-(--color5) font-bold' >Forbidden Access</div>
            <button className='bg-(--color4) text-white p-2 rounded-lg'
                onClick={() => router.push('/')}
            > Got To Home </button>
        </div>
    );
};

