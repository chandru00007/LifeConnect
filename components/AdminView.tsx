import React, { useState } from 'react';
import { Card, Button, Badge, Input } from './common/ui';
import { Hospital, AuditLog } from '../types';
import { HospitalIcon } from '../constants';

const mockHospitals: Hospital[] = [
    { id: 'h1', name: 'Fortis Hospital', location: 'Mumbai, MH', orSlotsAvailable: 8, icuBedsAvailable: 12, bloodStock: {}, isVerified: true },
    { id: 'h2', name: 'Manipal Hospital', location: 'Bengaluru, KA', orSlotsAvailable: 4, icuBedsAvailable: 5, bloodStock: {}, isVerified: false },
    { id: 'h3', name: 'Medanta - The Medicity', location: 'Gurugram, HR', orSlotsAvailable: 12, icuBedsAvailable: 20, bloodStock: {}, isVerified: true },
    { id: 'h4', name: 'Narayana Health City', location: 'Bengaluru, KA', orSlotsAvailable: 2, icuBedsAvailable: 8, bloodStock: {}, isVerified: false },
];

const mockLogs: AuditLog[] = [
    { id: 'l1', userId: 'h1', userName: 'Fortis Hospital', action: 'Accepted match for Case #c3', timestamp: '2024-07-29 10:05:12' },
    { id: 'l2', userId: 'd1', userName: 'Priya Patel', action: 'Updated availability to Active', timestamp: '2024-07-29 09:45:30' },
    { id: 'l3', userId: 'admin1', userName: 'Admin', action: 'Verified Manipal Hospital', timestamp: '2024-07-28 15:20:01' },
    { id: 'l4', userId: 'r2', userName: 'Sameer Verma', action: 'Created new case for Liver', timestamp: '2024-07-28 11:10:45' },
];

const AdminView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('hospitals');

    const renderContent = () => {
        switch(activeTab) {
            case 'hospitals':
                return (
                    <div className="space-y-4">
                        {mockHospitals.map(h => (
                            <Card key={h.id} className="p-4 flex items-center justify-between gap-4 border dark:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <HospitalIcon className="w-8 h-8 text-secondary dark:text-light" />
                                    <div>
                                        <h3 className="font-bold text-lg text-secondary dark:text-light">{h.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{h.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge color={h.isVerified ? 'green' : 'yellow'}>{h.isVerified ? 'Verified' : 'Pending'}</Badge>
                                    {!h.isVerified && <Button size="sm">Verify Now</Button>}
                                </div>
                            </Card>
                        ))}
                    </div>
                );
            case 'logs':
                return (
                    <Card className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                                <tr><th scope="col" className="px-6 py-3">Timestamp</th><th scope="col" className="px-6 py-3">User</th><th scope="col" className="px-6 py-3">Action</th></tr>
                            </thead>
                            <tbody>
                                {mockLogs.map(log => (
                                    <tr key={log.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                        <td className="px-6 py-4 font-mono text-xs">{log.timestamp}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{log.userName}</td>
                                        <td className="px-6 py-4">{log.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                );
            case 'campaigns':
                return (
                     <Card className="p-6">
                        <h3 className="font-bold text-lg text-secondary dark:text-light mb-4">Manage Awareness Campaigns</h3>
                        <div className="space-y-4">
                            <Input label="Campaign Title" placeholder="Organ Donation Awareness Week"/>
                            <Input label="Target Audience" placeholder="Students, Corporate Employees"/>
                            <Button>Launch New Campaign</Button>
                        </div>
                    </Card>
                );
            case 'reports':
                 return (
                     <Card className="p-6">
                        <h3 className="font-bold text-lg text-secondary dark:text-light mb-4">Predictive Reports</h3>
                        <div className="bg-sky-100 dark:bg-sky-900/50 p-4 rounded-lg">
                           <p className="font-semibold text-sky-800 dark:text-sky-200">AI Insight:</p>
                           <p className="text-sky-700 dark:text-sky-300">There is a projected 15% increase in demand for Kidney transplants in the Bengaluru region over the next 3 months. Recommend initiating a targeted donor drive.</p>
                        </div>
                    </Card>
                 );
        }
    };
    
    const TabButton = ({ id, label }: { id: string; label: string }) => (
        <button onClick={() => setActiveTab(id)} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === id ? 'bg-secondary text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
          {label}
        </button>
      );

    return (
        <div className="p-4 md:p-6">
            <div className="mb-6">
                <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                    <TabButton id="hospitals" label="Verify Hospitals" />
                    <TabButton id="logs" label="Audit Logs" />
                    <TabButton id="campaigns" label="Campaigns" />
                    <TabButton id="reports" label="Reports" />
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default AdminView;
