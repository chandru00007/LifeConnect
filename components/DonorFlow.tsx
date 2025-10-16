import React, { useState } from 'react';
import { Card, Button, Input, Select, Badge } from './common/ui';
import { BLOOD_TYPES_LIST, ORGANS_LIST, AbhaIcon, AadharIcon, CheckCircleIcon, HeartIcon, UserIcon, QrCodeIcon } from '../constants';
import { Organ, BloodType } from '../types';

const DonorOnboardingWizard = ({ onComplete }: { onComplete: (data: any) => void }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: 'Rohan Sharma',
        age: '30',
        aadhar: 'XXXX XXXX 1234',
        bloodType: BloodType.OPos,
        location: 'Mumbai, MH',
        organs: [] as Organ[],
        signature: '',
        hlaData: '',
        height: '',
        weight: '',
        medicalHistory: '',
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);
    
    const handleOrganToggle = (organ: Organ) => {
        setFormData(prev => ({
            ...prev,
            organs: prev.organs.includes(organ) ? prev.organs.filter(o => o !== organ) : [...prev.organs, organ]
        }));
    };

    const Step1 = () => (
        <div>
            <h3 className="text-xl font-semibold text-secondary dark:text-light mb-4">Personal Information</h3>
            <div className="space-y-4">
                <Input label="Full Name" placeholder="e.g., Rohan Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <Input label="Aadhar Number" placeholder="XXXX XXXX XXXX" value={formData.aadhar} onChange={e => setFormData({...formData, aadhar: e.target.value})} />
                <Input label="Age" type="number" placeholder="e.g., 30" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                <Select label="Blood Group" value={formData.bloodType} onChange={e => setFormData({...formData, bloodType: e.target.value as BloodType})}>
                    {BLOOD_TYPES_LIST.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                </Select>
                 <Input label="City / Location" placeholder="e.g., Mumbai, MH" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                 <Button variant="ghost" className="w-full border-secondary border text-secondary">
                    <AbhaIcon className="mr-2"/> Link ABHA Health ID (Optional)
                 </Button>
            </div>
        </div>
    );

    const Step2 = () => (
        <div>
            <h3 className="text-xl font-semibold text-secondary dark:text-light mb-4">Medical Details (Optional)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Providing this information can improve the accuracy of the AI matching engine.</p>
            <div className="space-y-4">
                <Input label="HLA Data (if known)" placeholder="e.g., A*01:01, B*08:01..." value={formData.hlaData} onChange={e => setFormData({...formData, hlaData: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Height (cm)" type="number" placeholder="e.g., 175" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
                    <Input label="Weight (kg)" type="number" placeholder="e.g., 70" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                </div>
                <Input as="textarea" rows={3} label="Brief Medical History" placeholder="Any known conditions or allergies..." value={formData.medicalHistory} onChange={e => setFormData({...formData, medicalHistory: e.target.value})} />
            </div>
        </div>
    );

    const Step3 = () => (
        <div>
            <h3 className="text-xl font-semibold text-secondary dark:text-light mb-4">Select Organs/Tissues to Donate</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ORGANS_LIST.map(organ => (
                    <button key={organ} onClick={() => handleOrganToggle(organ)} className={`p-4 rounded-lg border-2 text-center transition ${formData.organs.includes(organ) ? 'bg-primary/20 border-primary' : 'bg-slate-100 dark:bg-slate-700 border-transparent hover:border-primary/50'}`}>
                        <p className="font-semibold mt-2 text-secondary dark:text-light">{organ}</p>
                    </button>
                ))}
            </div>
        </div>
    );

    const Step4 = () => (
        <div>
            <h3 className="text-xl font-semibold text-secondary dark:text-light mb-4">Consent and Verification</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none bg-slate-100 dark:bg-slate-900/50 p-4 rounded-md">
                <p>I, {formData.name || "[Your Name]"}, voluntarily agree to donate the selected organs and tissues for transplantation purposes as per the Transplantation of Human Organs Act, 1994. I understand this is a legally binding pledge.</p>
                <p>I authorize LifeConnect to share my information with verified hospitals for matching purposes.</p>
            </div>
            <Input className="mt-4" label="Type your full name to sign" placeholder="Rohan Sharma" value={formData.signature} onChange={e => setFormData({...formData, signature: e.target.value})} />
        </div>
    );

    const totalSteps = 4;

    return (
        <Card className="p-6 max-w-2xl mx-auto">
            <div className="mb-4">
                <div className="flex justify-between mb-1"><span className="text-base font-medium text-primary dark:text-teal-400">Step {step} of {totalSteps}</span></div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700"><div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div></div>
            </div>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            <div className="flex justify-between mt-8">
                <Button variant="secondary" onClick={handleBack} disabled={step === 1}>Back</Button>
                {step < totalSteps && <Button onClick={handleNext}>Next</Button>}
                {step === totalSteps && <Button onClick={() => onComplete(formData)} disabled={!formData.signature}>Complete Registration</Button>}
            </div>
        </Card>
    );
};

const DigitalDonorCard = ({ donor }: { donor: any }) => (
    <Card className="bg-gradient-to-br from-secondary to-sky-800 text-white p-6 relative overflow-hidden">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-2xl font-bold">{donor.name}</h3>
                <p className="opacity-80">Verified Donor</p>
                <Badge color="green" className="mt-2">Active</Badge>
            </div>
            <div className="text-right">
                <p className="font-mono text-lg bg-white/20 px-2 py-1 rounded">{donor.bloodType}</p>
                 <AadharIcon className="w-8 h-8 mt-2 text-white/50" />
            </div>
        </div>
        <div className="mt-6 flex justify-between items-end">
            <div>
                <p className="text-sm opacity-80">Aadhar</p>
                <p className="font-mono">{donor.aadhar}</p>
            </div>
             <div className="bg-white p-2 rounded-md"><QrCodeIcon className="w-12 h-12 text-black"/></div>
        </div>
    </Card>
);

const DonorDashboard = ({ donorData }: { donorData: any }) => (
    <div className="space-y-6">
        <DigitalDonorCard donor={donorData} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 text-center">
                <h3 className="text-lg font-semibold text-secondary dark:text-light">Impact Stats</h3>
                <p className="text-5xl font-bold text-primary dark:text-teal-400 mt-2">1</p>
                <p className="text-slate-500 dark:text-slate-400">Life Saved</p>
            </Card>
            <Card className="p-6 text-center flex flex-col justify-center">
                 <h3 className="text-lg font-semibold text-secondary dark:text-light">Availability</h3>
                 <label className="relative inline-flex items-center cursor-pointer mx-auto mt-4">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Available to Donate</span>
                </label>
            </Card>
        </div>
         <Card className="p-6">
            <h2 className="text-xl font-bold text-secondary dark:text-light mb-4">My Donation Journey</h2>
            <ol className="relative border-l border-slate-200 dark:border-slate-700">
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-200 rounded-full -left-3 ring-8 ring-white dark:ring-dark dark:bg-green-900"><CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" /></span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Donation Completed <Badge color="green" className="ml-2">Certificate Issued</Badge></h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">January 20th, 2024</time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Successfully donated Blood (O+). The recipient is stable.</p>
                </li>
                 <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-dark dark:bg-blue-900"><UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" /></span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Registered on LifeConnect</h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">November 11th, 2023</time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Completed registration and became a verified donor.</p>
                </li>
            </ol>
        </Card>
    </div>
);

const DonorFlow: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [donorData, setDonorData] = useState(null);

  const handleRegistrationComplete = (data: any) => {
    const structuredData = {
        ...data,
        medicalInfo: {
            hlaData: data.hlaData,
            height: data.height ? parseInt(data.height, 10) : undefined,
            weight: data.weight ? parseInt(data.weight, 10) : undefined,
            medicalHistory: data.medicalHistory,
        }
    };
    setDonorData(structuredData);
    setIsRegistered(true);
  }

  return (
    <div className="p-4 md:p-6">
        {!isRegistered && <DonorOnboardingWizard onComplete={handleRegistrationComplete} />}
        {isRegistered && donorData && <DonorDashboard donorData={donorData} />}
    </div>
  );
};

export default DonorFlow;