

const SubmissionsPage = () => {
    return (
        <div className="bg-gray-100 w-full h-full p-5">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                {/* Submissions Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Submissions</h2>
                </div>

                {/* Submissions Content */}
                <div className="flex">
                    {/* Assignment Section */}
                    <div className="bg-gray-200 rounded-md p-4 mr-4 flex-1">
                        <div className="mb-4">
                            <h3 className="text-lg text-gray-700 font-normal">Assignment Title</h3>
                        </div>
                        <div className="flex justify-around mb-2 text-sm text-gray-600">
                            <label className="mx-2">Student Name</label>
                            <label className="mx-2">Date</label>
                            <label className="mx-2">Time</label>
                            <label className="mx-2">Grade</label>
                            <label className="mx-2">Paper</label>
                        </div>
                        <div className="space-y-3">
                            <hr className="border-gray-300" />
                            <hr className="border-gray-300" />
                            <hr className="border-gray-300" />
                            <hr className="border-gray-300" />
                        </div>
                    </div>

                    {/* Class Section */}
                    <div className="bg-gray-200 rounded-md p-4 flex-1">
                        <div className="mb-4">
                            <h3 className="text-lg text-gray-700 font-normal">Class</h3>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="text-gray-600">
                                <label className="text-sm">Deadline</label>
                            </div>
                            <div className="text-gray-600">
                                <label className="text-sm">Details</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submission Summary */}
                <div className="mt-8 text-right text-gray-700 text-sm">
                    <p>10/100 people turned in their assignments</p>
                </div>
            </div>
        </div>
    );
};

export default SubmissionsPage;