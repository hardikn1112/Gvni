import { useState } from "react";
import { Calendar, FileText, MessageSquare, Users, Video, Clock, Bell, User, Phone, Settings, ArrowLeft, Plus, Search, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import BackButton from "@/components/BackButton";
import VideoCall from "@/components/VideoCall";
import DocumentScanner from "@/components/DocumentScanner";
import MedicationManager from "@/components/MedicationManager";
import { useTranslation } from "react-i18next";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showDocumentScanner, setShowDocumentScanner] = useState(false);
  const [showMedicationManager, setShowMedicationManager] = useState(false);

  const stats = [
    { title: t("dashboard.todaysPatients"), value: "12", icon: Users },
    { title: t("dashboard.appointments"), value: "8", icon: Calendar },
    { title: t("dashboard.pendingReviews"), value: "5", icon: FileText },
    { title: t("dashboard.messages"), value: "3", icon: MessageSquare },
  ];

  const recentAppointments = [
    { name: "Rajesh Kumar", time: "10:00 AM", type: t("dashboard.videoCall") },
    { name: "Priya Sharma", time: "11:30 AM", type: t("dashboard.inPerson") },
    { name: "Amit Patel", time: "2:00 PM", type: t("dashboard.phoneCall") },
  ];

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{t("dashboard.doctorTitle")}</h1>
              <p className="text-muted-foreground">{t("dashboard.doctorSubtitle")}</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        {/* Emergency Banner */}
        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-700 font-medium">{t("dashboard.emergencyAlerts")}</span>
            </div>
            <Button variant="destructive" size="sm">
              {t("dashboard.viewAll")}
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-none shadow-sm mb-8">
          <CardHeader>
            <CardTitle>{t("dashboard.quickActions")}</CardTitle>
            <CardDescription>{t("dashboard.frequentlyUsed")}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex-col gap-2 bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70"
              onClick={() => setShowVideoCall(true)}
            >
              <Video className="h-6 w-6" />
              {t("dashboard.startVideoCall")}
            </Button>
            <Button 
              variant="secondary" 
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
              <FileImage className="h-6 w-6" />
              {t("dashboard.scanDocument")}
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setShowMedicationManager(true)}
            >
              <Plus className="h-6 w-6" />
              {t("dashboard.manageMedications")}
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient Queue */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {t("dashboard.todaysAppointments")}
              </CardTitle>
              <CardDescription>{t("dashboard.scheduledConsultations")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.name}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {appointment.type}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => setShowVideoCall(true)}>
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {t("dashboard.addNewAppointment")}
              </Button>
            </CardContent>
          </Card>

          {/* Practice Management */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>{t("dashboard.practiceManagement")}</CardTitle>
              <CardDescription>{t("dashboard.manageYourPractice")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start h-12">
                <Users className="h-5 w-5 mr-3" />
                {t("dashboard.patientRecords")}
              </Button>
              <Button variant="outline" className="w-full justify-start h-12">
                <FileText className="h-5 w-5 mr-3" />
                {t("dashboard.prescriptions")}
              </Button>
              <Button variant="outline" className="w-full justify-start h-12">
                <Search className="h-5 w-5 mr-3" />
                {t("dashboard.labReports")}
              </Button>
              <Button variant="outline" className="w-full justify-start h-12">
                <Bell className="h-5 w-5 mr-3" />
                {t("dashboard.notifications")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border p-2">
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/patients")}>
              <Users className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/appointments")}>
              <Calendar className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/messages")}>
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/notifications")}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;