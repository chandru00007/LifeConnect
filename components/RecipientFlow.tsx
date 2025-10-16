import React from 'react';
import { Card, Button, Input, Select, Badge } from './common/ui';
import { BLOOD_TYPES_LIST, ORGANS_LIST } from '../constants';
import { Organ, BloodType, Urgency, DonorProfile, UserRole, RecipientCase } from '../types';
import { SparklesIcon, MapPinIcon, CheckCircleIcon } from '../constants';

const mockMatches: (DonorProfile & { matchScore: number })[] = [
    { id: 'd1', name: 'Priya Patel', age: 32, bloodType: BloodType.APos, location: '5km away', isVerified: true, profilePicUrl: 'https://picsum.photos/id/1027/100', matchScore: 95, organs: [Organ.KIDNEY], isAvailable: true, donationHistory: [], role: UserRole.DONOR, aadhar: '', medicalInfo: { hlaData: 'A*01, B*08', height: 165, weight: 60 } },
    { id: 'd2', name: 'Vikram Singh', age: 45, bloodType: BloodType.ANeg, location: '12km away', isVerified: true, profilePicUrl: 'https://picsum.photos/id/1005/100', matchScore: 88, organs: [Organ.KIDNEY, Organ.LIVER], isAvailable: true, donationHistory: [], role: UserRole.DONOR, aadhar: '', medicalInfo: undefined },
    { id: 'd3', name: 'Ananya Gupta', age: 28, bloodType: BloodType.APos, location: '25km away', isVerified: false, profilePicUrl: 'https://picsum.photos/id/1011/100', matchScore: 82, organs: [Organ.KIDNEY, Organ.CORNEAS], isAvailable: true, donationHistory: [], role: UserRole.DONOR, aadhar: '', medicalInfo: { medicalHistory: 'No known allergies.'} },
];

const mockCase: RecipientCase = {
    id: 'c1', patientName: 'Aisha Khan', age: 42, bloodType: BloodType.APos, organNeeded: Organ.KIDNEY, urgency: Urgency.CRITICAL, hospitalId: 'h1', hospitalName: 'Apollo Hospital, Delhi', location: 'Delhi', medicalDocs:[], status: 'Accepted', matchScore: 95
};

const CaseStatusTracker = ({ status }: { status: RecipientCase['status']}) => {
    const steps = ['Pending', 'Matched', 'Accepted', 'Surgery', 'Completed'];
    const currentStepIndex = steps.indexOf(status);

    return (
        <Card className="p-6">
            <h2 className="text-xl font-bold text-secondary dark:text-light mb-6">Case Progress</h2>
            <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index <= currentStepIndex ? 'bg-secondary border-secondary text-white' : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600'}`}>
                                {index < currentStepIndex ? <CheckCircleIcon className="w-6 h-6"/> : index + 1}
                            </div>
                            <p className={`mt-2 text-xs font-semibold ${index <= currentStepIndex ? 'text-secondary dark:text-light' : 'text-slate-500'}`}>{step}</p>
                        </div>
                        {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${index < currentStepIndex ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-700'}`}></div>}
                    </React.Fragment>
                ))}
            </div>
            <p className="text-center mt-6 text-slate-500 dark:text-slate-400">Your case has been accepted by the hospital. You will be notified about the surgery schedule soon.</p>
        </Card>
    );
};

const MatchList = () => (
    <div className="space-y-6">
        <CaseStatusTracker status={mockCase.status} />
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4"><SparklesIcon className="text-primary w-6 h-6" /><h2 className="text-2xl font-bold text-secondary dark:text-light">AI Generated Matches</h2></div>
            <p className="mb-6 text-slate-600 dark:text-slate-400">Our AI has found potential donors. Your hospital has been notified and will coordinate the next steps.</p>
            <div className="space-y-4">
                {mockMatches.map(donor => (
                    <Card key={donor.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border dark:border-slate-700">
                        <img src={donor.profilePicUrl} alt={donor.name} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg text-secondary dark:text-light">{donor.name}</h3>
                                {donor.isVerified && <span title="Verified Donor"><CheckCircleIcon className="w-5 h-5 text-green-500" /></span>}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{donor.age} years old</p>
                            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-1"><MapPinIcon className="w-4 h-4"/><span>{donor.location}</span></div>
                        </div>
                        <div className="flex flex-col items-end text-right">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-sm px-2 py-0.5 bg-primary/10 text-primary rounded">{donor.bloodType}</span>
                                <Badge color={donor.matchScore > 90 ? 'green' : donor.matchScore > 85 ? 'yellow' : 'blue'}>Match: {donor.matchScore}%</Badge>
                            </div>
                            <Button size="sm" variant="ghost" className="mt-2">View Details</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </Card>
    </div>
);

const CreateCaseForm = () => (
    <Card className="p-6">
        <h2 className="text-2xl font-bold text-secondary dark:text-light mb-6">Create New Recipient Case</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Patient Full Name" placeholder="Aisha Khan"/>
            <Input label="Patient Age" type="number" placeholder="42"/>
            <Select label="Required Organ">{ORGANS_LIST.map(o => <option key={o}>{o}</option>)}</Select>
            <Select label="Blood Group">{BLOOD_TYPES_LIST.map(b => <option key={b}>{b}</option>)}</Select>
            <Select label="Urgency Level">{Object.values(Urgency).map(u => <option key={u}>{u}</option>)}</Select>
            <Input label="Registered Hospital" placeholder="Apollo Hospital, Delhi"/>
             <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload Doctor's Certificate / Hospital Letter</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-slate-600 dark:text-slate-400"><label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple/></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-slate-500 dark:text-slate-500">PDF, PNG, JPG up to 10MB</p>
                    </div>
                </div>
            </div>
        </div>
        <Button className="mt-6 w-full md:w-auto">Submit Case for Review</Button>
    </Card>
);

const RecipientFlow: React.FC = () => {
    // In a real app, this would be based on user data
    const hasActiveCase = true; 
    
    return (
        <div className="p-4 md:p-6">
            {hasActiveCase ? <MatchList /> : <CreateCaseForm />}
        </div>
    );
};

export default RecipientFlow;