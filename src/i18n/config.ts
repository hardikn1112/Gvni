import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      common: {
        back: "Back",
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        continue: "Continue",
        select: "Select",
        search: "Search",
        viewAll: "View All"
      },
      auth: {
        welcome: "Welcome to",
        subtitle: "Complete Healthcare Management System",
        selectLogin: "Please select your login type",
        patientLogin: "Patient Login",
        doctorLogin: "Doctor Login",
        loginTitle: "Login to Your Account",
        registerTitle: "Create New Account",
        abhaId: "ABHA ID",
        password: "Password",
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number",
        emergencyContact: "Emergency Contact",
        height: "Height (cm)",
        weight: "Weight (kg)",
        bloodGroup: "Blood Group",
        allergies: "Allergies",
        conditions: "Medical Conditions",
        specialization: "Specialization",
        location: "Practice Location",
        credentials: "Medical License",
        register: "Register",
        login: "Login",
        hasAccount: "Already have an account?",
        noAccount: "Don't have an account?",
        signIn: "Sign In",
        signUp: "Sign Up"
      },
      dashboard: {
        welcome: "Welcome back",
        emergencyCall: "Emergency Call",
        familyHealth: "Family Health",
        aiSuggestions: "AI Health Suggestions",
        appointments: "Appointments",
        quickActions: "Quick Actions",
        scheduleAppointment: "Schedule Appointment",
        logSymptoms: "Log Symptoms",
        viewRecords: "View Medical Records",
        medication: "Medication Reminders",
        familyOverview: "Family Health Overview",
        addMember: "Add Family Member",
        emergencyContacts: "Emergency Contacts",
        todaysPatients: "Today's Patients",
        pendingReviews: "Pending Reviews",
        messages: "Messages",
        doctorTitle: "Doctor Dashboard",
        doctorSubtitle: "Manage your practice and patients efficiently",
        emergencyAlerts: "Emergency Patient Alerts",
        frequentlyUsed: "Frequently used features",
        startVideoCall: "Start Video Call",
        scanDocument: "Scan Document",
        manageMedications: "Manage Medications",
        todaysAppointments: "Today's Appointments",
        scheduledConsultations: "Your scheduled consultations",
        addNewAppointment: "Add New Appointment",
        practiceManagement: "Practice Management",
        manageYourPractice: "Manage your practice efficiently",
        patientRecords: "Patient Records",
        prescriptions: "Prescriptions",
        labReports: "Lab Reports",
        notifications: "Notifications",
        videoCall: "Video Call",
        inPerson: "In-Person",
        phoneCall: "Phone Call"
      },
      family: {
        member: "Family Member",
        relationship: "Relationship",
        access: "Access Level",
        fullAccess: "Full Access",
        limitedAccess: "Limited Access",
        viewOnly: "View Only",
        emergencyContact: "Emergency Contact",
        addMember: "Add Member",
        healthStatus: "Health Status",
        lastCheckup: "Last Checkup",
        upcomingAppointments: "Upcoming"
      },
      documents: {
        title: "Medical Documents",
        subtitle: "Manage your medical records and documents",
        scanDocument: "Scan Document",
        uploadDocument: "Upload Document",
        searchPlaceholder: "Search documents...",
        view: "View",
        noDocuments: "No Documents Found",
        noDocumentsDescription: "Start by adding your first medical document",
        addFirstDocument: "Add First Document"
      },
      sos: {
        emergency: "EMERGENCY",
        calling: "Calling Emergency Services...",
        countdown: "Emergency call in",
        cancel: "Cancel",
        locationSharing: "Sharing your location",
        medicalInfo: "Broadcasting medical information",
        calling108: "Calling 108 (Ambulance)",
        callingEmergencyContact: "Calling Emergency Contact",
        selectEmergencyType: "Select Emergency Type",
        medicalEmergency: "Medical Emergency",
        accident: "Accident",
        heartAttack: "Heart Attack",
        stroke: "Stroke",
        breathing: "Breathing Difficulty",
        other: "Other Emergency"
      }
    }
  },
  hi: {
    translation: {
      common: {
        back: "वापस",
        save: "सेव करें",
        cancel: "रद्द करें",
        close: "बंद करें",
        continue: "जारी रखें",
        select: "चुनें",
        search: "खोजें",
        viewAll: "सभी देखें"
      },
      auth: {
        welcome: "स्वागत है",
        subtitle: "संपूर्ण स्वास्थ्य प्रबंधन प्रणाली",
        selectLogin: "कृपया अपना लॉगिन प्रकार चुनें",
        patientLogin: "मरीज लॉगिन",
        doctorLogin: "डॉक्टर लॉगिन",
        loginTitle: "अपने खाते में लॉगिन करें",
        registerTitle: "नया खाता बनाएं",
        abhaId: "आभा आईडी",
        password: "पासवर्ड",
        fullName: "पूरा नाम",
        email: "ईमेल",
        phone: "फोन नंबर",
        emergencyContact: "आपातकालीन संपर्क",
        height: "ऊंचाई (सेमी)",
        weight: "वजन (किग्रा)",
        bloodGroup: "रक्त समूह",
        allergies: "एलर्जी",
        conditions: "चिकित्सा स्थितियां",
        specialization: "विशेषज्ञता",
        location: "प्रैक्टिस स्थान",
        credentials: "मेडिकल लाइसेंस",
        register: "पंजीकरण",
        login: "लॉगिन",
        hasAccount: "पहले से खाता है?",
        noAccount: "खाता नहीं है?",
        signIn: "साइन इन",
        signUp: "साइन अप"
      },
      dashboard: {
        welcome: "वापसी पर स्वागत",
        emergencyCall: "आपातकालीन कॉल",
        familyHealth: "पारिवारिक स्वास्थ्य",
        aiSuggestions: "एआई स्वास्थ्य सुझाव",
        appointments: "अपॉइंटमेंट",
        quickActions: "त्वरित कार्य",
        scheduleAppointment: "अपॉइंटमेंट शेड्यूल करें",
        logSymptoms: "लक्षण दर्ज करें",
        viewRecords: "मेडिकल रिकॉर्ड देखें",
        medication: "दवा रिमाइंडर",
        familyOverview: "पारिवारिक स्वास्थ्य अवलोकन",
        addMember: "सदस्य जोड़ें",
        emergencyContacts: "आपातकालीन संपर्क",
        todaysPatients: "आज के मरीज",
        pendingReviews: "लंबित समीक्षा",
        messages: "संदेश",
        doctorTitle: "डॉक्टर डैशबोर्ड",
        doctorSubtitle: "अपनी प्रैक्टिस और मरीजों को कुशलता से प्रबंधित करें",
        emergencyAlerts: "आपातकालीन मरीज अलर्ट",
        frequentlyUsed: "अक्सर उपयोग की जाने वाली सुविधाएं",
        startVideoCall: "वीडियो कॉल शुरू करें",
        scanDocument: "दस्तावेज़ स्कैन करें",
        manageMedications: "दवाएं प्रबंधित करें",
        todaysAppointments: "आज के अपॉइंटमेंट",
        scheduledConsultations: "आपके शेड्यूल किए गए परामर्श",
        addNewAppointment: "नया अपॉइंटमेंट जोड़ें",
        practiceManagement: "प्रैक्टिस प्रबंधन",
        manageYourPractice: "अपनी प्रैक्टिस को कुशलता से प्रबंधित करें",
        patientRecords: "मरीज रिकॉर्ड",
        prescriptions: "नुस्खे",
        labReports: "लैब रिपोर्ट",
        notifications: "सूचनाएं",
        videoCall: "वीडियो कॉल",
        inPerson: "व्यक्तिगत",
        phoneCall: "फोन कॉल"
      },
      family: {
        member: "परिवारिक सदस्य",
        relationship: "रिश्ता",
        access: "पहुंच स्तर",
        fullAccess: "पूर्ण पहुंच",
        limitedAccess: "सीमित पहुंच",
        viewOnly: "केवल देखें",
        emergencyContact: "आपातकालीन संपर्क",
        addMember: "सदस्य जोड़ें",
        healthStatus: "स्वास्थ्य स्थिति",
        lastCheckup: "अंतिम जांच",
        upcomingAppointments: "आगामी"
      },
      documents: {
        title: "चिकित्सा दस्तावेज़",
        subtitle: "अपने मेडिकल रिकॉर्ड और दस्तावेज़ों का प्रबंधन करें",
        scanDocument: "दस्तावेज़ स्कैन करें",
        uploadDocument: "दस्तावेज़ अपलोड करें",
        searchPlaceholder: "दस्तावेज़ खोजें...",
        view: "देखें",
        noDocuments: "कोई दस्तावेज़ नहीं मिला",
        noDocumentsDescription: "अपना पहला मेडिकल दस्तावेज़ जोड़कर शुरुआत करें",
        addFirstDocument: "पहला दस्तावेज़ जोड़ें"
      },
      sos: {
        emergency: "आपातकाल",
        calling: "आपातकालीन सेवाओं को कॉल कर रहे हैं...",
        countdown: "आपातकालीन कॉल में",
        cancel: "रद्द करें",
        locationSharing: "आपका स्थान साझा कर रहे हैं",
        medicalInfo: "चिकित्सा जानकारी प्रसारित कर रहे हैं",
        calling108: "108 (एम्बुलेंस) को कॉल कर रहे हैं",
        callingEmergencyContact: "आपातकालीन संपर्क को कॉल कर रहे हैं",
        selectEmergencyType: "आपातकाल का प्रकार चुनें",
        medicalEmergency: "चिकित्सा आपातकाल",
        accident: "दुर्घटना",
        heartAttack: "दिल का दौरा",
        stroke: "स्ट्रोक",
        breathing: "सांस लेने में कठिनाई",
        other: "अन्य आपातकाल"
      }
    }
  },
  bn: {
    translation: {
      common: {
        back: "ফিরে যান",
        save: "সংরক্ষণ করুন",
        cancel: "বাতিল করুন",
        close: "বন্ধ করুন",
        continue: "চালিয়ে যান",
        select: "নির্বাচন করুন",
        search: "অনুসন্ধান করুন",
        viewAll: "সব দেখুন"
      },
      auth: {
        welcome: "স্বাগতম",
        subtitle: "সম্পূর্ণ স্বাস্থ্যসেবা ব্যবস্থাপনা সিস্টেম",
        patientLogin: "রোগীর লগইন",
        doctorLogin: "ডাক্তারের লগইন"
      }
    }
  },
  te: {
    translation: {
      common: {
        back: "వెనుకకు",
        save: "సేవ్ చేయండి",
        cancel: "రద్దు చేయండి"
      },
      auth: {
        welcome: "స్వాగతం",
        subtitle: "పూర్తి ఆరోగ్య నిర్వహణ వ్యవస్థ",
        patientLogin: "రోగి లాగిన్",
        doctorLogin: "వైద్యుడు లాగిన్"
      }
    }
  },
  ta: {
    translation: {
      common: {
        back: "திரும்பு",
        save: "சேமிக்கவும்",
        cancel: "ரத்து செய்"
      },
      auth: {
        welcome: "வரவேற்கிறோம்",
        subtitle: "முழுமையான சுகாதார மேலாண்மை அமைப்பு",
        patientLogin: "நோயாளி உள்நுழைவு",
        doctorLogin: "மருத்துவர் உள்நுழைவு"
      }
    }
  },
  mr: {
    translation: {
      common: {
        back: "परत जा",
        save: "जतन करा",
        cancel: "रद्द करा"
      },
      auth: {
        welcome: "स्वागत आहे",
        subtitle: "संपूर्ण आरोग्य व्यवस्थापन प्रणाली",
        patientLogin: "रुग्ण लॉगिन",
        doctorLogin: "डॉक्टर लॉगिन"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // Enable debugging in development
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;