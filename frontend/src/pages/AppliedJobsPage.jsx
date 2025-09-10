import React, { useState, useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { MapPin, Briefcase, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Separator from "../components/ui/Separator";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios.js";

const AppliedJobsPage = () => {
    const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);

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

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return "Invalid Date";
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes <= 0 ? "Just now" : `${diffInMinutes}m`;
    }
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get(`/applied-jobs/${user._id}`);
        setAppliedJobs(res.data.jobs || []);
      } catch (error) {
        console.log("Error fetching applied jobs:", error.message);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="container px-4 py-6 mx-auto">
          {/* Back Button */}
      <div className="mb-6">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate("/jobs")} // ✅ navigate to /network
        >
          &larr; Back
        </Button>
      </div>
      <div className="space-y-6">
        {/* Heading adjusted according to theme */}
        <h1 className="mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Jobs You've Applied For
        </h1>

        {appliedJobs.length === 0 && (
          <p className="text-muted-foreground">
            You haven't applied to any jobs yet.
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {appliedJobs.map((job) => (
            <Card key={job._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {job.location}
                      </span>
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

                  <div className="flex flex-col space-y-2">
                    <Button
                      className="bg-green-600 cursor-not-allowed hover:bg-green-700"
                      disabled
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Applied
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <h3 className="mb-1 font-semibold text-md">Job Description</h3>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobsPage;
