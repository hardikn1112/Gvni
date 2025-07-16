import { useState } from "react";
import {
  FileText,
  Camera,
  Search,
  Filter,
  Download,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DocumentScanner from "@/components/DocumentScanner";
import BackButton from "@/components/BackButton";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const DocumentsPage = () => {
  const { t } = useTranslation();
  const [showScanner, setShowScanner] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewDoc, setViewDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Blood Test Report",
      date: "2025-05-15",
      type: "Lab Report",
      doctor: "Dr. Ramesh Kumar",
      category: "blood-test",
      fileUrl: "",
    },
    {
      id: 2,
      title: "X-Ray Chest",
      date: "2025-01-10",
      type: "Radiology",
      doctor: "Dr. Sanjiv Singh",
      category: "x-ray",
      fileUrl: "",
    },
    {
      id: 3,
      title: "Prescription - Antibiotics",
      date: "2025-07-08",
      type: "Prescription",
      doctor: "Dr. Bhaskar",
      category: "prescription",
      fileUrl: "",
    },
  ]);

  const [newDoc, setNewDoc] = useState({
    title: "",
    date: "",
    type: "",
    doctor: "",
    category: "",
    fileUrl: "",
  });

  const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this document?");
  if (!confirmDelete) return;
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };


  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showScanner) {
    return <DocumentScanner onClose={() => setShowScanner(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                {t("documents.title")}
              </h1>
              <p className="text-muted-foreground">{t("documents.subtitle")}</p>
            </div>
          </div>
          <LanguageSelector />
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
            <Card
              key={doc.id}
              className="border-none shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.doctor} • {doc.date}
                    </p>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {doc.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.fileUrl ? (
                    <a href={doc.fileUrl} download target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      <Download className="h-4 w-4 opacity-50" />
                    </Button>
                  )}

                  <Button variant="outline" size="sm" onClick={() => setViewDoc(doc)}>
                    {t("documents.view")}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {t("documents.noDocuments")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("documents.noDocumentsDescription")}
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Camera className="h-4 w-4 mr-2" />
              {t("documents.addFirstDocument")}
            </Button>
          </div>
        )}
      </div>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-4">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowScanner(true)}
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div>


      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg space-y-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">{t("documents.addDocument")}</h2>
            <Input
              placeholder="Title"
              value={newDoc.title}
              onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
            />
            <Input
              placeholder="Doctor"
              value={newDoc.doctor}
              onChange={(e) => setNewDoc({ ...newDoc, doctor: e.target.value })}
            />
            <Input
              type="date"
              value={newDoc.date}
              onChange={(e) => setNewDoc({ ...newDoc, date: e.target.value })}
            />
            <Input
              placeholder="Type (e.g., Prescription)"
              value={newDoc.type}
              onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
            />
            <Input
              placeholder="Category"
              value={newDoc.category}
              onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
            />
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const fileURL = URL.createObjectURL(file);
                  setNewDoc({ ...newDoc, fileUrl: fileURL });
                }
              }}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const newId =
                    documents.length > 0
                      ? documents[documents.length - 1].id + 1
                      : 1;
                  setDocuments([...documents, { id: newId, ...newDoc }]);
                  setNewDoc({
                    title: "",
                    date: "",
                    type: "",
                    doctor: "",
                    category: "",
                    fileUrl: "",
                  });
                  setShowAddModal(false);
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewDoc && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-[90%] max-w-2xl relative shadow-lg">
            <button
              onClick={() => setViewDoc(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">{viewDoc.title}</h2>
            {viewDoc.fileUrl ? (
              <iframe src={viewDoc.fileUrl} className="w-full h-[500px]" />
            ) : (
              <p className="text-muted-foreground">No file uploaded</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
