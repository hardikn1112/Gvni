import { useState } from "react";
import { Plus, X, Clock, Pill, Bell, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface MedicationManagerProps {
  onClose: () => void;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  reminderEnabled: boolean;
  startDate: string;
  endDate?: string;
}

const MedicationManager = ({ onClose }: MedicationManagerProps) => {
  const { t } = useTranslation();
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'twice-daily',
      times: ['08:00', '20:00'],
      reminderEnabled: true,
      startDate: '2024-01-15',
      endDate: '2024-01-20'
    },
    {
      id: '2',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'once-daily',
      times: ['09:00'],
      reminderEnabled: true,
      startDate: '2024-01-01'
    }
  ]);

  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: '',
    dosage: '',
    frequency: '',
    times: [],
    reminderEnabled: true,
    startDate: new Date().toISOString().split('T')[0]
  });

  const frequencyOptions = [
    { value: 'once-daily', label: 'Once Daily', times: 1 },
    { value: 'twice-daily', label: 'Twice Daily', times: 2 },
    { value: 'three-times', label: 'Three Times Daily', times: 3 },
    { value: 'four-times', label: 'Four Times Daily', times: 4 },
    { value: 'as-needed', label: 'As Needed', times: 0 }
  ];

  const generateTimeSlots = (frequency: string) => {
    const option = frequencyOptions.find(opt => opt.value === frequency);
    if (!option || option.times === 0) return [];

    const times = [];
    const interval = 24 / option.times;
    
    for (let i = 0; i < option.times; i++) {
      const hour = Math.floor(8 + (i * interval)); // Start from 8 AM
      times.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    
    return times;
  };

  const handleFrequencyChange = (frequency: string) => {
    const times = generateTimeSlots(frequency);
    setNewMedication(prev => ({ ...prev, frequency, times }));
  };

  const handleTimeChange = (index: number, time: string) => {
    const updatedTimes = [...(newMedication.times || [])];
    updatedTimes[index] = time;
    setNewMedication(prev => ({ ...prev, times: updatedTimes }));
  };

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMedication.name,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency,
        times: newMedication.times || [],
        reminderEnabled: newMedication.reminderEnabled || true,
        startDate: newMedication.startDate || new Date().toISOString().split('T')[0],
        endDate: newMedication.endDate
      };
      
      setMedications(prev => [...prev, medication]);
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        times: [],
        reminderEnabled: true,
        startDate: new Date().toISOString().split('T')[0]
      });
      setView('list');
    }
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  const getNextDose = (times: string[]) => {
    if (times.length === 0) return null;
    
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const nextTime = times.find(time => time > currentTime) || times[0];
    return nextTime;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("dashboard.manageMedications")}</CardTitle>
            <CardDescription>
              {view === 'list' ? 'Manage your medication schedule' : 'Add new medication'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {view === 'list' && (
            <>
              {/* Add Button */}
              <Button onClick={() => setView('add')} className="w-full h-12">
                <Plus className="h-4 w-4 mr-2" />
                Add New Medication
              </Button>

              {/* Medications List */}
              <div className="space-y-4">
                {medications.map((medication) => (
                  <Card key={medication.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Pill className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">{medication.name}</h3>
                            <Badge variant="secondary">{medication.dosage}</Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-2">
                            <p>{frequencyOptions.find(opt => opt.value === medication.frequency)?.label}</p>
                            <p>Times: {medication.times.join(', ')}</p>
                            {getNextDose(medication.times) && (
                              <p className="text-primary font-medium">
                                Next dose: {getNextDose(medication.times)}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>From: {medication.startDate}</span>
                            {medication.endDate && <span>To: {medication.endDate}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Bell className={`h-4 w-4 ${medication.reminderEnabled ? 'text-primary' : 'text-gray-400'}`} />
                            <Switch 
                              checked={medication.reminderEnabled}
                              onCheckedChange={(checked) => {
                                setMedications(prev => prev.map(med => 
                                  med.id === medication.id ? { ...med, reminderEnabled: checked } : med
                                ));
                              }}
                            />
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteMedication(medication.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {medications.length === 0 && (
                  <div className="text-center py-8">
                    <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No medications added yet</p>
                  </div>
                )}
              </div>
            </>
          )}

          {view === 'add' && (
            <>
              {/* Add Medication Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="med-name">Medication Name</Label>
                  <Input
                    id="med-name"
                    placeholder="e.g., Paracetamol"
                    value={newMedication.name || ''}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    placeholder="e.g., 500mg, 1 tablet"
                    value={newMedication.dosage || ''}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={newMedication.frequency} onValueChange={handleFrequencyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slots */}
                {newMedication.frequency && newMedication.frequency !== 'as-needed' && (
                  <div className="space-y-2">
                    <Label>Medication Times</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {newMedication.times?.map((time, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Input
                            type="time"
                            value={time}
                            onChange={(e) => handleTimeChange(index, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={newMedication.startDate || ''}
                      onChange={(e) => setNewMedication(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date (Optional)</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={newMedication.endDate || ''}
                      onChange={(e) => setNewMedication(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="reminder"
                      checked={newMedication.reminderEnabled || true}
                      onCheckedChange={(checked) => setNewMedication(prev => ({ ...prev, reminderEnabled: checked }))}
                    />
                    <Label htmlFor="reminder">Enable Reminders</Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setView('list')} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddMedication} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationManager;