import React, { useState, useContext } from "react";
import { Card, CardContent, CardHeader } from "./ui/Card";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/Select";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext.jsx";
import { api } from "../utils/axios.js";

const JobForm = ({ onClose, onJobPosted }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    skills: "",
    salaryMin: "",
    salaryMax: "",
    jobType: "full-time",
    workMode: "onsite",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/add-job", {
        postedBy: [user._id],
        title: formData.title,
        description: formData.description,
        company: formData.company,
        location: formData.location,
        skills: formData.skills.split(",").map((s) => s.trim()), // convert to array
        jobType: formData.jobType,
        workMode: formData.workMode,
      });

      toast.success("Job posted successfully!");
      onJobPosted(res.data.job);
      onClose();
    } catch (error) {
      console.error("Error posting job:", error.message);
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
  <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
    <CardHeader>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Post a New Job</h2>
        <Button variant="ghost" onClick={onClose}>
          ✕
        </Button>
      </div>
    </CardHeader>

    {/* Make only content scrollable */}
    <CardContent className="px-6 py-4 space-y-4 overflow-y-auto">
      <form className="space-y-4" onSubmit={handlePostJob}>
        {/* Your existing inputs */}
        <Input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <Input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Input
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />

        {/* Salary */}
        {/* <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            name="salaryMin"
            type="number"
            placeholder="Min Salary"
            value={formData.salaryMin}
            onChange={handleChange}
            required
          />
          <Input
            name="salaryMax"
            type="number"
            placeholder="Max Salary"
            value={formData.salaryMax}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Job Type & Work Mode */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Select
            value={formData.jobType}
            onValueChange={(val) => setFormData({ ...formData, jobType: val })}
          >
            <SelectTrigger className="w-full sm:w-1/2">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent className="bg-white ">
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={formData.workMode}
            onValueChange={(val) => setFormData({ ...formData, workMode: val })}
          >
            <SelectTrigger className="w-full sm:w-1/2">
              <SelectValue placeholder="Work Mode" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="onsite">Onsite</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>

  );
};

export default JobForm;
