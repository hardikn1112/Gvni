import { useState } from "react";
import { ArrowLeft, Stethoscope, Lock, Phone, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const DoctorAuth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    abhaId: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    location: '',
    credentials: '',
    experience: '',
    qualifications: ''
  });

  const specializations = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Surgery',
    'Urology',
    'Gynecology',
    'Ophthalmology',
    'ENT',
    'Anesthesiology',
    'Emergency Medicine',
    'Family Medicine'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally validate and submit to backend
    console.log('Doctor auth data:', formData);
    navigate('/doctor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                {mode === 'login' ? t("auth.loginTitle") : t("auth.registerTitle")}
              </h1>
              <p className="text-muted-foreground">Healthcare Provider Portal</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              {mode === 'login' ? 'Doctor Login' : 'Doctor Registration'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? 'Access your practice dashboard' 
                : 'Join our healthcare provider network'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Credentials */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="abhaId">{t("auth.abhaId")}</Label>
                  <Input
                    id="abhaId"
                    placeholder="Enter your ABHA ID"
                    value={formData.abhaId}
                    onChange={(e) => handleInputChange('abhaId', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Registration Fields */}
              {mode === 'register' && (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                      <Input
                        id="fullName"
                        placeholder="Dr. Your Full Name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("auth.email")}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="doctor@hospital.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("auth.phone")}</Label>
                        <Input
                          id="phone"
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Professional Information
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialization">{t("auth.specialization")}</Label>
                        <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            {specializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">{t("auth.location")}</Label>
                        <Input
                          id="location"
                          placeholder="Hospital/Clinic Name, City"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="credentials">{t("auth.credentials")}</Label>
                        <Input
                          id="credentials"
                          placeholder="Medical License Number"
                          value={formData.credentials}
                          onChange={(e) => handleInputChange('credentials', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="5"
                          value={formData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="qualifications">Qualifications</Label>
                        <Textarea
                          id="qualifications"
                          placeholder="MBBS, MD, Specialization details"
                          value={formData.qualifications}
                          onChange={(e) => handleInputChange('qualifications', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Verification Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-blue-800">Verification Required</p>
                        <p className="text-blue-700">
                          Your account will be verified within 24-48 hours after registration. 
                          You'll receive confirmation via email once approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full h-12">
                {mode === 'login' ? t("auth.login") : t("auth.register")}
              </Button>

              {/* Toggle Mode */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === 'login' ? t("auth.noAccount") : t("auth.hasAccount")}
                </p>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="p-0 h-auto"
                >
                  {mode === 'login' ? t("auth.signUp") : t("auth.signIn")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorAuth;