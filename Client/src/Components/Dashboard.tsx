import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DashboardTop from '../assets/DashboardTop.png';

interface Card {
    hash?: string;
    Questions?: string;
    Title?: string;
    Description?: string;
    Deadline?: string;
    submissions?: number;
    [key: string]: any;
}

const Dashboard: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/userdata', { // **Correct Endpoint URL**
                headers: {
                  token: token
                }
            });
            setFirstName(response.data.info.firstName);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const fetchCards = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/assignments', { // **Correct Endpoint URL**
                headers: {
                  token: token
                }
            });
            console.log(response.data.info);
            setCards(response.data.info);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            fetchUserData();
            fetchCards();
        }
        else {
            navigate('/');
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return <div>
        <div className='flex m-4 p-4 px-7 h-40 rounded-xl bg-indigo-300 relative overflow-hidden'>
            <div className='flex flex-col gap-3 justify-center z-10 font-poppins max-w-[60%]'>
                <h1 className='text-3xl font-bold'>Welcome, {firstName}</h1>
                <p>GradeGenie - Simplifying assignment submissions and grading for students and educators. <br />Here's an overview of your active assignments.</p>
            </div>
            <img 
                src={DashboardTop} 
                alt="Education supplies" 
                className='absolute right-0 h-full w-auto object-contain'
            />
        </div>
        <h2>Active Assignments</h2>
        {cards.map((card) => {
            return (
                <div key={card._id}>
                    <h3>{card.Title}</h3>
                    <p>{card.Deadline}</p>
                    <p>{card.hash}</p>
                    <p>{card.submissions}</p>
                </div>
            )
        })}
    </div>;
}
export default Dashboard;
