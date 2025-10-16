import React from 'react';
import { Card, Badge } from './common/ui';
import { AwarenessArticle, Language } from '../types';
import { LanguageKey } from '../translations';

const mockArticles: AwarenessArticle[] = [
    {
        id: 'a1',
        title: { EN: "The Gift of Life: Understanding Organ Donation", HI: "जीवन का उपहार: अंग दान को समझना", KN: "ಜೀವದ ಉಡುಗೊರೆ: ಅಂಗಾಂಗ ದಾನವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು" },
        author: 'Dr. Priya Sharma',
        date: 'July 25, 2024',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
        content: {
            EN: "Organ donation is a noble act that can save up to eight lives. This article breaks down the process, the laws in India, and how you can become a registered donor.",
            HI: "अंगदान एक महान कार्य है जो आठ लोगों की जान बचा सकता है। यह लेख प्रक्रिया, भारत में कानूनों और आप एक पंजीकृत दाता कैसे बन सकते हैं, के बारे में बताता है।",
            KN: "ಅಂಗಾಂಗ ದಾನವು ಎಂಟು ಜೀವಗಳನ್ನು ಉಳಿಸಬಲ್ಲ ಒಂದು ಉದಾತ್ತ ಕಾರ್ಯವಾಗಿದೆ. ಈ ಲೇಖನವು ಪ್ರಕ್ರಿಯೆ, ಭಾರತದಲ್ಲಿನ ಕಾನೂನುಗಳು ಮತ್ತು ನೀವು ನೋಂದಾಯಿತ ದಾನಿಯಾಗುವುದು ಹೇಗೆ ಎಂಬುದನ್ನು ವಿವರಿಸುತ್ತದೆ."
        }
    },
    {
        id: 'a2',
        title: { EN: "A Second Chance: Rohan's Story of a Heart Transplant", HI: "एक दूसरा मौका: रोहन की हार्ट ट्रांसप्लांट की कहानी", KN: "ಎರಡನೇ ಅವಕಾಶ: ರೋಹನ್‌ನ ಹೃದಯ ಕಸಿ ಕಥೆ" },
        author: 'LifeConnect Stories',
        date: 'July 18, 2024',
        imageUrl: 'https://images.unsplash.com/photo-1612784194032-1141703b3a7a?w=600',
        content: {
            EN: "Read the inspiring journey of Rohan, a 24-year-old who received a life-saving heart transplant thanks to a generous donor. His story is a testament to the power of donation.",
            HI: "एक उदार दाता की बदौलत जीवन रक्षक हृदय प्रत्यारोपण प्राप्त करने वाले 24 वर्षीय रोहन की प्रेरक यात्रा पढ़ें। उनकी कहानी दान की शक्ति का एक प्रमाण है।",
            KN: "ಉದಾರ ದಾನಿಯೊಬ್ಬರಿಂದ ಜೀವ ಉಳಿಸುವ ಹೃದಯ ಕಸಿ ಪಡೆದ 24 ವರ್ಷದ ರೋಹನ್‌ನ ಸ್ಪೂರ್ತಿದಾಯಕ ಪ್ರಯಾಣವನ್ನು ಓದಿ. ಅವರ ಕಥೆಯು ದಾನದ ಶಕ್ತಿಗೆ ಸಾಕ್ಷಿಯಾಗಿದೆ."
        }
    }
];


const AwarenessHub = ({ lang }: { lang: LanguageKey }) => {
    return (
        <div className="p-4 md:p-6">
            <h1 className="text-3xl font-bold text-secondary dark:text-light mb-2">Awareness Hub</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Learn more about the importance of organ and blood donation in India.</p>

            <div className="space-y-6">
                {mockArticles.map(article => (
                    <Card key={article.id} className="flex flex-col md:flex-row overflow-hidden">
                        <img src={article.imageUrl} alt={article.title[lang]} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-secondary dark:text-light mb-2">{article.title[lang]}</h2>
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                                    <span>By {article.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{article.date}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300">
                                    {article.content[lang]}
                                </p>
                            </div>
                            <a href="#" className="text-primary dark:text-teal-400 font-semibold mt-4 inline-block">Read More &rarr;</a>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AwarenessHub;
