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

    // Update eventStyleGetter to use Tailwind classes
    const eventStyleGetter = (event: CalendarEvent) => {
        const resource = event.resource as Card;
        const deadline = resource?.Deadline;
        const now = new Date();
        const due = deadline ? new Date(deadline) : null;
        const isOverdue = due ? now.getTime() > due.getTime() : false;
        const isUpcoming = due ? due.getTime() - now.getTime() < 1000 * 60 * 60 * 24 * 2 : false;
        
        let className = 'px-2 py-1 rounded text-xs font-medium text-white border-0 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md';
        
        if (isOverdue) {
            className += ' bg-red-500 hover:bg-red-600';
        } else if (isUpcoming) {
            className += ' bg-amber-500 hover:bg-amber-600';
        } else {
            className += ' bg-indigo-500 hover:bg-indigo-600';
        }
        
        return { className };
    };

    // Handle calendar event selection
    const handleSelectEvent = (event: CalendarEvent) => {
        const resource = event.resource as Card;
        if (resource?.hash) {
            navigate(`/share/${resource.hash}`);
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
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 m-4 p-6 rounded-xl shadow-lg relative overflow-hidden transform transition-all duration-500 hover:shadow-xl">
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

            <div className="mx-4 flex flex-col lg:flex-row gap-6">
                {/* Calendar Section */}
                <div className="lg:w-1/3 lg:order-2">
                    <div className="bg-white/80 rounded-3xl shadow-2xl p-8 h-full flex flex-col border border-purple-100/30 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:bg-white">
                        <div className="flex justify-between items-start mb-8">
                            <div className="relative">
                                <span className="absolute -left-6 -top-6 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-60"></span>
                                <span className="absolute right-0 bottom-0 w-20 h-20 bg-indigo-200 rounded-full blur-2xl opacity-60"></span>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 relative">My Calendar</h2>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
                                        <p className="text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                                            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50/80 via-white/90 to-indigo-50/80 min-h-[350px] relative group shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                                className="font-poppins h-full 
                                    [&_.rbc-calendar]:h-full [&_.rbc-calendar]:bg-transparent [&_.rbc-calendar]:border-0 
                                    [&_.rbc-header]:py-4 [&_.rbc-header]:px-2 [&_.rbc-header]:text-[11px] [&_.rbc-header]:tracking-wider [&_.rbc-header]:font-bold [&_.rbc-header]:uppercase [&_.rbc-header]:bg-gradient-to-r [&_.rbc-header]:from-purple-600 [&_.rbc-header]:to-indigo-600 [&_.rbc-header]:bg-clip-text [&_.rbc-header]:text-transparent [&_.rbc-header]:border-0
                                    [&_.rbc-month-view]:border-0 [&_.rbc-month-view]:rounded-2xl [&_.rbc-month-view]:shadow-none [&_.rbc-month-view]:overflow-hidden
                                    [&_.rbc-month-row]:min-h-[65px] [&_.rbc-month-row]:border-0
                                    [&_.rbc-date-cell]:p-1.5 [&_.rbc-date-cell]:text-sm [&_.rbc-date-cell]:font-medium [&_.rbc-date-cell]:text-gray-600 [&_.rbc-date-cell]:flex [&_.rbc-date-cell]:justify-center [&_.rbc-date-cell]:items-center [&_.rbc-date-cell:hover]:text-purple-700 [&_.rbc-date-cell]:transition-all [&_.rbc-date-cell]:duration-300
                                    [&_.rbc-today]:bg-transparent 
                                    [&_.rbc-off-range-bg]:bg-transparent [&_.rbc-off-range]:text-gray-300 
                                    [&_.rbc-event]:mb-1 [&_.rbc-event]:rounded-lg [&_.rbc-event]:shadow-lg [&_.rbc-event:hover]:shadow-xl [&_.rbc-event:hover]:-translate-y-0.5 [&_.rbc-event]:transition-all [&_.rbc-event]:duration-300
                                    [&_.rbc-show-more]:bg-transparent [&_.rbc-show-more]:text-xs [&_.rbc-show-more]:text-purple-600 [&_.rbc-show-more:hover]:bg-transparent [&_.rbc-show-more:hover]:text-purple-700 
                                    [&_.rbc-day-bg]:transition-all [&_.rbc-day-bg:hover]:bg-gradient-to-br [&_.rbc-day-bg:hover]:from-purple-50 [&_.rbc-day-bg:hover]:to-indigo-50 [&_.rbc-day-bg:hover]:duration-300
                                    [&_.rbc-month-row_+_.rbc-month-row]:border-0
                                    [&_.rbc-day-bg_+_.rbc-day-bg]:border-0
                                    [&_.rbc-date-cell.rbc-now]:relative [&_.rbc-date-cell.rbc-now_a]:bg-gradient-to-r [&_.rbc-date-cell.rbc-now_a]:from-purple-500 [&_.rbc-date-cell.rbc-now_a]:to-indigo-500 [&_.rbc-date-cell.rbc-now_a]:text-white [&_.rbc-date-cell.rbc-now_a]:w-8 [&_.rbc-date-cell.rbc-now_a]:h-8 [&_.rbc-date-cell.rbc-now_a]:rounded-xl [&_.rbc-date-cell.rbc-now_a]:flex [&_.rbc-date-cell.rbc-now_a]:items-center [&_.rbc-date-cell.rbc-now_a]:justify-center [&_.rbc-date-cell.rbc-now_a]:shadow-xl [&_.rbc-date-cell.rbc-now_a]:shadow-purple-200/50 [&_.rbc-date-cell.rbc-now_a]:hover:shadow-2xl [&_.rbc-date-cell.rbc-now_a]:transition-all [&_.rbc-date-cell.rbc-now_a]:duration-300 [&_.rbc-date-cell.rbc-now_a]:hover:scale-110 [&_.rbc-date-cell.rbc-now_a]:hover:from-purple-600 [&_.rbc-date-cell.rbc-now_a]:hover:to-indigo-600"
                                dayPropGetter={(date: Date) => {
                                    const today = new Date();
                                    if (
                                        date.getDate() === today.getDate() &&
                                        date.getMonth() === today.getMonth() &&
                                        date.getFullYear() === today.getFullYear()
                                    ) {
                                        return {
                                            className: 'font-bold'
                                        };
                                    }
                                    return {};
                                }}
                                components={{
                                    toolbar: () => null
                                }}
                            />
                        </div>

                        
                    </div>
                </div>

                {/* Assignments Section */}
                <div className="lg:w-2/3 lg:order-1">
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
                                        onClick={() => navigate(`/share/${card.hash}`)}
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
            </div>

            <GeneratorModal />
        </div>
    );
};

export default Dashboard;

