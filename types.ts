export enum UserRole {
  DONOR = 'Donor',
  RECIPIENT = 'Recipient',
  HOSPITAL = 'Hospital',
  ADMIN = 'Admin / Govt. Officer',
}

export enum Language {
    EN = 'English',
    HI = 'हिन्दी', // Hindi
    KN = 'ಕನ್ನಡ', // Kannada
}

export enum BloodType {
  APos = 'A+', ANeg = 'A-', BPos = 'B+', BNeg = 'B-',
  ABPos = 'AB+', ABNeg = 'AB-', OPos = 'O+', ONeg = 'O-',
}

export enum Organ {
  HEART = 'Heart', KIDNEY = 'Kidney', LIVER = 'Liver', LUNGS = 'Lungs',
  PANCREAS = 'Pancreas', INTESTINE = 'Intestine', CORNEAS = 'Corneas',
  SKIN = 'Skin', BONE = 'Bone', BLOOD = 'Blood', PLASMA = 'Plasma', PLATELETS = 'Platelets',
}

export enum Urgency {
    CRITICAL = "Critical", HIGH = "High", MEDIUM = "Medium", LOW = "Low",
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  bloodType: BloodType;
  age: number;
  location: string;
  isVerified: boolean;
  profilePicUrl: string;
  aadhar: string; // Mock Aadhar number
  abhaId?: string; // Optional ABHA ID
}

export interface MedicalInfo {
  hlaData?: string; // Human Leukocyte Antigen data
  height?: number; // in cm
  weight?: number; // in kg
  medicalHistory?: string; // Brief summary of conditions, allergies, etc.
}

export interface DonorProfile extends User {
  organs: Organ[];
  isAvailable: boolean;
  donationHistory: { organ: Organ; date: string; recipientId: string }[];
  medicalInfo?: MedicalInfo;
}

export interface RecipientCase {
    id: string;
    patientName: string;
    age: number;
    bloodType: BloodType;
    organNeeded: Organ;
    urgency: Urgency;
    hospitalId: string;
    hospitalName: string;
    location: string;
    medicalDocs: string[]; // URLs or identifiers
    matchScore?: number;
    status: 'Pending' | 'Matched' | 'Accepted' | 'Surgery' | 'Completed';
}

export interface Hospital {
    id: string;
    name:string;
    location: string;
    orSlotsAvailable: number;
    icuBedsAvailable: number;
    bloodStock: Partial<Record<BloodType, number>>;
    isVerified: boolean;
}

export interface AuditLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
}

export interface AwarenessArticle {
    id: string;
    title: { [key in keyof typeof Language]: string };
    author: string;
    date: string;
    imageUrl: string;
    content: { [key in keyof typeof Language]: string };
}