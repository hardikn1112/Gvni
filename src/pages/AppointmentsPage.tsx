import { useState } from "react";
import { Calendar, Video, Phone, MapPin, Clock, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Video Call",
      status: "Confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Priya Sharma",
      specialty: "Pediatrician",
      date: "2024-01-22",
      time: "2:30 PM",
      type: "In-Person",
      status: "Pending"
    },
    {
      id: 3,
      doctor: "Dr. Amit Patel",
      specialty: "Orthopedic",
      date: "2024-01-25",
      time: "11:15 AM",
      type: "Phone Call",
      status: "Confirmed"
    }
  ];

  if (showVideoCall) {
    return <VideoCall onEnd={() => setShowVideoCall(false)} />;
  }

  const filteredAppointments = appointments.filter(apt =>
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{t("dashboard.appointments")}</h1>
              <p className="text-muted-foreground">Manage your appointments and consultations</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button className="h-20 flex-col gap-2">
            <Video className="h-6 w-6" />
            Video Consultation
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <MapPin className="h-6 w-6" />
            In-Person Visit
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Phone className="h-6 w-6" />
            Phone Consultation
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
            <Card key={apt.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{apt.doctor}</h3>
                    <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                    <p className="text-sm">{apt.date} • {apt.time}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full">{apt.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {apt.type === 'Video Call' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowVideoCall(true)}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Appointments Found</h3>
            <p className="text-muted-foreground mb-4">Schedule your first appointment with a healthcare provider</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;