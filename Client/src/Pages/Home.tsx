import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { StateContext } from '../Context API/StateContext';
import Sidebar from '../Components/Sidebar';
import Dashboard from '../Components/Dashboard';
import FinalAssignment from '../Components/FinalAssignment';
import FinalSubmission from '../Components/FinalSubmission';

interface ErrorBoundaryProps {
    children: React.ReactNode;
  }

  interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      console.error("Error caught:", error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <>
                    <h1>Oops! Something unexpected went wrong.</h1>
                    <p>There was an error in the application. Refreshing the page might resolve the issue, but the problem could persist. If the problem continues, please contact support.</p>
                </>
            );
        }
        return this.props.children;
    }
}

const Home: React.FC = () => {
    // Destructure boolean state variables (isHome, isAssignments, isSubmissions) from StateContext
    const { isHome, isAssignments, isSubmissions } = useContext(StateContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirect without alert
        }
    }, [token, navigate]);

    return (
        <div className="flex h-full">
            <Sidebar/>
            <div className='w-full h-screen'>
            <ErrorBoundary>
                {isHome && <Dashboard/>}       {/* Use boolean state variables for conditional rendering */}
                {isAssignments && <FinalAssignment/>} {/* Use boolean state variables for conditional rendering */}
                {isSubmissions && <FinalSubmission/>} {/* Use boolean state variables for conditional rendering */}
            </ErrorBoundary>
            </div>
            
        </div>
    );
}
export default Home;