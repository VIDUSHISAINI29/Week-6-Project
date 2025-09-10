import React, { useState } from 'react'
import { motion } from 'motion/react'
import { X, Upload, FileText, User, Mail, Phone, Briefcase, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Progress } from '../ui/progress'
import { toast } from 'sonner@2.0.3'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  requirements: string[]
}

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  job: Job | null
  user: any
}

export function JobApplicationModal({ isOpen, onClose, job, user }: JobApplicationModalProps) {
  const [applicationData, setApplicationData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    coverLetter: '',
    expectedSalary: '',
    availableStartDate: '',
    portfolioUrl: '',
    linkedinUrl: '',
    resumeUploaded: false,
    portfolioUploaded: false
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const totalSteps = 3

  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (type: 'resume' | 'portfolio') => {
    // Simulate file upload
    setTimeout(() => {
      if (type === 'resume') {
        setApplicationData(prev => ({ ...prev, resumeUploaded: true }))
        toast.success('Resume uploaded successfully!')
      } else {
        setApplicationData(prev => ({ ...prev, portfolioUploaded: true }))
        toast.success('Portfolio uploaded successfully!')
      }
    }, 1000)
  }

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return applicationData.firstName && applicationData.lastName && applicationData.email && applicationData.phone
      case 2:
        return applicationData.coverLetter && applicationData.resumeUploaded
      case 3:
        return applicationData.expectedSalary && applicationData.availableStartDate
      default:
        return false
    }
  }

  const canProceedToNext = () => {
    return isStepComplete(currentStep)
  }

  const handleNext = () => {
    if (canProceedToNext() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceedToNext()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setApplicationSubmitted(true)
      toast.success('Application submitted successfully!')
    }, 2000)
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  if (!job) return null

  if (applicationSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md glass-elevated">
          <div className="py-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            </motion.div>
            <h3 className="mb-2 text-2xl font-bold gradient-text">Application Submitted!</h3>
            <p className="mb-6 text-muted-foreground">
              Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been successfully submitted.
            </p>
            <div className="space-y-4">
              <Card className="p-4 glass-card">
                <p className="text-sm text-muted-foreground">
                  You'll receive a confirmation email shortly. The hiring team typically responds within 3-5 business days.
                </p>
              </Card>
              <Button onClick={onClose} className="w-full gradient-primary hover-lift">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-elevated">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Apply for {job.title}</DialogTitle>
          <p className="text-muted-foreground">{job.company} • {job.location}</p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="glass-card" />
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6 glass-card">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={applicationData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="border-0 glass-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={applicationData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="border-0 glass-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-0 glass-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={applicationData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="border-0 glass-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn Profile (Optional)</Label>
                    <Input
                      id="linkedinUrl"
                      value={applicationData.linkedinUrl}
                      onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                      className="border-0 glass-card"
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolioUrl">Portfolio Website (Optional)</Label>
                    <Input
                      id="portfolioUrl"
                      value={applicationData.portfolioUrl}
                      onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                      className="border-0 glass-card"
                      placeholder="yourportfolio.com"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6 glass-card">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold">
                  <FileText className="w-5 h-5" />
                  Documents & Cover Letter
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Resume/CV *</Label>
                    <div className="p-6 text-center border-2 border-dashed rounded-lg border-border">
                      {applicationData.resumeUploaded ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span>Resume uploaded successfully</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Upload your resume (PDF, DOC, DOCX)
                          </p>
                          <Button 
                            onClick={() => handleFileUpload('resume')} 
                            variant="outline"
                            className="border-0 glass-card"
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      rows={8}
                      className="border-0 glass-card"
                      placeholder="Write a compelling cover letter explaining why you're the perfect fit for this role..."
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {applicationData.coverLetter.length}/2000 characters
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>Portfolio (Optional)</Label>
                    <div className="p-6 text-center border-2 border-dashed rounded-lg border-border">
                      {applicationData.portfolioUploaded ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span>Portfolio uploaded successfully</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Upload portfolio samples (ZIP, PDF)
                          </p>
                          <Button 
                            onClick={() => handleFileUpload('portfolio')} 
                            variant="outline"
                            className="border-0 glass-card"
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6 glass-card">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold">
                  <Briefcase className="w-5 h-5" />
                  Job Preferences
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">Expected Salary *</Label>
                      <Input
                        id="expectedSalary"
                        value={applicationData.expectedSalary}
                        onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                        className="border-0 glass-card"
                        placeholder="e.g. $120,000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availableStartDate">Available Start Date *</Label>
                      <Input
                        id="availableStartDate"
                        type="date"
                        value={applicationData.availableStartDate}
                        onChange={(e) => handleInputChange('availableStartDate', e.target.value)}
                        className="border-0 glass-card"
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-3 font-semibold">Job Requirements Match</h4>
                    <div className="space-y-3">
                      {job.requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-card">
                          <span className="text-sm">{req}</span>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600">Match</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-card">
                <h4 className="mb-3 font-semibold">Application Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span>{job.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company:</span>
                    <span>{job.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary Range:</span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Expected Salary:</span>
                    <span>{applicationData.expectedSalary}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="border-0 glass-card"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          <div className="flex space-x-2">
            {!isStepComplete(currentStep) && currentStep < totalSteps && (
              <div className="flex items-center space-x-2 text-sm text-amber-600">
                <AlertCircle className="w-4 h-4" />
                <span>Please complete all required fields</span>
              </div>
            )}
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext} 
                disabled={!canProceedToNext()}
                className="gradient-primary hover-lift"
              >
                Next Step
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={!canProceedToNext() || isSubmitting}
                className="gradient-primary hover-lift"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}