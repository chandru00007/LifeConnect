import React, { useState } from 'react';
import { Card, Button, Badge } from './common/ui';
import { DonorProfile, RecipientCase, Organ, BloodType, Urgency, UserRole } from '../types';
import { MapPinIcon, CheckCircleIcon } from '../constants';

const mockDonors: DonorProfile[] = [
    { id: 'd1', name: 'Priya Patel', age: 32, bloodType: BloodType.APos, location: '5km away', isVerified: true, profilePicUrl: 'https://picsum.photos/id/1027/100', organs: [Organ.KIDNEY, Organ.CORNEAS], isAvailable: true, donationHistory: [] , role: UserRole.DONOR, aadhar: '', medicalInfo: { hlaData: 'A*01, B*08' } },
    { id: 'd2', name: 'Vikram Singh', age: 45, bloodType: BloodType.ANeg, location: '12km away', isVerified: true, profilePicUrl: 'https://picsum.photos/id/1005/100', organs: [Organ.KIDNEY, Organ.LIVER], isAvailable: true, donationHistory: [], role: UserRole.DONOR, aadhar: '', medicalInfo: undefined },
    { id: 'd4', name: 'Arjun Kumar', age: 29, bloodType: BloodType.OPos, location: '8km away', isVerified: true, profilePicUrl: 'https://picsum.photos/id/1006/100', organs: [Organ.HEART, Organ.LUNGS], isAvailable: true, donationHistory: [], role: UserRole.DONOR, aadhar: '', medicalInfo: { height: 180, weight: 80, medicalHistory: 'Healthy, non-smoker.'} },
];

const mockCases: RecipientCase[] = [
    { id: 'c1', patientName: 'Aisha Khan', age: 42, bloodType: BloodType.APos, organNeeded: Organ.KIDNEY, urgency: Urgency.CRITICAL, hospitalId: 'h1', hospitalName: 'Fortis Hospital', location: 'Delhi', medicalDocs:[], status: 'Accepted', matchScore: 95 },
    { id: 'c2', patientName: 'Sameer Verma', age: 58, bloodType: BloodType.BPos, organNeeded: Organ.LIVER, urgency: Urgency.HIGH, hospitalId: 'h1', hospitalName: 'Fortis Hospital', location: 'Delhi', medicalDocs:[], status: 'Pending' },
    { id: 'c3', patientName: 'Karan Joshi', age: 19, bloodType: BloodType.OPos, organNeeded: Organ.HEART, urgency: Urgency.CRITICAL, hospitalId: 'h1', hospitalName: 'Fortis Hospital', location: 'Delhi', medicalDocs:[], status: 'Matched' },
];

const ResourceDashboard = () => (
    <Card className="p-6">
        <h2 className="text-xl font-bold text-secondary dark:text-light mb-4">Live Resource Dashboard</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-sky-100 dark:bg-sky-900/50 p-4 rounded-lg text-center">
                <p className="text-sm text-sky-700 dark:text-sky-300">ICU Beds Available</p>
                <p className="text-3xl font-bold text-sky-800 dark:text-sky-200">6</p>
            </div>
             <div className="bg-teal-100 dark:bg-teal-900/50 p-4 rounded-lg text-center">
                <p className="text-sm text-teal-700 dark:text-teal-300">OR Slots Free</p>
                <p className="text-3xl font-bold text-teal-800 dark:text-teal-200">3</p>
            </div>
             <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-lg text-center">
                <p className="text-sm text-red-700 dark:text-red-300">O- Blood Units</p>
                <p className="text-3xl font-bold text-red-800 dark:text-red-200">8</p>
            </div>
             <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-lg text-center">
                <p className="text-sm text-amber-700 dark:text-amber-300">Ambulances Ready</p>
                <p className="text-3xl font-bold text-amber-800 dark:text-amber-200">4</p>
            </div>
        </div>
    </Card>
);

const HospitalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cases');

  const renderContent = () => {
    switch (activeTab) {
      case 'cases':
        return (
          <div className="space-y-4">
            {mockCases.map(c => (
              <Card key={c.id} className="p-4 border dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-secondary dark:text-light">{c.patientName}, {c.age}</h3>
                      <span className="font-mono text-sm px-2 py-0.5 bg-primary/10 text-primary rounded">{c.bloodType}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Needs <span className="font-semibold">{c.organNeeded}</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                     <Badge color={c.urgency === Urgency.CRITICAL ? 'red' : 'yellow'}>{c.urgency}</Badge>
                     <Badge color={c.status === 'Matched' ? 'green' : 'blue'}>{c.status}</Badge>
                     <Button size="sm" variant={c.status === 'Matched' ? 'secondary' : 'primary'}>
                       {c.status === 'Matched' ? 'Manage Transplant' : 'Find Match'}
                     </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );
      case 'donors':
        return (
          <div className="space-y-4">
            {mockDonors.map(d => (
              <Card key={d.id} className="p-4 flex items-center gap-4 border dark:border-slate-700">
                <img src={d.profilePicUrl} alt={d.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h3 className="font-bold text-lg text-secondary dark:text-light">{d.name}</h3>{d.isVerified && <CheckCircleIcon className="w-5 h-5 text-green-500" />}</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{d.age} years, <span className="font-mono px-1.5 py-0.5 bg-primary/10 text-primary rounded">{d.bloodType}</span></p>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400"><MapPinIcon className="w-4 h-4" /> {d.location}</div>
                   <div className="flex flex-wrap gap-1 mt-1">{d.organs.slice(0, 3).map(o => <Badge key={o} color="gray">{o}</Badge>)}</div>
                </div>
              </Card>
            ))}
          </div>
        );
    }
  };

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button onClick={() => setActiveTab(id)} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === id ? 'bg-secondary text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
      {label}
    </button>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
        <ResourceDashboard/>
        <div>
            <div className="mb-4">
                <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                    <TabButton id="cases" label="Recipient Cases" />
                    <TabButton id="donors" label="Active Donors" />
                </div>
            </div>
            {renderContent()}
        </div>
    </div>
  );
};

export default HospitalView;