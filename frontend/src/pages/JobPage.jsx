import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
   Search,
   MapPin,
   Briefcase,
   Clock,
   Bookmark,
   ExternalLink,
   Filter,
   Star,
   TrendingUp,
   Building2,
   ArrowLeft,
   SquarePen
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import Separator from "../components/ui/Separator";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../components/ui/Select";
import JobForm from '../components/JobForm'
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios.js";

const JobsPage = () => {
   const { user } = useContext(AuthContext);
   const [jobsArray, setJobsArray] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedJob, setSelectedJob] = useState(null);
   const [filterType, setFilterType] = useState("all");
   const [filterLocation, setFilterLocation] = useState("all");
   const [savedJobs, setSavedJobs] = useState(new Set(["2"]));
   const [applied, setApplied] = useState(false);
   const [showForm, setShowForm] = useState(false);

   const [isMobileView, setIsMobileView] = useState(false); // for mobile job details

   const getTypeColor = (type) => {
      switch (type) {
         case "full-time":
            return "bg-blue-200/50 text-blue-800";
         case "part-time":
            return "bg-purple-100 text-purple-800";
         case "contract":
            return "bg-orange-100 text-red-600";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };
   const getWorkModeColor = (workMode) => {
      switch (workMode) {
         case "onsite":
            return "bg-yellow-200/50 text-yellow-800";
         case "remote":
            return "bg-green-200/50 text-green-800";
         case "hybrid":
            return "bg-pink-200/50 text-pink-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const handleSaveJob = (jobId) => {
      setSavedJobs((prev) => {
         const newSaved = new Set(prev);
         if (newSaved.has(jobId)) {
            newSaved.delete(jobId);
            toast.success("Job removed from saved!");
         } else {
            newSaved.add(jobId);
            toast.success("Job saved successfully!");
         }
         return newSaved;
      });
   };

   const applyForJob = async (jobId) => {
      try {
         const res = await api.put(`/add-applicant-to-job/${jobId}`, {
            userId: user._id,
         });
         toast.success("Successfully Applied For Job");
         console.log("Applied");
         setApplied(!applied);
      } catch (error) {
         console.log("Error in applying for job", error.message);
         toast.error("Application Failed");
      }
   };

   useEffect(() => {
      const fetchAllJobs = async () => {
         try {
            const res = await api.get("/all-jobs");
            setJobsArray(res.data.jobs);
            console.log("Fetched jobs:", res.data.jobs);
            setSelectedJob(res.data.jobs[0]);
         } catch (error) {
            console.log("Error fetching jobs:", error.message);
         }
      };

      fetchAllJobs();
   }, [applied]);

   const formatCreatedAt = (createdAt) => {
      // const validDate = updatedAt ? updatedAt : createdAt;
      const date = new Date(createdAt);
      // console.log('Parsed date:', date);
      if (isNaN(date.getTime())) return "Invalid Date"; // check for invalid date

      const now = new Date();
      const diffInMs = now - date;
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      console.log("Difference in hours:", diffInHours);
      if (diffInHours < 1) {
         const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
         return diffInMinutes <= 0 ? "Just now" : `${diffInMinutes}m`;
      }
      if (diffInHours < 24) return `${diffInHours}h`;
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
   };

  return (
  <div className="container px-4 py-6 mx-auto">
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">Find Your Dream Job</h1>
            <p className="text-sm text-blue-100 md:text-base">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>
          <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
            <Link>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-purple-700 bg-white rounded-lg md:w-48"
                onClick={() => setShowForm(true)}
              >
                Post Job <SquarePen className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </Link>
            <Link to="/jobs/applied-jobs">
              <button className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-purple-700 bg-white rounded-lg md:w-48">
                Applied Jobs
              </button>
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 text-white bg-white/10 border-white/20 placeholder:text-blue-100 focus:ring-white/50"
            />
          </div>
          <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-auto">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full text-white sm:w-36 bg-white/10 border-white/20">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-full text-white sm:w-36 bg-white/10 border-white/20">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="austin">Austin</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Show job posting form */}
      {showForm && (
        <JobForm
          onClose={() => setShowForm(false)}
          onJobPosted={(newJob) => setJobsArray((prev) => [newJob, ...prev])}
        />
      )}

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Job List */}
        <div
          className={`lg:col-span-1 overflow-y-auto max-h-[calc(100vh-250px)] ${
            isMobileView ? "hidden lg:block" : "block"
          }`}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold md:text-lg">
                  Jobs ({jobsArray.length})
                </h2>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {jobsArray.map((job, index) => (
                  <div key={job._id}>
                    <div
                      className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                        selectedJob?._id === job._id
                          ? "bg-accent border-r-2 border-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedJob(job);
                        if (window.innerWidth < 1024) setIsMobileView(true);
                      }}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium">{job.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="flex items-center mt-2 space-x-2">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{job.location}</span>
                            <Badge variant="outline" className={`text-xs ${getWorkModeColor(job.workMode)}`}>
                              {job.workMode}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className={`text-xs ${getTypeColor(job.jobType)}`}>
                              {job.jobType}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatCreatedAt(job.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < jobsArray.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Details */}
        <div className={`lg:col-span-2 ${isMobileView ? "block" : "hidden lg:block"}`}>
          {selectedJob && (
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Back button for mobile */}
                  {isMobileView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center self-start gap-1"
                      onClick={() => setIsMobileView(false)}
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                  )}

                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                      <span className="text-lg font-bold text-white md:text-xl">
                        {selectedJob.postedBy[0].name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold md:text-2xl">{selectedJob.title}</h1>
                      <p className="text-base text-muted-foreground">{selectedJob.company}</p>
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedJob.location}</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            <Badge variant="outline" className={`text-xs ${getWorkModeColor(selectedJob.workMode)}`}>
                              {selectedJob.workMode}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${getTypeColor(selectedJob.jobType)}`}>
                              {selectedJob.jobType}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {formatCreatedAt(selectedJob.createdAt) === "Just now"
                                ? formatCreatedAt(selectedJob.createdAt)
                                : formatCreatedAt(selectedJob.createdAt) + " ago"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      className={`hover-lift ${
                        selectedJob.applicants?.some(
                          (applicantId) => applicantId.toString() === user._id
                        )
                          ? "bg-green-600 hover:bg-green-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      }`}
                      onClick={() => {
                        if (
                          !selectedJob.applicants?.some(
                            (applicantId) => applicantId.toString() === user._id
                          )
                        ) {
                          applyForJob(selectedJob._id);
                        }
                      }}
                      disabled={selectedJob.applicants?.some(
                        (applicantId) => applicantId.toString() === user._id
                      )}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {selectedJob.applicants?.some(
                        (applicantId) => applicantId.toString() === user._id
                      )
                        ? "Applied"
                        : "Apply"}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* ================= Job Description Section ================= */}
              <CardContent className="space-y-6">
                <div>
                  <h2 className="mb-2 text-lg font-semibold md:text-xl">Job Description</h2>
                  <p className="text-sm leading-relaxed md:text-base text-muted-foreground">
                    {selectedJob.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default JobsPage;

{
   /* Job Application Modal */
}
{
   /* <JobApplicationModal
  isOpen={isApplicationModalOpen}
  onClose={() => setIsApplicationModalOpen(false)}
  job={selectedJob}
  user={user}
/> */
}
