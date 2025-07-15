import { useState } from "react";
import { Camera, Upload, X, Save, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface DocumentScannerProps {
  onClose: () => void;
}

const DocumentScanner = ({ onClose }: DocumentScannerProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'scan' | 'details'>('scan');
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState({
    title: '',
    type: '',
    date: '',
    doctor: '',
    notes: ''
  });

  const handleImageCapture = () => {
    // Simulate image capture
    setScannedImage('/placeholder.svg');
    setStep('details');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScannedImage(e.target?.result as string);
        setStep('details');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would normally save to database
    console.log('Saving document:', { ...documentData, image: scannedImage });
    onClose();
  };

  const documentTypes = [
    'Prescription',
    'Lab Report',
    'X-Ray',
    'MRI Scan',
    'CT Scan',
    'Ultrasound',
    'Medical Certificate',
    'Discharge Summary',
    'Other'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("documents.scanDocument")}</CardTitle>
            <CardDescription>
              {step === 'scan' ? 'Capture or upload your medical document' : 'Add document details'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 'scan' && (
            <>
              {/* Camera Preview Area */}
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                {scannedImage ? (
                  <img src={scannedImage} alt="Scanned document" className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Position document in frame</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleImageCapture} className="h-16 flex-col gap-2">
                  <Camera className="h-6 w-6" />
                  Capture Photo
                </Button>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild variant="outline" className="h-16 flex-col gap-2 w-full">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-6 w-6" />
                      Upload File
                    </label>
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 'details' && (
            <>
              {/* Document Preview */}
              {scannedImage && (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src={scannedImage} alt="Document preview" className="max-h-full max-w-full object-contain" />
                </div>
              )}

              {/* Document Details Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Blood Test Report"
                    value={documentData.title}
                    onChange={(e) => setDocumentData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select value={documentData.type} onValueChange={(value) => setDocumentData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={documentData.date}
                      onChange={(e) => setDocumentData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor/Hospital</Label>
                    <Input
                      id="doctor"
                      placeholder="e.g., Dr. Smith, City Hospital"
                      value={documentData.doctor}
                      onChange={(e) => setDocumentData(prev => ({ ...prev, doctor: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes about this document"
                    value={documentData.notes}
                    onChange={(e) => setDocumentData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('scan')} className="flex-1">
                  Back to Scan
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Document
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentScanner;