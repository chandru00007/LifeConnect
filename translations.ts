import { Language } from "./types";

export const translations = {
    // App Shell & Common
    appName: {
        EN: 'LifeConnect',
        HI: 'लाइफकनेक्ट',
        KN: 'ಲೈಫ್‌ಕನೆಕ್ಟ್',
    },
    tagline: {
        EN: "India's Donation Platform",
        HI: 'भारत का दान मंच',
        KN: 'ಭಾರತದ ದೇಣಿಗೆ ವೇದಿಕೆ',
    },
    switchView: {
        EN: 'Switch View',
        HI: 'व्यू बदलें',
        KN: 'ವೀಕ್ಷಣೆ ಬದಲಾಯಿಸಿ',
    },
    viewSuffix: {
        EN: 'View',
        HI: 'व्यू',
        KN: 'ವೀಕ್ಷಣೆ',
    },
    emergencyBroadcast: {
        EN: 'Emergency Broadcast',
        HI: 'आपातकालीन प्रसारण',
        KN: 'ತುರ್ತು ಪ್ರಸಾರ',
    },
    aiAssistant: {
        EN: 'AI Assistant',
        HI: 'एआई सहायक',
        KN: 'AI ಸಹಾಯಕ',
    },
    awarenessHub: {
        EN: 'Awareness Hub',
        HI: 'जागरूकता हब',
        KN: 'ಜಾಗೃತಿ ಕೇಂದ್ರ',
    },
    // Donor Flow
    donorPortal: {
        EN: 'Donor Portal',
        HI: 'दाता पोर्टल',
        KN: 'ದಾನಿ ಪೋರ್ಟಲ್',
    },
    donorRegComplete: {
        EN: 'Registration Complete!',
        HI: 'पंजीकरण पूरा!',
        KN: 'ನೋಂದಣಿ ಪೂರ್ಣಗೊಂಡಿದೆ!',
    },
    donorIdCard: {
        EN: 'Digital Donor ID Card',
        HI: 'डिजिटल डोनर आईडी कार्ड',
        KN: 'ಡಿಜಿಟಲ್ ದಾನಿ ಗುರುತಿನ ಚೀಟಿ',
    },
    livesSaved: {
        EN: 'Lives Saved',
        HI: 'जान बचाई',
        KN: 'ಉಳಿಸಿದ ಜೀವಗಳು',
    },
    // Recipient Flow
    recipientPortal: {
        EN: 'Recipient Portal',
        HI: 'प्राप्तकर्ता पोर्टल',
        KN: 'ಸ್ವೀಕರಿಸುವವರ ಪೋರ್ಟಲ್',
    },
    aiMatches: {
        EN: 'AI Generated Matches',
        HI: 'एआई जनित मैच',
        KN: 'AI ರಚಿತ ಹೊಂದಾಣಿಕೆಗಳು',
    },
    // Hospital Flow
    hospitalPortal: {
        EN: 'Hospital Portal',
        HI: 'अस्पताल पोर्टल',
        KN: 'ಆಸ್ಪತ್ರೆ ಪೋರ್ಟಲ್',
    },
    recipientCases: {
        EN: 'Recipient Cases',
        HI: 'प्राप्तकर्ता मामले',
        KN: 'ಸ್ವೀಕರಿಸುವವರ ಪ್ರಕರಣಗಳು',
    },
    activeDonors: {
        EN: 'Active Donors',
        HI: 'सक्रिय दाता',
        KN: 'ಸಕ್ರಿಯ ದಾನಿಗಳು',
    },
    resourceDashboard: {
        EN: 'Live Resource Dashboard',
        HI: 'लाइव संसाधन डैशबोर्ड',
        KN: 'ಲೈವ್ ಸಂಪನ್ಮೂಲ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    },
    // Admin Flow
    adminPanel: {
        EN: 'Administrator Control Panel',
        HI: 'प्रशासक नियंत्रण कक्ष',
        KN: 'ನಿರ್ವಾಹಕ ನಿಯಂತ್ರಣ ಫಲಕ',
    },
    verifyHospitals: {
        EN: 'Verify Hospitals',
        HI: 'अस्पतालों का सत्यापन करें',
        KN: 'ಆಸ್ಪತ್ರೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
    },
    auditLogs: {
        EN: 'Audit Logs',
        HI: 'ऑडिट लॉग',
        KN: 'ಆಡಿಟ್ ಲಾಗ್‌ಗಳು',
    },
    campaigns: {
        EN: 'Campaigns',
        HI: 'अभियान',
        KN: 'ಪ್ರಚಾರಗಳು',
    },
    reports: {
        EN: 'Reports',
        HI: 'रिपोर्ट',
        KN: 'ವರದಿಗಳು',
    },
};

export type TranslationKey = keyof typeof translations;
export type LanguageKey = keyof typeof Language;

export const t = (key: TranslationKey, lang: LanguageKey): string => {
    return translations[key][lang] || translations[key]['EN'];
};
