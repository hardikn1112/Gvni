import { useState } from "react";
import { FileText, Calendar, Camera, Search, Filter, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import DocumentScanner from "@/components/DocumentScanner";
import BackButton from "@/components/BackButton";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const DocumentsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showScanner, setShowScanner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: 1,
      title: "Blood Test Report",
      date: "2024-01-15",
      type: "Lab Report",
      doctor: "Dr. Smith",
      category: "blood-test"
    },
    {
      id: 2,
      title: "X-Ray Chest",
      date: "2024-01-10",
      type: "Radiology",
      doctor: "Dr. Johnson",
      category: "x-ray"
    },
    {
      id: 3,
      title: "Prescription - Antibiotics",
      date: "2024-01-08",
      type: "Prescription",
      doctor: "Dr. Brown",
      category: "prescription"
    }
  ];

  if (showScanner) {
    return <DocumentScanner onClose={() => setShowScanner(false)} />;
  }

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{t("documents.title")}</h1>
              <p className="text-muted-foreground">{t("documents.subtitle")}</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button 
            className="h-20 flex-col gap-2" 
            onClick={() => setShowScanner(true)}
          >
            <Camera className="h-6 w-6" />
            {t("documents.scanDocument")}
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <FileText className="h-6 w-6" />
            {t("documents.uploadDocument")}
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder={t("documents.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">{doc.doctor} • {doc.date}</p>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">{doc.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("documents.view")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t("documents.noDocuments")}</h3>
            <p className="text-muted-foreground mb-4">{t("documents.noDocumentsDescription")}</p>
            <Button onClick={() => setShowScanner(true)}>
              <Camera className="h-4 w-4 mr-2" />
              {t("documents.addFirstDocument")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;