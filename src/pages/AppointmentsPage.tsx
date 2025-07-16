import { useState } from "react";
import {
  Calendar,
  Video,
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import LanguageSelector from "@/components/LanguageSelector";
import VideoCall from "@/components/VideoCall";
import { useTranslation } from "react-i18next";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAppointment, setEditingAppointment] = useState<any | null>(null);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      date: "2025-07-16",
      time: "11:00",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Priya Sharma",
      specialty: "Pediatrician",
      date: "2025-07-20",
      time: "14:30",
      type: "In-Person",
      status: "Pending",
    },
    {
      id: 3,
      doctor: "Dr. Neha Mehta",
      specialty: "Dermatologist",
      date: "2025-07-28",
      time: "13:00",
      type: "Video Call",
      status: "Confirmed",
    },
  ]);

  if (showVideoCall) {
    return <VideoCall onEnd={() => setShowVideoCall(false)} />;
  }

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateAppointment = () => {
    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === editingAppointment.id
            ? { ...editingAppointment, status: "Confirmed" }
            : apt
        )
      );
      setEditingAppointment(null);
    }
  };

  const handleCancel = (id: number) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "" } : apt
      )
    );
    const toast = document.createElement("div");
    toast.innerText = "Appointment Cancelled";
    toast.className =
      "fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow z-[1000]";
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                {t("dashboard.appointments")}
              </h1>
              <p className="text-muted-foreground">
                Manage your appointments and consultations
              </p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button className="h-20 flex-col gap-2">
            <Video className="h-6 w-6" />
            Video Consultation
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <Card
              key={apt.id}
              className="border-none shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{apt.doctor}</h3>
                    <p className="text-sm text-muted-foreground">
                      {apt.specialty}
                    </p>
                    <p className="text-sm">
                      {apt.date} • {apt.time}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                        {apt.type}
                      </span>
                      {apt.status && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            apt.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {apt.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {apt.type === "Video Call" && apt.status === "Confirmed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVideoCall(true)}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingAppointment(apt)}
                  >
                    Schedule
                  </Button>
                  {apt.status && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(apt.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Modal for editing appointment */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Appointment</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingAppointment(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Input
              placeholder="Doctor Name"
              value={editingAppointment.doctor}
              onChange={(e) =>
                setEditingAppointment({
                  ...editingAppointment,
                  doctor: e.target.value,
                })
              }
            />
            <Input
              placeholder="Specialty"
              value={editingAppointment.specialty}
              onChange={(e) =>
                setEditingAppointment({
                  ...editingAppointment,
                  specialty: e.target.value,
                })
              }
            />
            <Input
              type="date"
              value={editingAppointment.date}
              onChange={(e) =>
                setEditingAppointment({
                  ...editingAppointment,
                  date: e.target.value,
                })
              }
            />
            <Input
              type="time"
              value={editingAppointment.time}
              onChange={(e) =>
                setEditingAppointment({
                  ...editingAppointment,
                  time: e.target.value,
                })
              }
            />
            <Select
              value={editingAppointment.type}
              onValueChange={(value) =>
                setEditingAppointment({
                  ...editingAppointment,
                  type: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Video Call">Video Call</SelectItem>
                <SelectItem value="In-Person">In-Person</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full" onClick={handleUpdateAppointment}>
              Save Appointment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
