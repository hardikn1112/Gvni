import { useState, useEffect } from "react";
import { Phone, X, MapPin, Heart, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface SOSEmergencyProps {
  onClose: () => void;
}

const SOSEmergency = ({ onClose }: SOSEmergencyProps) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState<'selection' | 'countdown' | 'calling'>('selection');
  const [emergencyType, setEmergencyType] = useState<string>('');

  const emergencyTypes = [
    { type: 'medical', label: t("sos.medicalEmergency"), icon: Heart, color: "bg-red-500" },
    { type: 'accident', label: t("sos.accident"), icon: AlertTriangle, color: "bg-orange-500" },
    { type: 'heart-attack', label: t("sos.heartAttack"), icon: Heart, color: "bg-red-600" },
    { type: 'stroke', label: t("sos.stroke"), icon: AlertTriangle, color: "bg-purple-500" },
    { type: 'breathing', label: t("sos.breathing"), icon: Heart, color: "bg-blue-500" },
    { type: 'other', label: t("sos.other"), icon: Phone, color: "bg-gray-500" }
  ];

  useEffect(() => {
    if (phase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'countdown' && countdown === 0) {
      setPhase('calling');
    }
  }, [countdown, phase]);

  const handleEmergencySelect = (type: string) => {
    setEmergencyType(type);
    setPhase('countdown');
  };

  const handleCancel = () => {
    setPhase('selection');
    setCountdown(3);
    setEmergencyType('');
  };

  const handleCall = () => {
    // Simulate emergency call
    console.log('Emergency call initiated:', emergencyType);
    // In a real app, this would trigger actual emergency services
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-red-900/20 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-red-200 shadow-2xl">
        {phase === 'selection' && (
          <>
            <CardHeader className="text-center bg-red-50">
              <CardTitle className="text-red-700 text-2xl">{t("sos.emergency")}</CardTitle>
              <CardDescription className="text-red-600">
                {t("sos.selectEmergencyType")}
              </CardDescription>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {emergencyTypes.map((emergency) => (
                  <Button
                    key={emergency.type}
                    variant="outline"
                    className="h-20 flex-col gap-2 border-2 hover:border-red-400"
                    onClick={() => handleEmergencySelect(emergency.type)}
                  >
                    <emergency.icon className={`h-6 w-6 text-white p-1 rounded ${emergency.color}`} />
                    <span className="text-xs text-center">{emergency.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </>
        )}

        {phase === 'countdown' && (
          <>
            <CardHeader className="text-center bg-red-50">
              <CardTitle className="text-red-700 text-2xl">{t("sos.emergency")}</CardTitle>
              <CardDescription className="text-red-600">
                {t("sos.countdown")} {countdown} {countdown === 1 ? 'second' : 'seconds'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-white text-3xl font-bold">{countdown}</span>
                </div>
                <p className="text-lg font-semibold mb-2">
                  {emergencyTypes.find(e => e.type === emergencyType)?.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("sos.calling")}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
              >
                {t("sos.cancel")}
              </Button>
            </CardContent>
          </>
        )}

        {phase === 'calling' && (
          <>
            <CardHeader className="text-center bg-red-50">
              <CardTitle className="text-red-700 text-2xl">{t("sos.emergency")}</CardTitle>
              <CardDescription className="text-red-600">
                Connecting to emergency services...
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Location Sharing */}
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">{t("sos.locationSharing")}</p>
                    <p className="text-xs text-green-600">GPS coordinates sent</p>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">{t("sos.medicalInfo")}</p>
                    <p className="text-xs text-blue-600">Blood type: O+, Allergies: None</p>
                  </div>
                </div>

                {/* Emergency Call Status */}
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <Phone className="h-5 w-5 text-red-600 animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-red-800">{t("sos.calling108")}</p>
                    <p className="text-xs text-red-600">Connecting...</p>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">{t("sos.callingEmergencyContact")}</p>
                    <p className="text-xs text-orange-600">Notifying family member</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={handleCall} className="w-full bg-red-600 hover:bg-red-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default SOSEmergency;