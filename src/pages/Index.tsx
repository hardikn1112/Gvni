import { ArrowRight, Users, Stethoscope, Heart, Shield, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600">U - Unified Care</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">U - Unified Care</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Complete Healthcare Management System
        </p>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <Card className="border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Patient Login</CardTitle>
              <CardDescription className="text-gray-600">Access your health dashboard and manage your family's health</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/patient/auth')}>
                Continue as Patient
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Doctor Login</CardTitle>
              <CardDescription className="text-gray-600">Manage your practice and provide quality healthcare</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50" onClick={() => navigate('/doctor/auth')}>
                Continue as Doctor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Emergency SOS</h3>
            <p className="text-sm text-gray-600">One-touch emergency response with instant location sharing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Multilingual Support</h3>
            <p className="text-sm text-gray-600">Available in 6+ Indian languages for better accessibility</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Secure & Private</h3>
            <p className="text-sm text-gray-600">End-to-end encrypted health data with HIPAA compliance</p>
          </div>
        </div>

        {/* Quick Demo Access */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Want to explore the features?</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/patient/dashboard')} className="border-blue-600 text-blue-600 hover:bg-blue-50">
              View Patient Demo
            </Button>
            <Button variant="outline" onClick={() => navigate('/doctor/dashboard')} className="border-green-600 text-green-600 hover:bg-green-50">
              View Doctor Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
