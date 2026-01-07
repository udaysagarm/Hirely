// src/components/JobCard.jsx
import React from 'react';
import { Star, ThumbsUp, XCircle } from 'lucide-react'; // Import XCircle for Cancel
import { Link } from 'react-router-dom';

const JobCard = ({ job, onInterestClick, onCancelJob, isProcessing }) => { // Added isProcessing prop
  const DEFAULT_AVATAR_URL = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const interestedCount = parseInt(job.interested_count || 0, 10);
  const isInterested = job.is_interested_by_current_user === true;
  const isJobFilled = job.status === 'filled';
  const isAssignedToMe = job.job_type === 'assigned_to_me'; // From backend my-jobs endpoint
  // job.has_any_assignment comes from backend on GET /api/jobs (public view) or my-jobs (posted view)
  const hasAnyAssignment = job.has_any_assignment === true;

  // Helper to determine the status text and color
  const getStatusDisplay = () => {
    let statusText = "";
    let statusColorClass = "";

    if (isJobFilled) {
      statusText = "FILLED";
      statusColorClass = "text-red-600";
    } else if (isAssignedToMe) { // Specific for jobs assigned to the current user
      statusText = "ASSIGNED TO ME"; // Distinct text for jobs assigned to the current user
      statusColorClass = "text-blue-600"; // Blue for assigned to me
    } else if (hasAnyAssignment) { // If not filled or assigned to ME, but has other assignments
      statusText = "STILL HIRING"; // Job is open, but someone else is assigned
      statusColorClass = "text-purple-600";
    } else {
      statusText = "OPEN"; // Job is open, and no one is assigned
      statusColorClass = "text-green-600";
    }

    return { statusText, statusColorClass };
  };

  const { statusText } = getStatusDisplay();

  // Handle click for Interest/Uninterest button (only for non-assigned jobs)
  const handleInterestButtonClick = () => {
    onInterestClick(job.id, isInterested);
  };

  // Handle click for Cancel Job button (only for assigned jobs)
  const handleCancelJobClick = () => {
    // Confirmation is handled in MyJobs.jsx's handleCancelJob
    onCancelJob(job.id, job.title); // Pass job ID and title for confirmation message
  };


  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative group">
      <div className="flex items-start mb-4">
        <img
          src={job.posted_by_avatar || DEFAULT_AVATAR_URL}
          alt={job.posted_by_name || "User"}
          className="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-gray-700 shadow-sm object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
            {job.title}
          </h3>
          <Link to={`/user/${job.posted_by_user_id}`} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
            Posted by {job.posted_by_name}
          </Link>
        </div>
        {/* Job Status Tag/Label (Moved to top right for better layout) */}
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isJobFilled ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
            isAssignedToMe ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
              hasAnyAssignment ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
            }`}>
            {statusText}
          </span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{job.description}</p>

      {job.rating > 0 && (
        <div className="flex items-center mb-4 bg-yellow-50 dark:bg-yellow-900/10 w-fit px-3 py-1 rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i <= parseFloat(job.rating) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
            />
          ))}
          <span className="ml-2 text-xs font-bold text-yellow-700 dark:text-yellow-500">({parseFloat(job.rating).toFixed(1)} / 5)</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-400 font-semibold mb-1">Pay</span>
          <span className="font-medium text-gray-900 dark:text-gray-200">{job.pay} <span className="text-gray-400 font-normal">({job.pay_type})</span></span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-400 font-semibold mb-1">Category</span>
          <span className="font-medium text-gray-900 dark:text-gray-200">{job.category}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-400 font-semibold mb-1">Location</span>
          <span className="font-medium text-gray-900 dark:text-gray-200">{job.location}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-400 font-semibold mb-1">Hours</span>
          <span className="font-medium text-gray-900 dark:text-gray-200">{job.total_hours ? `${job.total_hours} hrs` : 'N/A'}</span>
        </div>
      </div>

      {job.images && job.images.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {job.images.map((img, index) => (
            <img
              key={index}
              src={typeof img === 'string' ? img : URL.createObjectURL(img)}
              alt={`Job Image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
            />
          ))}
        </div>
      )}

      {(job.start_time || job.end_time) && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
            {job.start_time && `Starts: ${new Date(job.start_time).toLocaleString()} `}
            {job.end_time && `• Ends: ${new Date(job.end_time).toLocaleString()}`}
          </p>
        </div>
      )}

      {/* NEW: Display Assigned Details if job is assigned_to_me */}
      {isAssignedToMe && ( // Only show if job is assigned to current user
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
          <h4 className="text-sm font-bold text-primary-800 dark:text-primary-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Your Assignment Details
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong className="text-primary-700 dark:text-primary-400">Location:</strong> {job.assigned_location}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong className="text-primary-700 dark:text-primary-400">Instructions:</strong> {job.assigned_details}
          </p>
          {job.assigned_image_urls && job.assigned_image_urls.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {job.assigned_image_urls.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Assigned Ref ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-md shadow-sm border border-primary-200 dark:border-primary-700"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Button */}
      <div className="absolute top-6 right-6">
        {/* (Layout adjusted: Status is now at top right, button can be bottom right or inline. Keeping button at bottom right for consistancy but updating style) */}
      </div>

      <div className="mt-6 flex justify-end">
        {isAssignedToMe ? (
          <button
            id={`cancel-job-btn-${job.id}`}
            name={`cancel-job-btn-${job.id}`}
            onClick={handleCancelJobClick}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full shadow-lg shadow-red-500/20 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            aria-label={`Cancel job ${job.title}`}
          >
            <XCircle className="w-4 h-4" /> Cancel Job
          </button>
        ) : (
          <button
            id={`interest-btn-${job.id}`}
            name={`interest-btn-${job.id}`}
            onClick={handleInterestButtonClick}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full shadow-lg transition-all duration-300 font-medium hover:-translate-y-0.5 active:translate-y-0 ${isInterested
              ? "shadow-red-500/20 bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-red-500/40"
              : "shadow-primary-500/20 bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:shadow-primary-500/40"
              } ${isProcessing ? "opacity-70 cursor-wait" : ""}`}
            disabled={isProcessing}
            aria-label={isInterested ? `Uninterested in ${job.title}` : `Interested in ${job.title}`}
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            ) : (
              <ThumbsUp className={`w-4 h-4 ${isInterested ? "fill-current" : ""}`} />
            )}
            {isInterested ? "Uninterested" : "Interested"} {interestedCount > 0 && <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs ml-1">{interestedCount}</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;