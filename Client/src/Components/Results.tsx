import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { StateContext } from "../Context API/StateContext"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

const Results = () => {
  const { ocrOutput, sub_id, studentName } = useContext(StateContext)
  const [markdownContent, setMarkdownContent] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleDownloadPDF = () => {
    window.print()
    
  }


  const fetchResults = async (retry = false) => {
    if (retry) {
      setRetrying(true)
    }

    const abortController = new AbortController()

    try {
      setLoading(true)
      setProgress(0)

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 15
          const newProgress = Math.min(prev + increment, 95) // Cap at 95% until complete
          return newProgress
        })
      }, 800)

      const response = await axios.post(
        "https://grade-genie-server.vercel.app/api/v1/result",
        { ocrText: ocrOutput, sub_id },
        { signal: abortController.signal },
      )

      clearInterval(progressInterval)

      if (response.data.result) {
        setMarkdownContent(response.data.result)
        setProgress(100)
      }

      setLoading(false)
      setRetrying(false)
    } catch (err) {
      if (!abortController.signal.aborted) {
        console.error("Error fetching results:", err)
        setError("Failed to load results. Please try again.")
        setLoading(false)
        setRetrying(false)
      }
    }

    return () => {
      abortController.abort()
    }
  }

  useEffect(() => {
    if (!ocrOutput || !sub_id) {
      navigate("/")
      return
    }

    const abortController = new AbortController();

    fetchResults();

    return () => {
      abortController.abort();
    };
  }, [ocrOutput, sub_id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden">
          <div className="p-5 border-b border-purple-100">
            <h2 className="text-xl font-semibold text-purple-800 text-center">Analyzing Your Submission</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-purple-700">
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center">
              We're carefully evaluating your work. This may take a moment depending on the complexity of your
              submission.
            </p>
          </div>
          <div className="px-6 py-4 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-sm px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Cancel and return home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden">
          <div className="p-5 border-b border-purple-100">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 text-center">Error Occurred</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-center mb-6">{error}</p>
          </div>
          <div className="px-6 py-4 flex justify-center gap-3">
            <button
              onClick={() => fetchResults(true)}
              disabled={retrying}
              className={`flex items-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors ${retrying ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {retrying ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Retrying...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </>
              )}
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-100 px-6 py-5 border-b border-purple-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-purple-800">Evaluation Results</h1>
                <p className="text-purple-600 font-medium">{studentName}</p>
              </div>

              <div className="flex gap-2">
                {/* Back Button */}
                <div className="relative group">
                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                  </button>
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Return to home
                  </div>
                </div>

                {/* Share Button */}
                <div className="relative group">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    aria-label="Share results"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Share results
                  </div>
                </div>

                {/* Download Button */}
                <div className="relative group">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    aria-label="Download as PDF"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Download as PDF
                  </div>
                </div>

                {/* Print Button */}
                <div className="relative group">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center px-3 py-1.5 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                    Print
                  </button>
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Print results
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Evaluation Complete</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="prose prose-purple max-w-none">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="w-full space-y-2">
              <p>
                Results generated by GradeGenie based on your submission. For any questions regarding this evaluation,
                please contact your instructor.
              </p>
              <p className="text-xs text-gray-500">
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results

