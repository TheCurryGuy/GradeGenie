import { useNavigate } from 'react-router-dom';

function ErrorRoute() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] text-center max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
      </div>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Go to Home
      </button>
    </div>
  );
}

export default ErrorRoute;