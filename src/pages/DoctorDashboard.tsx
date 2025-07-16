import { useState } from "react";
import { Calendar, FileText, MessageSquare, Users, Video, Clock, Bell, User, Phone, Settings, ArrowLeft, Plus, Search, FileImage, ChevronDown, ChevronUp, Stethoscope, Activity, Pill } from "lucide-react";

// Mock translation function
const t = (key) => {
  const translations = {
    "dashboard.doctorTitle": "Doctor Dashboard",
    "dashboard.doctorSubtitle": "Manage your practice efficiently",
    "dashboard.emergencyAlerts": "Emergency Alerts",
    "dashboard.viewAll": "View All",
    "dashboard.todaysPatients": "Today's Patients",
    "dashboard.appointments": "Appointments",
    "dashboard.pendingReviews": "Pending Reviews",
    "dashboard.messages": "Messages",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.frequentlyUsed": "Frequently used tools",
    "dashboard.startVideoCall": "Start Video Call",
    "dashboard.scheduleAppointment": "Schedule Appointment",
    "dashboard.scanDocument": "Scan Document",
    "dashboard.manageMedications": "Manage Medications",
    "dashboard.practiceManagement": "Practice Management",
    "dashboard.manageYourPractice": "Manage your practice effectively"
  };
  return translations[key] || key;
};

// Mock components
const Button = ({ children, className = "", onClick, variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Mock navigation function
const navigate = (path) => {
  console.log(`Navigating to: ${path}`);
};

// Mock components that would normally be imported
const LanguageSelector = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-muted-foreground">EN</span>
  </div>
);

const BackButton = () => (
  <Button variant="ghost" size="icon">
    <ArrowLeft className="h-4 w-4" />
  </Button>
);

const VideoCall = ({ onEnd }) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white text-center">
      <h2 className="text-2xl mb-4">Video Call Active</h2>
      <Button onClick={onEnd} variant="destructive">End Call</Button>
    </div>
  </div>
);

const DocumentScanner = ({ onClose }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg text-center">
      <h2 className="text-2xl mb-4">Document Scanner</h2>
      <Button onClick={onClose}>Close Scanner</Button>
    </div>
  </div>
);

const MedicationManager = ({ onClose }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg text-center">
      <h2 className="text-2xl mb-4">Medication Manager</h2>
      <Button onClick={onClose}>Close Manager</Button>
    </div>
  </div>
);

const DoctorDashboard = () => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showDocumentScanner, setShowDocumentScanner] = useState(false);
  const [showMedicationManager, setShowMedicationManager] = useState(false);
  const [expandedPatients, setExpandedPatients] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const stats = [
    { title: t("dashboard.todaysPatients"), value: "12", icon: Users },
    { title: t("dashboard.appointments"), value: "8", icon: Calendar },
    { title: t("dashboard.pendingReviews"), value: "5", icon: FileText },
    { title: t("dashboard.messages"), value: "3", icon: MessageSquare },
  ];

  const patients = [
    { id: 1, name: "Rajesh Kumar", age: 45, condition: "Diabetes", time: "10:00 AM", status: "waiting" },
    { id: 2, name: "Priya Sharma", age: 32, condition: "Hypertension", time: "10:30 AM", status: "in-progress" },
    { id: 3, name: "Amit Patel", age: 28, condition: "Fever", time: "11:00 AM", status: "completed" },
    { id: 4, name: "Sunita Gupta", age: 55, condition: "Arthritis", time: "11:30 AM", status: "waiting" },
    { id: 5, name: "Ravi Singh", age: 40, condition: "Chest Pain", time: "12:00 PM", status: "urgent" },
    { id: 6, name: "Meera Jain", age: 38, condition: "Headache", time: "12:30 PM", status: "waiting" },
    { id: 7, name: "Suresh Yadav", age: 50, condition: "Back Pain", time: "1:00 PM", status: "waiting" },
    { id: 8, name: "Kavita Reddy", age: 42, condition: "Skin Allergy", time: "1:30 PM", status: "waiting" },
    { id: 9, name: "Deepak Sharma", age: 35, condition: "Cough", time: "2:00 PM", status: "waiting" },
    { id: 10, name: "Anita Mehta", age: 48, condition: "Joint Pain", time: "2:30 PM", status: "waiting" },
    { id: 11, name: "Vikram Joshi", age: 52, condition: "High BP", time: "3:00 PM", status: "waiting" },
    { id: 12, name: "Rekha Agarwal", age: 60, condition: "Diabetes", time: "3:30 PM", status: "waiting" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "urgent": return "bg-red-100 text-red-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handlePracticeAction = (action) => {
    switch (action) {
      case "patients":
        navigate("/patients");
        break;
      case "prescriptions":
        navigate("/prescriptions");
        break;
      case "lab-reports":
        navigate("/lab-reports");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{t("dashboard.doctorTitle")}</h1>
              <p className="text-gray-600">{t("dashboard.doctorSubtitle")}</p>
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
            <Card 
              key={index} 
              className={`shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                index === 0 ? 'ring-2 ring-blue-200' : ''
              }`}
              onClick={() => index === 0 && setExpandedPatients(!expandedPatients)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-blue-600" />
                  {index === 0 && (
                    expandedPatients ? 
                    <ChevronUp className="h-4 w-4 text-blue-600" /> : 
                    <ChevronDown className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expanded Patients List */}
        {expandedPatients && (
          <Card className="shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Today's Patients
              </CardTitle>
              <CardDescription>Click on a patient to view quick actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedPatient?.id === patient.id ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => handlePatientClick(patient)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{patient.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Age: {patient.age} | Condition: {patient.condition}</p>
                      <p>Time: {patient.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions - Show when patient is selected */}
        {selectedPatient && (
          <Card className="shadow-sm mb-8 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Quick Actions for {selectedPatient.name}
              </CardTitle>
              <CardDescription>Available actions for this patient</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
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
                <Pill className="h-6 w-6" />
                {t("dashboard.manageMedications")}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Default Quick Actions - Show when no patient is selected */}
        {!selectedPatient && (
          <Card className="shadow-sm mb-8">
            <CardHeader>
              <CardTitle>{t("dashboard.quickActions")}</CardTitle>
              <CardDescription>{t("dashboard.frequentlyUsed")}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
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
        )}

        {/* Practice Management - Now Functional */}
        <Card className="shadow-sm mb-20">
          <CardHeader>
            <CardTitle>{t("dashboard.practiceManagement")}</CardTitle>
            <CardDescription>{t("dashboard.manageYourPractice")}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 hover:bg-blue-50"
              onClick={() => handlePracticeAction("patients")}
            >
              <Users className="h-6 w-6 mr-4 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Patient Records</p>
                <p className="text-sm text-gray-600">View and manage patient information</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 hover:bg-blue-50"
              onClick={() => handlePracticeAction("prescriptions")}
            >
              <FileText className="h-6 w-6 mr-4 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Prescriptions</p>
                <p className="text-sm text-gray-600">Manage and track prescriptions</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 hover:bg-blue-50"
              onClick={() => handlePracticeAction("lab-reports")}
            >
              <Activity className="h-6 w-6 mr-4 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Lab Reports</p>
                <p className="text-sm text-gray-600">View test results and reports</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 hover:bg-blue-50"
              onClick={() => handlePracticeAction("notifications")}
            >
              <Bell className="h-6 w-6 mr-4 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-gray-600">View alerts and reminders</p>
              </div>
            </Button>
          </CardContent>
        </Card>

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