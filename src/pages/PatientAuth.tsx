import { useState } from "react";
import { ArrowLeft, User, Lock, Phone, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const PatientAuth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    abhaId: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    height: '',
    weight: '',
    bloodGroup: '',
    allergies: '',
    conditions: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally validate and submit to backend
    console.log('Patient auth data:', formData);
    navigate('/patient/dashboard');
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
              <p className="text-muted-foreground">Patient Portal</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <User className="h-6 w-6 text-primary" />
              {mode === 'login' ? 'Patient Login' : 'Patient Registration'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? 'Access your health dashboard' 
                : 'Create your patient account'}
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
                        placeholder="Enter your full name"
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
                          placeholder="your.email@example.com"
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

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">{t("auth.emergencyContact")}</Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Emergency contact number"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Medical Information
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="height">{t("auth.height")}</Label>
                          <Input
                            id="height"
                            placeholder="170"
                            value={formData.height}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="weight">{t("auth.weight")}</Label>
                          <Input
                            id="weight"
                            placeholder="70"
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bloodGroup">{t("auth.bloodGroup")}</Label>
                          <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {bloodGroups.map((group) => (
                                <SelectItem key={group} value={group}>{group}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="allergies">{t("auth.allergies")}</Label>
                        <Textarea
                          id="allergies"
                          placeholder="List any allergies (e.g., penicillin, peanuts)"
                          value={formData.allergies}
                          onChange={(e) => handleInputChange('allergies', e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="conditions">{t("auth.conditions")}</Label>
                        <Textarea
                          id="conditions"
                          placeholder="List any chronic conditions (e.g., diabetes, hypertension)"
                          value={formData.conditions}
                          onChange={(e) => handleInputChange('conditions', e.target.value)}
                          rows={2}
                        />
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

export default PatientAuth;