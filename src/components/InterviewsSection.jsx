import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, Phone, MoreHorizontal } from "lucide-react"

/* -------------------------------------------------------------------------- */
/* Mock data & helpers                                                        */
/* -------------------------------------------------------------------------- */

const mockInterviews = [
  {
    id: "1",
    candidateName: "Sarah Johnson",
    position: "React Developer",
    date: "2024-07-20",
    time: "10:00 AM",
    type: "video",
    status: "scheduled",
  },
  {
    id: "2",
    candidateName: "Mike Chen",
    position: "Data Scientist",
    date: "2024-07-20",
    time: "2:00 PM",
    type: "video",
    status: "scheduled",
  },
  {
    id: "3",
    candidateName: "Emily Rodriguez",
    position: "UI/UX Designer",
    date: "2024-07-21",
    time: "11:30 AM",
    type: "phone",
    status: "scheduled",
  },
]

const statusColors = {
  scheduled: "bg-primary text-primary-foreground",
  completed: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
}

const typeIcons = {
  video: Video,
  phone: Phone,
  "in-person": Calendar,
}

/* -------------------------------------------------------------------------- */
/* Utility helpers                                                            */
/* -------------------------------------------------------------------------- */

const to24h = (t) => {
  if (!t) return ""
  if (/^\d{2}:\d{2}$/.test(t)) return t // already 24h
  const [time, ampm = ""] = t.split(" ")
  if (!time) return ""
  let [h, m] = time.split(":").map((n) => parseInt(n, 10))
  const mer = ampm.toLowerCase()
  if (mer === "pm" && h < 12) h += 12
  if (mer === "am" && h === 12) h = 0
  return `${String(h).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`
}

const formatTimeForDisplay = (t) => {
  if (!t) return ""
  if (/^\d{2}:\d{2}$/.test(t)) {
    let [h, m] = t.split(":").map(Number)
    const ampm = h >= 12 ? "PM" : "AM"
    h = h % 12 || 12
    return `${h}:${String(m).padStart(2, "0")} ${ampm}`
  }
  return t
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function InterviewsSection() {
  const [interviews, setInterviews] = useState(mockInterviews)
{/*Reschedule modal state*/} 
  const [showResModal, setShowResModal] = useState(false)
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [resDate, setResDate] = useState("") // YYYY-MM-DD
  const [resTime, setResTime] = useState("") // HH:MM (24h)

  {/* New interview form*/} 
  const [showNewForm, setShowNewForm] = useState(false)
  const [newName, setNewName] = useState("")
  const [newRole, setNewRole] = useState("")
  const [newDate, setNewDate] = useState("") 
  const [newTime, setNewTime] = useState("") 

  const [openMenuId, setOpenMenuId] = useState(null)
  const menuAnchorRef = useRef(null)
  const openReschedule = (interview) => {
    setSelectedInterview(interview)
    {/* prefill date and time*/} 
    setResDate(interview.date || "")
    setResTime(to24h(interview.time || ""))
    setShowResModal(true)
  }
  const confirmReschedule = (e) => {
    e?.preventDefault?.()
    if (!selectedInterview) return
    setInterviews((prev) =>
      prev.map((i) =>
        i.id === selectedInterview.id
          ? { ...i, date: resDate, time: formatTimeForDisplay(resTime) }
          : i
      )
    )
    setShowResModal(false)
    setSelectedInterview(null)
    setResDate("")
    setResTime("")
  }
  const handleAddInterview = () => {
    if (!newName || !newRole || !newDate || !newTime) return
    const entry = {
      id: Date.now().toString(),
      candidateName: newName,
      position: newRole,
      date: newDate,
      time: formatTimeForDisplay(newTime),
      type: "video",
      status: "scheduled",
    }
    {/* New interviews append at bottom */}
    setInterviews((p) => [...p, entry]) 
    setShowNewForm(false)
    setNewName("")
    setNewRole("")
    setNewDate("")
    setNewTime("")
  }
  const handleDelete = (id) => {
    setInterviews((p) => p.filter((i) => i.id !== id))
    setOpenMenuId(null)
    menuAnchorRef.current = null
  }
  useEffect(() => {
    if (!openMenuId) return
    const onDocClick = (ev) => {
      if (menuAnchorRef.current && !menuAnchorRef.current.contains(ev.target)) {
        setOpenMenuId(null)
        menuAnchorRef.current = null
      }
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [openMenuId])

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground ">
        Upcoming Interviews
        </h2>

        {/*Schedule New Interview*/}
        <Button
          className="w-full sm:w-auto btn-primary"
          onClick={() => setShowNewForm((s) => !s)}
        >
          <Calendar className="w-6 h-6" />
          Schedule New Interview
        </Button>
      </div>

      {/* Interview cards */}
      <div className="grid gap-4">
        {interviews.map((interview, index) => {
          const TypeIcon = typeIcons[interview.type]
            return (
            <motion.div
              key={interview.id}
              data-card-id={`card-${interview.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="p-4 h-full flex flex-col border-2 border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_4px_rgba(59,130,246,0.5)] bg-gray-100  hover:bg-gray-150 rounded-2xl "
                style={{ borderStyle: "solid" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = "#F97316"
                  e.currentTarget.style.borderLeftColor = "#F97316"
                  e.currentTarget.style.borderBottomColor = "#3B82F6"
                  e.currentTarget.style.borderRightColor = "#3B82F6"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = "transparent"
                  e.currentTarget.style.borderLeftColor = "transparent"
                  e.currentTarget.style.borderBottomColor = "transparent"
                  e.currentTarget.style.borderRightColor = "transparent"
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Candidate info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {interview.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base sm:text-lg">
                        {interview.candidateName}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {interview.position}
                      </p>
                    </div>
                  </div>

                  {/* Date, time, status and actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full lg:w-auto">
                    {/* Date and time */}
                    <div className="flex flex-col text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {interview.date
                            ? new Date(interview.date).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{interview.time}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-5 h-5 text-primary" />
                      <Badge
                        className={`${statusColors[interview.status]} capitalize`}
                      >
                        {interview.status}
                      </Badge>
                    </div>

                    {/*Delete inside dropdown*/}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => openReschedule(interview)}
                      >
                        Reschedule
                      </Button>

                      <div className="relative">
                        <button
                          aria-label="more"
                          className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            const id = interview.id
                            if (openMenuId === id) {
                              setOpenMenuId(null)
                              menuAnchorRef.current = null
                            } else {
                              setOpenMenuId(id)
                              menuAnchorRef.current = document.querySelector(
                                `[data-card-id="card-${id}"]`
                              )
                            }
                          }}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {openMenuId === interview.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-red-600"
                              onClick={() => handleDelete(interview.id)}
                            >
                              Delete
                            </button>
                            {/* Future actions can be added here */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Reschedule */}
      {showResModal && selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowResModal(false)
              setSelectedInterview(null)
            }}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              Reschedule Interview - {selectedInterview.candidateName}
            </h3>

            <form className="space-y-4" onSubmit={confirmReschedule}>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-md p-2"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Select Time
                </label>
                <input
                  type="time"
                  className="w-full border rounded-md p-2"
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowResModal(false)
                    setSelectedInterview(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Confirm</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* New Interview Form */}
      {showNewForm && (
        <div className="mt-6 p-4 border rounded bg-gray-50 space-y-3">
          <h3 className="font-semibold">Schedule New Interview</h3>
          <input
            type="text"
            placeholder="Candidate Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border p-2 rounded w-full"
          />
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddInterview}>Add Interview</Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
