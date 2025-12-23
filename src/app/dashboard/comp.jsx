import React, { useState } from 'react';

export const AdminDash = () => {
    const [ board, setBoard ] = useState('profile')
    

    return (
        <div>
            Admin Dashboard
        </div>
    );
};



export const UserDashboard = () => {

    return (
        <div>
            User dashboard
        </div>
    )
}
