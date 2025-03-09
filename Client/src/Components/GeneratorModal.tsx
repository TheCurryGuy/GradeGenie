import type React from "react"
import { useRef, useState } from "react"
import { ArrowRightIcon, ArrowLeftIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid"
import pdfToText from 'react-pdftotext';
import mammoth from 'mammoth';
import { AiOutlineClose, AiOutlineEye, AiOutlineCalendar, AiFillInfoCircle } from 'react-icons/ai';
import { FiCheck, FiFileText, FiLink, FiArrowUpRight } from 'react-icons/fi';
import axios from "axios";

interface GeneratorModalProps {
  isOpen: boolean
  onClose: () => void
}

const GeneratorModal: React.FC<GeneratorModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const deadlineRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const nameCheckboxRef = useRef<HTMLInputElement>(null)
  const classCheckboxRef = useRef<HTMLInputElement>(null)
  const sectionCheckboxRef = useRef<HTMLInputElement>(null)
  const rollNoCheckboxRef = useRef<HTMLInputElement>(null)
  const departmentCheckboxRef = useRef<HTMLInputElement>(null)
  const emailCheckboxRef = useRef<HTMLInputElement>(null)
  const phoneNumberCheckboxRef = useRef<HTMLInputElement>(null)

  const nextPage = () => currentPage < 3 && setCurrentPage((p) => p + 1)
  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    processFile(file)
  }

  const processFile = async (file: File) => {
    setIsLoadingFile(true); // Start loading

    if (file.type === 'application/pdf') {
      try {
        const text = await pdfToText(file);
        setFileContent(text);
        setFileName(file.name);
        alert("File loaded successfully!");
      } catch (error) {
        console.error("Failed to extract text from PDF", error);
        setFileContent('');
        setFileName(null);
        alert('Error extracting text from PDF.');
      } finally {
        setIsLoadingFile(false); // End loading
      }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setFileContent(result.value);
        setFileName(file.name);
        alert("File loaded successfully!");
      } catch (error) {
        console.error('Error parsing DOCX file', error);
        alert('Error parsing DOCX file');
        setFileContent('');
        setFileName(null);
      } finally {
        setIsLoadingFile(false); // End loading
      }
    }
    else {
      alert('Unsupported file format. Only PDF and DOCX  are supported.');
      setFileContent('');
      setFileName(null);
      setIsLoadingFile(false); // End loading
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }

  const handleGenerateLink = () => {
    const dataToSend = {
      Name: nameCheckboxRef.current?.checked || false,
      Class: classCheckboxRef.current?.checked || false,
      Section: sectionCheckboxRef.current?.checked || false,
      RollNo: rollNoCheckboxRef.current?.checked || false,
      Department: departmentCheckboxRef.current?.checked || false,
      Email: emailCheckboxRef.current?.checked || false,
      PhoneNumber: phoneNumberCheckboxRef.current?.checked || false,
      Questions: fileContent,
      Title: titleRef.current?.value,
      Description: descriptionRef.current?.value,
      Deadline: deadlineRef.current?.value,
    }

    axios.post("http://localhost:3000/api/v1/generate", dataToSend)
      .then(response => {
        const hash = response.data.hash;
        localStorage.setItem('assignmentHash', hash);
        const assignmentUrl = `http://localhost:3000/api/v1/generate/${hash}`;
        alert(`Assignment link generated: ${assignmentUrl}`);
        onClose();
      })
      .catch(error => {
        console.error("Error sending data:", error);
        alert("Failed to generate assignment link. Please try again.");
      });

    console.log("Data to Send to Backend:", dataToSend)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity flex items-center justify-center p-4 font-mono">
      <div
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all w-full max-w-md md:max-w-2xl animate-fadeIn" // Adjusted max-w for md breakpoint
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6 md:px-10"> {/* Adjusted padding for md breakpoint */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200"> {/* Reduced pb for md breakpoint */}
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight"> {/* Adjusted text size for md breakpoint */}
              Assignment Generator
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
              aria-label="Close"
            >
              <AiOutlineClose className="h-5 w-5 sm:h-5 md:h-6 sm:w-5 md:w-6" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 sm:px-8 md:px-10"> {/* Adjusted padding for md breakpoint */}
          <div className="relative mb-8 md:mb-10"> {/* Adjusted mb for md breakpoint */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((currentPage - 1) / 2) * 100}%` }}
            ></div>
            <div className="relative flex justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`relative z-10 flex items-center justify-center w-8 h-8 sm:w-8 md:w-10 sm:h-8 md:h-10 rounded-full transition-all duration-300 ${ // Adjusted circle size for md breakpoint
                      currentPage >= step
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-200"
                        : "bg-white border-2 border-gray-300 text-gray-500"
                    }`}
                  >
                    {currentPage > step ? (
                      <FiCheck className="w-4 h-4 sm:w-4 md:w-5 sm:h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                    ) : (
                      <span className="text-sm font-bold">{step}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${currentPage >= step ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {step === 1 ? "Details" : step === 2 ? "Fields" : "Upload"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 md:px-10 overflow-y-auto max-h-[calc(80vh-300px)]"> {/* Adjusted padding for md breakpoint */}
          <div className="space-y-8">
            {currentPage === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm sm:text-sm md:text-base font-medium text-gray-700 mb-2"> {/* Adjusted text size for md breakpoint */}
                    Assignment Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      required
                      type="text"
                      ref={titleRef}
                      placeholder="Enter a descriptive title for your assignment"
                      className="w-full px-4 py-3 sm:px-4 md:px-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" // Adjusted padding for md breakpoint
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                      <AiOutlineEye className="w-5 h-5 sm:w-5 md:w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm sm:text-sm md:text-base font-medium text-gray-700 mb-2"> {/* Adjusted text size for md breakpoint */}
                      Submission Deadline <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        ref={deadlineRef}
                        className="w-full px-4 py-3 sm:px-4 md:px-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" // Adjusted padding for md breakpoint
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <AiOutlineCalendar className="w-5 h-5 sm:w-5 md:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                      </div>
                    </div>
                  </div>

                  <div className="md:row-span-2">
                    <label className="block text-sm sm:text-sm md:text-base font-medium text-gray-700 mb-2"> {/* Adjusted text size for md breakpoint */}
                      Description <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      ref={descriptionRef}
                      rows={5}
                      placeholder="Provide additional instructions or context for students..."
                      className="w-full px-4 py-3 sm:px-4 md:px-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none" // Adjusted padding for md breakpoint
                    />
                  </div>

                  <div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AiFillInfoCircle className="h-5 w-5 sm:h-5 md:h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm sm:text-sm md:text-sm text-blue-700"> {/* Adjusted text size for md breakpoint */}
                            Setting a clear deadline helps students manage their time effectively.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-5">
                  <h4 className="font-medium text-gray-800 mb-2">Student Information Fields</h4>
                  <p className="text-gray-600 text-sm sm:text-sm md:text-sm"> {/* Adjusted text size for md breakpoint */}
                    Select which information fields students need to provide when submitting their assignment.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Kept grid as is */}
                  {[
                    {
                      label: "Name",
                      ref: nameCheckboxRef,
                      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                    },
                    {
                      label: "Class",
                      ref: classCheckboxRef,
                      icon: "M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z",
                    },
                    {
                      label: "Section",
                      ref: sectionCheckboxRef,
                      icon: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
                    },
                    { label: "Roll No.", ref: rollNoCheckboxRef, icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14" },
                    {
                      label: "Department",
                      ref: departmentCheckboxRef,
                      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                    },
                    {
                      label: "Email",
                      ref: emailCheckboxRef,
                      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    },
                    {
                      label: "Phone Number",
                      ref: phoneNumberCheckboxRef,
                      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    },
                  ].map(({ label, ref, icon }) => (
                    <label
                      key={label}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 cursor-pointer group" // Kept as is
                    >
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            ref={ref}
                            className="w-5 h-5 sm:w-5 md:w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" // Adjusted checkbox size for md breakpoint
                          />
                        </div>
                        <div className="ml-3 flex items-center">
                          <svg
                            className="w-5 h-5 sm:w-5 md:w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" // Adjusted icon size for md breakpoint
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                          </svg>
                          <span className="ml-2 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                            {label}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-6" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                  <h4 className="font-medium text-gray-800 mb-2">Upload Question File</h4>
                  <p className="text-gray-600 text-sm sm:text-sm md:text-sm"> {/* Adjusted text size for md breakpoint */}
                    Upload a document containing the assignment questions. Supported formats: PDF, DOCX, DOC.
                  </p>
                </div>

                {!fileContent && <div
                  className={`relative border-2 border-dashed rounded-xl p-8 sm:p-10 md:p-16 text-center cursor-pointer transition-all duration-300 bg-gray-50 ${ // Adjusted padding for md breakpoint
                    isDragging
                      ? "border-blue-500 bg-blue-50 scale-[1.02] shadow-lg"
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                >
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                  />

                  <label htmlFor="file-upload" className="cursor-pointer w-full h-full block">
                    <div className="space-y-4">
                      <div className="mx-auto h-16 w-16 sm:h-16 md:h-20 sm:w-16 md:w-20 text-blue-500 bg-blue-100 rounded-full flex items-center justify-center"> {/* Adjusted icon container size for md breakpoint */}
                        <CloudArrowUpIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-10 md:w-10" aria-hidden="true" /> {/* Adjusted icon size for md breakpoint */}
                      </div>
                      <div className="text-lg sm:text-lg md:text-lg"> {/* Adjusted text size for md breakpoint */}
                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOCX or DOC (max. 10MB)</p>
                    </div>
                  </label>

                  {isDragging && (
                    <div className="absolute inset-0 bg-blue-100 bg-opacity-90 flex items-center justify-center rounded-xl">
                      <div className="text-blue-700 font-bold text-xl flex items-center">
                        <FiArrowUpRight
                          className="w-8 h-8 mr-2 animate-bounce"
                          fill="none"
                          stroke="currentColor"
                        />
                        Drop file here
                      </div>
                    </div>
                  )}
                </div>}
                {isLoadingFile && (
                    <div className="flex justify-center items-center"> <p>Loading</p></div>
                )}

                {fileContent && (
                  <div className="mt-6 animate-fadeIn">
                    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                          <FiFileText
                            className="w-5 h-5 text-gray-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                          />
                          <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                            {fileName || "Uploaded File"}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setFileContent(null)
                            setFileName(null)
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <AiOutlineClose className="w-5 h-5"  stroke="currentColor" />
                        </button>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="text-sm text-gray-600 whitespace-pre-wrap overflow-x-auto max-h-40 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                          {fileContent.substring(0, 500)}
                          {fileContent.length > 500 && (
                            <>
                              <span className="opacity-50">...</span>
                              <div className="mt-2 text-xs text-gray-500 italic">
                                (Preview showing first 500 characters)
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-6 sm:px-8 sm:py-6 md:px-10 flex flex-wrap justify-between items-center gap-4 border-t border-gray-200 mt-8"> {/* Adjusted padding for md breakpoint */}
          <div className="flex space-x-3">
            {currentPage > 1 && (
              <button
                onClick={prevPage}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                Back
              </button>
            )}

            {currentPage < 3 && (
              <button
                onClick={nextPage}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Next
                <ArrowRightIcon className="h-4 w-4 ml-2" aria-hidden="true" />
              </button>
            )}
          </div>

          {currentPage === 3 && (
            <button
              onClick={handleGenerateLink}
              type="button"
              disabled={!fileContent}
              className={`inline-flex items-center px-5 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white
                ${
                  fileContent
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : "bg-gray-400 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
            >
              <FiLink className="w-5 h-5 mr-2" fill="none" stroke="currentColor" />
              Generate Assignment Link
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default GeneratorModal