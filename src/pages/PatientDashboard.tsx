import { useState } from "react";
import { Calendar, FileText, MessageSquare, Users, Heart, AlertTriangle, Clock, Phone, Plus, Camera, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import BackButton from "@/components/BackButton";
import VideoCall from "@/components/VideoCall";
import DocumentScanner from "@/components/DocumentScanner";
import MedicationManager from "@/components/MedicationManager";
import SOSEmergency from "@/components/SOSEmergency";
import { useTranslation } from "react-i18next";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showDocumentScanner, setShowDocumentScanner] = useState(false);
  const [showMedicationManager, setShowMedicationManager] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  const familyMembers = [
    { name: "John Doe", relationship: "Self", access: "Full Access", status: "Healthy" },
    { name: "Jane Doe", relationship: "Spouse", access: "Full Access", status: "Medication Due" },
    { name: "Sarah Doe", relationship: "Daughter", access: "Limited Access", status: "Checkup Needed" },
  ];

  const upcomingAppointments = [
    { doctor: "Dr. Smith", date: "Jan 20", time: "10:00 AM", type: "Video Call" },
    { doctor: "Dr. Johnson", date: "Jan 22", time: "2:30 PM", type: "In-Person" },
  ];

  if (showSOS) {
    return <SOSEmergency onClose={() => setShowSOS(false)} />;
  }

  if (showVideoCall) {
    return <VideoCall onEnd={() => setShowVideoCall(false)} />;
  }

  if (showDocumentScanner) {
    return <DocumentScanner onClose={() => setShowDocumentScanner(false)} />;
  }

  if (showMedicationManager) {
    return <MedicationManager onClose={() => setShowMedicationManager(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{t("dashboard.welcome")}</h1>
              <p className="text-muted-foreground">Your complete health management dashboard</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        {/* Emergency SOS Button */}
        <div className="mb-8">
          <Button 
            onClick={() => setShowSOS(true)}
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 shadow-lg animate-pulse"
            size="icon"
          >
            <Phone className="h-8 w-8 text-white" />
          </Button>
          <p className="text-sm text-red-600 font-medium mt-2">{t("dashboard.emergencyCall")}</p>
        </div>

        {/* Quick Actions */}
        <Card className="border-none shadow-sm mb-8">
          <CardHeader>
            <CardTitle>{t("dashboard.quickActions")}</CardTitle>
            <CardDescription>Quick access to essential features</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate("/appointments")}
            >
              <Calendar className="h-6 w-6" />
              {t("dashboard.scheduleAppointment")}
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setShowDocumentScanner(true)}
            >
              <Camera className="h-6 w-6" />
              Scan Documents
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate("/documents")}
            >
              <FileText className="h-6 w-6" />
              {t("dashboard.viewRecords")}
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setShowMedicationManager(true)}
            >
              <Pill className="h-6 w-6" />
              {t("dashboard.medication")}
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Family Health Overview */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t("dashboard.familyOverview")}
              </CardTitle>
              <CardDescription>Health status of family members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {familyMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.relationship}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{member.status}</p>
                    <p className="text-xs text-muted-foreground">{member.access}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {t("dashboard.addMember")}
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>Your scheduled consultations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.date} • {appointment.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {appointment.type}
                    </span>
                    {appointment.type === 'Video Call' && (
                      <Button size="sm" variant="outline" onClick={() => setShowVideoCall(true)}>
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate("/appointments")}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Appointment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="border-none shadow-sm mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              {t("dashboard.emergencyContacts")}
            </CardTitle>
            <CardDescription>Quick access to emergency contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-1">
                <Phone className="h-5 w-5" />
                <span className="text-sm">108 - Emergency</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1">
                <Phone className="h-5 w-5" />
                <span className="text-sm">Family Doctor</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1">
                <Phone className="h-5 w-5" />
                <span className="text-sm">Emergency Contact</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border p-2">
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/family")}>
              <Users className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/appointments")}>
              <Calendar className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/documents")}>
              <FileText className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/messages")}>
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;