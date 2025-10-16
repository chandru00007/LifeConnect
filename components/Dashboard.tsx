import React from 'react';
import { UserRole } from '../types';
import { Card } from './common/ui';
import { HospitalIcon, CheckCircleIcon, HeartIcon, UsersIcon } from '../constants';
import { t, LanguageKey } from '../translations';

interface DashboardProps {
  userRole: UserRole;
  lang: LanguageKey;
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
    <Card className={`p-4 flex items-center space-x-4 border-l-4 ${color}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        </div>
    </Card>
);

const Dashboard: React.FC<DashboardProps> = ({ userRole, lang }) => {
  const getDashboardData = () => {
    switch (userRole) {
      case UserRole.DONOR:
        return {
          title: t('donorPortal', lang),
          stats: [
            { icon: <HeartIcon className="text-red-500"/>, title: "Organs Pledged", value: "3", color: "border-red-500" },
            { icon: <CheckCircleIcon className="text-green-500"/>, title: "Donations Completed", value: "1", color: "border-green-500" },
            { icon: <span className="font-bold text-primary text-3xl">O+</span>, title: "Blood Group", value: "O Positive", color: "border-primary" },
          ]
        };
      case UserRole.RECIPIENT:
        return {
          title: t('recipientPortal', lang),
          stats: [
            { icon: <HeartIcon className="text-blue-500"/>, title: "Active Case", value: "Kidney", color: "border-blue-500" },
            { icon: <UsersIcon className="text-yellow-500"/>, title: "Potential Matches", value: "5", color: "border-yellow-500" },
            { icon: <HospitalIcon className="text-indigo-500"/>, title: "Registered Hospital", value: "Apollo Hospital", color: "border-indigo-500" },
          ]
        };
      case UserRole.HOSPITAL:
        return {
          title: t('hospitalPortal', lang),
          stats: [
            { icon: <UsersIcon className="text-blue-500"/>, title: t('activeDonors', lang), value: "78", color: "border-blue-500" },
            { icon: <HeartIcon className="text-red-500"/>, title: "Pending Cases", value: "12", color: "border-red-500" },
            { icon: <CheckCircleIcon className="text-green-500"/>, title: "Transplants this Month", value: "4", color: "border-green-500" },
          ]
        };
      case UserRole.ADMIN:
        return {
          title: t('adminPanel', lang),
          stats: [
            { icon: <UsersIcon className="text-sky-500"/>, title: "Total Users", value: "1,245", color: "border-sky-500" },
            { icon: <HospitalIcon className="text-purple-500"/>, title: "Verified Hospitals", value: "32", color: "border-purple-500" },
            { icon: <CheckCircleIcon className="text-green-500"/>, title: t('livesSaved', lang), value: "157", color: "border-green-500" },
          ]
        };
      default:
        return { title: "Dashboard", stats: [] };
    }
  };

  const { title, stats } = getDashboardData();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold text-secondary dark:text-light mb-6">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;