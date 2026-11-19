import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, ChevronLeft, ChevronRight, GraduationCap, BookOpen, AlertCircle, CheckCircle, Clock, Percent } from 'lucide-react';

const ScholarshipPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submissionTime, setSubmissionTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, trigger, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      qualification: '',
      percentage: '',
      studyField: '',
      wantToStudy: ''
    }
  });

  // Watch qualification field to show/hide percentage field
  const qualification = watch('qualification');

  // Calculate time left until August 31, 2025
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetDate = new Date('August 31, 2025 23:59:59').getTime();
    const difference = targetDate - now;
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  // Initialize and update timer
  useEffect(() => {
    // Set initial time
    setTimeLeft(calculateTimeLeft());
    
    // Update timer every second
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Show popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(['name', 'phone', 'email']);
    } else if (step === 2) {
      // Only validate percentage if qualification is selected and not empty
      const fieldsToValidate = ['qualification', 'studyField'];
      if (qualification && qualification !== '') {
        fieldsToValidate.push('percentage');
      }
      isValid = await trigger(fieldsToValidate);
    }
    
    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Function to submit data to Google Sheets
  const submitToGoogleSheets = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz4LjMOyCG8rX05Tc2RmiBzMWYVVNmPvdFZTB2fx3FIQIcfNiKgWFIQJuCfIW1lSWvZ/exec';
      
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('qualification', data.qualification);
      formData.append('percentage', data.percentage || 'N/A');
      formData.append('studyField', data.studyField);
      formData.append('wantToStudy', data.wantToStudy);
      formData.append('timestamp', new Date().toISOString());
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Capture current date and time for display
        const now = new Date();
        const submissionDateTime = now.toLocaleString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        
        setSubmissionTime(submissionDateTime);
        setStep(4);
        
        // Reset form for potential new entries
        reset();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error!', error.message);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    submitToGoogleSheets(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden slide-in border-2 border-amber-400">
        {/* Header with Timer */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 relative">
          {step !== 4 && (
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
            >
              <X size={24} />
            </button>
          )}
          <div className="flex items-center mb-4">
            <GraduationCap size={32} className="mr-2" />
            <h2 className="text-2xl font-bold">Saroj International University</h2>
          </div>
          <p className="text-amber-100">
            {step === 4 ? 'Thank you for your interest!' : 'Get up to 100% scholarship! Check your eligibility now.'}
          </p>
          
          {/* Countdown Timer */}
          {step !== 4 && (
            <div className="mt-4 bg-amber-700/30 p-3 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Clock size={16} className="mr-2" />
                <span className="text-sm font-medium">Offer ends in:</span>
              </div>
              <div className="flex justify-center space-x-3 text-center">
                <div className="bg-amber-800/40 px-2 py-1 rounded">
                  <span className="font-bold block">{timeLeft.days || 0}</span>
                  <span className="text-xs">Days</span>
                </div>
                <div className="bg-amber-800/40 px-2 py-1 rounded">
                  <span className="font-bold block">{timeLeft.hours || 0}</span>
                  <span className="text-xs">Hours</span>
                </div>
                <div className="bg-amber-800/40 px-2 py-1 rounded">
                  <span className="font-bold block">{timeLeft.minutes || 0}</span>
                  <span className="text-xs">Mins</span>
                </div>
                <div className="bg-amber-800/40 px-2 py-1 rounded">
                  <span className="font-bold block">{timeLeft.seconds || 0}</span>
                  <span className="text-xs">Secs</span>
                </div>
              </div>
              <div className="text-center mt-2 text-amber-200 text-xs">
                Until August 31, 2025
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar - Hide on thank you screen */}
        {step !== 4 && (
          <div className="h-2 bg-amber-100">
            <div 
              className="h-full bg-amber-500 transition-all duration-300" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Form Content */}
        {step === 4 ? (
          // Thank You Screen
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Our team will contact you soon regarding your scholarship eligibility.
            </p>
            {submissionTime && (
              <div className="bg-amber-50 p-4 rounded-md mb-6 border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Submission Time:</strong> {submissionTime}
                </p>
              </div>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'Name should contain only letters and spaces'
                      }
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit Indian phone number'
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Educational Background</h3>
                
                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                    Highest Qualification *
                  </label>
                  <select
                    id="qualification"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.qualification ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('qualification', { 
                      required: 'Please select your qualification' 
                    })}
                  >
                    <option value="">Select your qualification</option>
                    
                    <option value="12th">12th Standard</option>
                    <option value="Graduation">Graduation</option>
                 
                  </select>
                  {errors.qualification && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.qualification.message}
                    </p>
                  )}
                </div>

                {/* Percentage Field - Only show if qualification is selected */}
                {qualification && qualification !== '' && (
                  <div>
                    <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage Obtained *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="percentage"
                        min="0"
                        max="100"
                        step="0.01"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                          errors.percentage ? 'border-red-500' : 'border-gray-300'
                        } pr-10`}
                        placeholder="Enter your percentage"
                        {...register('percentage', { 
                          required: 'Percentage is required',
                          min: {
                            value: 0,
                            message: 'Percentage cannot be negative'
                          },
                          max: {
                            value: 100,
                            message: 'Percentage cannot exceed 100%'
                          }
                        })}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Percent size={16} className="text-gray-400" />
                      </div>
                    </div>
                    {errors.percentage && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.percentage.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the percentage you scored in your {qualification.toLowerCase()}
                    </p>
                  </div>
                )}
                
                <div>
                  <label htmlFor="studyField" className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study *
                  </label>
                  <select
                    id="studyField"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.studyField ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('studyField', { 
                      required: 'Please select your field of study' 
                    })}
                  >
                    <option value="">Select your field</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Management">Management</option>
                  </select>
                  {errors.studyField && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.studyField.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Preferences</h3>
                
                <div>
                  <label htmlFor="wantToStudy" className="block text-sm font-medium text-gray-700 mb-1">
                    Want to Study *
                  </label>
                  <select
                    id="wantToStudy"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.wantToStudy ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('wantToStudy', { 
                      required: 'Please select what you want to study' 
                    })}
                  >
                    <option value="">Select program</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="M.Sc">M.Sc</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="M.Pharm">M.Pharm</option>
                    <option value="Ph.D">Ph.D</option>
                    <option value="Diploma">Diploma</option>
                    <option value="MBA">MBA</option>
                  </select>
                  {errors.wantToStudy && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.wantToStudy.message}
                    </p>
                  )}
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                  <div className="flex items-start">
                    <BookOpen size={20} className="text-amber-600 mt-0.5 mr-2" />
                    <p className="text-amber-800 text-sm">
                      Based on your eligibility, you could qualify for up to 100% scholarship on tuition fees!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 text-gray-700 bg-amber-100 rounded-md hover:bg-amber-200 transition-colors"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Next
                  <ChevronRight size={20} className="ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-white rounded-md transition-colors flex items-center justify-center ${
                    isSubmitting ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Check Eligibility'
                  )}
                </button>
              )}
            </div>
          </form>
        )}

        {/* Step Indicators - Hide on thank you screen */}
        {step !== 4 && (
          <div className="flex justify-center pb-6 -mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full mx-1 ${i === step ? 'bg-amber-600' : 'bg-amber-200'}`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipPopup;