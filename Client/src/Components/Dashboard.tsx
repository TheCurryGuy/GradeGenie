import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DashboardTop from '../assets/DashboardTop.png';
// @ts-ignore
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// @ts-ignore
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GeneratorModal from './GeneratorModal';
import { StateContext } from '../Context API/StateContext';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

interface Card {
    hash?: string;
    Questions?: string;
    Title?: string;
    Description?: string;
    Deadline?: string;
    submissions?: number;
    [key: string]: any;
}

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource?: any;
}

const Dashboard: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>('');
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [submissions, setSubmissions] = useState<number>(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setModal } = useContext(StateContext);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/userdata', {
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
            const response = await axios.get('http://localhost:3000/api/v1/assignments', {
                headers: {
                    token: token
                }
            });
            setCards(response.data.info);
            setSubmissions(response.data.submissions);
            setLoading(false);
            
            // Transform assignments to calendar events
            const calendarEvents = response.data.info.map((card: Card) => {
                if (!card.Deadline) return null;
                
                const deadlineDate = new Date(card.Deadline);
                return {
                    id: card._id || card.hash,
                    title: card.Title || 'Untitled Assignment',
                    start: deadlineDate,
                    end: new Date(deadlineDate.getTime() + 60 * 60 * 1000), // End time is 1 hour after deadline
                    resource: card
                };
            }).filter(Boolean);
            
            setEvents(calendarEvents);
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

    const getTimeRemaining = (deadline: string | undefined): string => {
        if (!deadline) return "No deadline";
        const now = new Date();
        const due = new Date(deadline);
        const diff = due.getTime() - now.getTime();
        
        if (diff <= 0) return "Overdue";
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${hours} hour${hours > 1 ? 's' : ''} left`;
    };

    const getStatusColor = (deadline: string | undefined): string => {
        if (!deadline) return "bg-gray-100 text-gray-800";
        const now = new Date();
        const due = new Date(deadline);
        const diff = due.getTime() - now.getTime();
        
        if (diff <= 0) return "bg-red-100 text-red-800";
        if (diff < 1000 * 60 * 60 * 24 * 2) return "bg-yellow-100 text-yellow-800";
        return "bg-green-100 text-green-800";
    };

    // Calendar event styling
    const eventStyleGetter = (event: CalendarEvent) => {
        const resource = event.resource as Card;
        const deadline = resource?.Deadline;
        const now = new Date();
        const due = deadline ? new Date(deadline) : null;
        const isOverdue = due ? now.getTime() > due.getTime() : false;
        const isUpcoming = due ? due.getTime() - now.getTime() < 1000 * 60 * 60 * 24 * 2 : false;
        
        let backgroundColor = '#4f46e5'; // default indigo
        if (isOverdue) {
            backgroundColor = '#ef4444'; // red
        } else if (isUpcoming) {
            backgroundColor = '#f59e0b'; // amber
        }
        
        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    // Handle calendar event selection
    const handleSelectEvent = (event: CalendarEvent) => {
        const resource = event.resource as Card;
        if (resource?.hash) {
            navigate(`/assignment/${resource.hash}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-indigo-500 font-medium">Loading your assignments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 m-4 p-6 rounded-xl shadow-lg relative overflow-hidden animate-fadeIn">
                <div className="flex flex-col gap-3 justify-center z-10 font-poppins max-w-[60%] text-white">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome, {firstName}
                        <span className="inline-block animate-wave ml-2">👋</span>
                    </h1>
                    <p className="text-indigo-100">
                        GradeGenie - Simplifying assignment submissions and grading for students and educators.
                        <br />Here's an overview of your active assignments.
                    </p>
                    <div className="flex gap-2 mt-2">
                        <button 
                            className="bg-white text-indigo-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all" 
                            onClick={() => setModal(true)}
                        >
                            Create a New Assignment
                        </button>
                    </div>
                </div>
                <img
                    src={DashboardTop}
                    alt="Education supplies"
                    className="absolute right-0 h-full w-auto object-contain animate-float"
                />
            </div>

            <div className="mx-4 flex flex-col lg:flex-row gap-4">
                {/* Assignments Section */}
                <div className="lg:w-2/3">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl pl-2 pt-2 font-bold font-poppins text-gray-900">Active Assignments</h2>
        </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {cards.length > 0 ? (
                            cards.map((card, index) => {
                                const statusColor = getStatusColor(card.Deadline);
                                const timeRemaining = getTimeRemaining(card.Deadline);
                                
            return (
                                    <div 
                                        key={card._id} 
                                        className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 cursor-pointer"
                                        onClick={() => navigate(`/assignment/${card.hash}`)}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{card.Title}</h3>
                                            <span className={`${statusColor} py-1 px-3 rounded-full text-xs font-medium`}>
                                                {timeRemaining}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-4 line-clamp-2">{card.Description || "No description provided"}</p>

                                        <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Due: {new Date(card.Deadline || '').toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span className="ml-1 text-sm font-medium text-gray-600">
                                                    {submissions || 0} submissions
                                                </span>
                                            </div>
                                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded-lg text-sm font-medium transition-colors">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-2 flex flex-col items-center justify-center py-10 text-center">
                                <div className="text-indigo-400 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-800 mb-2">No assignments found</h3>
                                <p className="text-gray-500 max-w-sm mb-6">You don't have any active assignments at the moment. Create one to get started!</p>
                                <button
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                                    onClick={() => setModal(true)}
                                >
                                    Create a New Assignment
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Calendar Section */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-md p-5 h-full">
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative">
                                <h2 className="text-xl font-bold font-poppins text-gray-800">My Calendar</h2>
                                <div className="absolute -bottom-1 left-0 w-10 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                            </div>
                            <div className="text-sm bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                        
                        <div className="calendar-container rounded-lg overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 shadow-inner" style={{ height: 350 }}>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                onSelectEvent={handleSelectEvent}
                                eventPropGetter={eventStyleGetter}
                                views={['month']}
                                defaultView="month"
                                defaultDate={new Date()}
                                popup
                                className="font-poppins custom-calendar"
                                dayPropGetter={(date: Date) => {
                                    const today = new Date();
                                    if (
                                        date.getDate() === today.getDate() &&
                                        date.getMonth() === today.getMonth() &&
                                        date.getFullYear() === today.getFullYear()
                                    ) {
                                        return {
                                            style: {
                                                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                                                borderRadius: '50%'
                                            }
                                        };
                                    }
                                    return {};
                                }}
                                components={{
                                    toolbar: () => null
                                }}
                            />
                        </div>
                        
                        <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-inner">
                            <h3 className="text-lg font-semibold font-poppins text-indigo-700 mb-2">Assignment Legend</h3>
                            <div className="grid grid-cols-3 gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 inline-block rounded-full bg-red-500 shadow-sm"></span>
                                    <span className="text-xs text-gray-700">Overdue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 inline-block rounded-full bg-amber-500 shadow-sm"></span>
                                    <span className="text-xs text-gray-700">Due Soon</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 inline-block rounded-full bg-indigo-500 shadow-sm"></span>
                                    <span className="text-xs text-gray-700">Upcoming</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GeneratorModal />

            <style>{`
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    20% { transform: rotate(8deg); }
                    40% { transform: rotate(0deg); }
                    60% { transform: rotate(8deg); }
                    80% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-wave {
                    animation: wave 2.5s infinite;
                    transform-origin: 70% 70%;
                    display: inline-block;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                }
                
                /* Calendar custom styles */
                .rbc-calendar {
                    font-family: 'Poppins', sans-serif;
                    background: transparent;
                }
                .rbc-header {
                    padding: 6px 2px;
                    font-weight: 600;
                    font-size: 0.75rem;
                    color: #6b7280;
                    background-color: transparent;
                    border: none;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .rbc-month-view {
                    border: none;
                    border-radius: 8px;
                    overflow: hidden;
                    background: transparent;
                }
                .rbc-month-row {
                    border: none;
                    min-height: 36px;
                }
                .rbc-day-bg {
                    background-color: transparent;
                    border: none;
                    transition: background-color 0.2s ease;
                }
                .rbc-day-bg:hover {
                    background-color: rgba(99, 102, 241, 0.05);
                }
                .rbc-off-range-bg {
                    background-color: transparent;
                    opacity: 0.3;
                }
                .rbc-date-cell {
                    padding: 2px 4px 0 0;
                    font-size: 0.82rem;
                    color: #4b5563;
                    text-align: center;
                    font-family: 'Poppins', 'Inter', sans-serif;
                    font-weight: 500;
                    letter-spacing: 0.01em;
                }
                .rbc-date-cell.rbc-now {
                    font-weight: 700;
                    color: #4f46e5;
                    position: relative;
                }
                .rbc-date-cell.rbc-now::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 24px;
                    height: 24px;
                    background-color: rgba(99, 102, 241, 0.15);
                    border-radius: 50%;
                    z-index: -1;
                }
                .rbc-row-segment {
                    padding: 1px 1px;
                }
                .rbc-event {
                    border-radius: 3px;
                    padding: 1px 3px;
                    font-size: 0.65rem;
                    border: none;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    opacity: 0.9;
                    transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
                }
                .rbc-event:hover {
                    opacity: 1;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
                }
                .rbc-today {
                    background-color: transparent;
                }
                .custom-calendar .rbc-row-content {
                    z-index: 0;
                }
                .rbc-month-row + .rbc-month-row {
                    border: none;
                }
                .rbc-day-bg + .rbc-day-bg {
                    border: none;
                }
                .rbc-month-header {
                    border-bottom: 1px dashed rgba(99, 102, 241, 0.2);
                    margin-bottom: 4px;
                }
                .rbc-date-cell > a {
                    font-weight: 500;
                    transition: color 0.2s ease;
                }
                .rbc-date-cell > a:hover {
                    color: #4f46e5;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
