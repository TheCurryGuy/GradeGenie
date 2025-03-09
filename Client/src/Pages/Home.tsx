import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import GeneratorModal from '../Components/GeneratorModal';

export default function Home(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
        alert("You need to login in order to access");
        navigate('/signin');
        }
    }, [token, navigate]);
    return <div>
        Hi there
    </div>
}