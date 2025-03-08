import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
        alert("You need to login in order to access");
        navigate('/signin');
        }
    }, [token, navigate]);
    return <div>
        Hii Guyzzzzzz
    </div>
}