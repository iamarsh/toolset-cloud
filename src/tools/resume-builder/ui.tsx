'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, User, Briefcase, GraduationCap, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createResume,
  updatePersonalInfo,
  addWorkExperience,
  deleteWorkExperience,
  addEducation,
  deleteEducation,
  addSkill,
  removeSkill,
  saveResume,
  getAllResumes,
  deleteResume as removeResume,
  downloadResume,
  formatDate,
  type Resume,
  type WorkExperience,
  type Education,
} from './logic'

export default function ResumeBuilderUI() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [activeResume, setActiveResume] = useState<Resume | null>(null)
  const [newSkill, setNewSkill] = useState('')
  const [newWork, setNewWork] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  })
  const [newEdu, setNewEdu] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
  })

  useEffect(() => {
    const loaded = getAllResumes()
    setResumes(loaded)
  }, [])

  const handleCreateResume = () => {
    const resume = createResume()
    saveResume(resume)
    setResumes([resume, ...resumes])
    setActiveResume(resume)
  }

  const handleUpdatePersonalInfo = (field: string, value: string) => {
    if (!activeResume) return
    const updated = updatePersonalInfo(activeResume, {
      ...activeResume.personalInfo,
      [field]: value,
    })
    saveResume(updated)
    setActiveResume(updated)
    setResumes(resumes.map((r: Resume) => (r.id === updated.id ? updated : r)))
  }

  const handleAddWorkExperience = () => {
    if (!activeResume || !newWork.company.trim() || !newWork.position.trim() || !newWork.startDate)
      return

    const updated = addWorkExperience(
      activeResume,
      newWork.company.trim(),
      newWork.position.trim(),
      new Date(newWork.startDate),
      newWork.current ? null : new Date(newWork.endDate),
      newWork.current,
      newWork.description.trim()
    )
    saveResume(updated)
    setActiveResume(updated)
    setResumes(resumes.map((r: Resume) => (r.id === updated.id ? updated : r)))
    setNewWork({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    })
  }

  const handleDeleteWorkExperience = (experienceId: string) => {
    if (!activeResume) return
    const updated = deleteWorkExperience(activeResume, experienceId)
    saveResume(updated)
    setActiveResume(updated)
    setResumes(resumes.map((r: Resume) => (r.id === updated.id ? updated : r)))
  }

  const handleAddEducation = () => {
    if (!activeResume || !newEdu.institution.trim() || !newEdu.degree.trim() || !newEdu.startDate)
      return

    const updated = addEducation(
      activeResume,
      newEdu.institution.trim(),
      newEdu.degree.trim(),
      newEdu.field.trim(),
      new Date(newEdu.startDate),
      newEdu.current ? null : new Date(newEdu.endDate),
      newEdu.current
    )
    saveResume(updated)
    setActiveResume(updated)
    setResumes(resumes.map((r: Resume) => (r.id === updated.id ? updated : r)))
    setNewEdu({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
    })
  }

  const handleDeleteEducation = (educationId: string) => {
    if (!activeResume) return
    const updated = deleteEducation(activeResume, educationId)
    saveResume(updated)
    setActiveResume(updated)
    setResumes(resumes.map((r: Resume) => (r.id === updated.id ? updated : r)))
  }

  const handleAddSkill = () => {
    if (!activeResume || !newSkill.trim()) return
    const updated = addSkill(activeResume, newSkill.trim())
    saveResume(updated)
    setActiveResume(updated)
    setResumes(resumes.map((r: Resume) => (r.id === updated.id ? updated : r)))
    setNewSkill('')
  }

  const handleRemoveSkill = (skill: string) => {
    if (!activeResume) return
    const updated = removeSkill(activeResume, skill)
    saveResume(updated)
    setActiveResume(updated)
    setResumes(resumes.map((r: Resume) => (r.id === updated.id ? updated : r)))
  }

  const handleDeleteResume = (id: string) => {
    removeResume(id)
    const updated = resumes.filter((r: Resume) => r.id !== id)
    setResumes(updated)
    if (activeResume?.id === id) {
      setActiveResume(updated.length > 0 ? updated[0] : null)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="p-6">
        <Button onClick={handleCreateResume}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Resume
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Resumes Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Your Resumes</h3>
            {resumes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No resumes yet</p>
            ) : (
              <div className="space-y-2">
                {resumes.map((resume: Resume) => (
                  <button
                    key={resume.id}
                    onClick={() => setActiveResume(resume)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeResume?.id === resume.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {resume.personalInfo.fullName || 'Untitled Resume'}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {resume.workExperience.length} jobs • {resume.education.length} education
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteResume(resume.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Active Resume */}
        <div className="lg:col-span-3 space-y-6">
          {activeResume ? (
            <>
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold">
                    {activeResume.personalInfo.fullName || 'Resume Builder'}
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => downloadResume(activeResume)}>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </Card>

              {/* Personal Info */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={activeResume.personalInfo.fullName}
                    onChange={(e) => handleUpdatePersonalInfo('fullName', e.target.value)}
                    placeholder="Full Name"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="email"
                    value={activeResume.personalInfo.email}
                    onChange={(e) => handleUpdatePersonalInfo('email', e.target.value)}
                    placeholder="Email"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="tel"
                    value={activeResume.personalInfo.phone}
                    onChange={(e) => handleUpdatePersonalInfo('phone', e.target.value)}
                    placeholder="Phone"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={activeResume.personalInfo.location}
                    onChange={(e) => handleUpdatePersonalInfo('location', e.target.value)}
                    placeholder="Location"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>
                <textarea
                  value={activeResume.personalInfo.summary}
                  onChange={(e) => handleUpdatePersonalInfo('summary', e.target.value)}
                  placeholder="Professional summary..."
                  className="w-full h-24 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                />
              </Card>

              {/* Work Experience */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Work Experience
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newWork.company}
                      onChange={(e) => setNewWork({ ...newWork, company: e.target.value })}
                      placeholder="Company"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="text"
                      value={newWork.position}
                      onChange={(e) => setNewWork({ ...newWork, position: e.target.value })}
                      placeholder="Position"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="month"
                      value={newWork.startDate}
                      onChange={(e) => setNewWork({ ...newWork, startDate: e.target.value })}
                      placeholder="Start Date"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="month"
                      value={newWork.endDate}
                      onChange={(e) => setNewWork({ ...newWork, endDate: e.target.value })}
                      placeholder="End Date"
                      disabled={newWork.current}
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm disabled:opacity-50"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newWork.current}
                      onChange={(e) => setNewWork({ ...newWork, current: e.target.checked })}
                      className="rounded"
                    />
                    Currently working here
                  </label>
                  <textarea
                    value={newWork.description}
                    onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
                    placeholder="Job description..."
                    className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                  />
                  <Button onClick={handleAddWorkExperience}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>

                <div className="space-y-3 mt-4">
                  {activeResume.workExperience.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No work experience added
                    </p>
                  ) : (
                    activeResume.workExperience.map((exp: WorkExperience) => (
                      <div key={exp.id} className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium">{exp.position}</div>
                            <div className="text-sm text-muted-foreground">{exp.company}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatDate(exp.startDate)} -{' '}
                              {exp.current ? 'Present' : formatDate(exp.endDate!)}
                            </div>
                            {exp.description && (
                              <div className="text-sm mt-2">{exp.description}</div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteWorkExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Education */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newEdu.institution}
                      onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                      placeholder="Institution"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="text"
                      value={newEdu.degree}
                      onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                      placeholder="Degree"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="text"
                      value={newEdu.field}
                      onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
                      placeholder="Field of Study"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="month"
                      value={newEdu.startDate}
                      onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
                      placeholder="Start Date"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="month"
                      value={newEdu.endDate}
                      onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
                      placeholder="End Date"
                      disabled={newEdu.current}
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm disabled:opacity-50"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newEdu.current}
                      onChange={(e) => setNewEdu({ ...newEdu, current: e.target.checked })}
                      className="rounded"
                    />
                    Currently studying here
                  </label>
                  <Button onClick={handleAddEducation}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>

                <div className="space-y-3 mt-4">
                  {activeResume.education.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No education added
                    </p>
                  ) : (
                    activeResume.education.map((edu: Education) => (
                      <div key={edu.id} className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium">
                              {edu.degree} {edu.field && `in ${edu.field}`}
                            </div>
                            <div className="text-sm text-muted-foreground">{edu.institution}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatDate(edu.startDate)} -{' '}
                              {edu.current ? 'Present' : formatDate(edu.endDate!)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Skills */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Skills
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add skill..."
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeResume.skills.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No skills added</p>
                  ) : (
                    activeResume.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Resume Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new resume to get started.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
