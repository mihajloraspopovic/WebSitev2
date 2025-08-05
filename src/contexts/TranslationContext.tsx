import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  language: 'en' | 'sr';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.design': 'Design',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.career': 'Career Path',
    'nav.contact': 'CONTACT',
    
    // Hero Section
    'hero.greeting': 'Hello & Welcome',
    'hero.name': 'Mihajlo Raspopovic',
    'hero.title': 'Full-Stack Developer & UI/UX Designer',
    'hero.description': 'Passionate about creating innovative digital solutions that bridge the gap between functionality and aesthetics.',
    'hero.cta': 'FOLLOW ME',
    
    // Projects Section
    'projects.title': 'MY PROJECTS',
    'projects.project1.title': 'IMAGE RECOGNITION\nPYTHON',
    'projects.project1.description': "For the final Developer's Lab Course task\nI created a Python program that let's user's\nupload an image, and detect's object's.",
    'projects.project1.subtitle1': 'PROGRAMMING\nPROJECTS',
    'projects.project1.subtitle2': 'YOLOv5, FLASK & TKINTER',
    'projects.project2.title': 'PERSONAL\nSERVER',
    'projects.project2.description': "Built and configured a personal server\nfor hosting applications and learning\nDevOps practices. This project helped\nme understand server administration,\nnetworking, and deployment strategies.",
    'projects.project2.subtitle1': 'PERSONAL\nSERVER',
    'projects.project2.subtitle2': 'LINUX & DOCKER',
    'projects.project2.serverIp': '192.168.1.100',
    'projects.button': 'View Project',

    // Design Section
    'design.title': 'MY DESIGNS',
    'design.project1.title': 'PORTFOLIO DESIGN',
'design.project1.description': 'I made this design in Adobe XD as one of\nmy first projects. I kept it simple, used a\nbright color, and organized the sections\nto show my projects, education, and skills.',
'design.project1.subtitle1': 'PORTFOLIO WEB PAGE\nDESIGN',
'design.project1.subtitle2': 'HTML, CSS & JS',

'design.project2.title': 'TENNIS VISIT CARD',
'design.project2.description': 'Made a two-sided business card in\nIllustrator for a tennis coach. Drew\ncustom graphics, added clear text in two\nlanguages, included a QR code, and kept\nthe layout simple and easy to read.',
'design.project2.subtitle1': 'BUSINESS CARD\nDESIGN',
'design.project2.subtitle2': 'ADOBE ILLUSTRATOR',

    
    // About Section
    'about.title': 'ABOUT',
    'about.timeline': 'TIMELINE',
    'about.education': 'EDUCATION',
    'about.experience': 'EXPERIENCE',
    'about.employee': 'Endcode employee',
    'about.location': 'Location: Bar/Podgorica',
    'about.language': 'Language: English and Serbian',
    'about.greeting': 'HELLO!\nI\'M MIHAJLO.',
    'about.description': 'I\'m a third-year Computer Science student at the Faculty of Electrical Engineering. I\'ve learned both software and hardware basics, from programming and algorithms to some work with embedded systems and circuits. This has helped me understand how computers work and made me more interested in working with technology in the future.',
    'about.university': 'UNIVERSITY OF ELECTRICAL\nENGINEERING',
    'about.university_period': '2021-2025',
    'about.developer_lab': 'DEVELOPER LAB\nPYTHON',
    'about.developer_lab_period': '2024\nAUG-SEP',
    'about.graphic_designer': 'GRAPHIC DESIGNER',
    'about.graphic_designer_period': '2018-NOW',
    'about.endcode': 'ENDCODE',
    'about.endcode_period': '2025-NOW',
    
    // Skills Section
    'skills.title': 'MY SKILLS',
    'skills.coding': 'Coding',
    'skills.software': 'Software',
    
    // Career Path Section
    'career.title': 'CAREER PATH',
    'career.web_dev.title': 'Web Development',
    'career.web_dev.content': 'I\'m just getting started in web development and looking for a role where I can learn and improve. I began during university with HTML, CSS, and JavaScript, which got me interested in building websites. I recently finished a Python course at Developers Lab that gave me a solid start in back-end development. After that, I learned Node.js with TypeScript, React, and SQL by working on real projects, which helped me understand how to build full-stack applications. Next, I\'m planning to dig deeper into React and Django. You can see my work so far on my portfolio and GitHub.',
    'career.devops.title': 'DevOps/System Administration: Personal Experience and Passion',
    'career.devops.content': 'I\'ve always enjoyed working with systems, which led me to explore DevOps and system administration on my own. As a hobby, I built budget Linux servers to run applications like Plex, Minecraft, Counter-Strike, and other game servers. This helped me learn how to set up servers, manage networks, and solve problems as they came up. I also hosted tools like n8n, Plausible Analytics, and other self-hosted services, which taught me more about setting up and maintaining different types of software. These hands-on projects gave me a solid understanding of working with Linux. I\'m especially interested in automating tasks, improving performance, and keeping systems running smoothly—skills I want to use in a professional role.',
    'career.software_dev.title': 'Software Development',
    'career.software_dev.content': 'Python has become a major part of my programming work. After finishing a course at Developers Lab, I started using it for projects like building web apps with Django and doing data analysis with Pandas. I\'m focused on writing clean, efficient code and always looking for ways to get better. You can find examples of my work on my portfolio and GitHub.',
    'career.ui_ux.title': 'UI/UX Design',
    'career.ui_ux.content': 'I\'ve designed a few website layouts using Adobe XD, focusing on simple visuals and easy navigation. I also created a menu interface for a Flash game in Adobe Animate, adding interactive elements to make it easier to use. These projects helped me understand basic design principles and how to make interfaces that are clear and user-focused.',
    
    // Contact Section
    'contact.title': 'GET IN TOUCH',
    'contact.description': 'Ready to bring your ideas to life? Let\'s discuss your next project and create something amazing together.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'SUBJECT',
    'contact.form.subject_placeholder': 'What\'s this about?',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.email_label': 'EMAIL',
    'contact.phone_label': 'PHONE',
    'contact.availability_label': 'AVAILABILITY',
    'contact.availability_text': 'Open for projects',
    
    // Footer
    'footer.motivation': 'I LOVE WORKING ON CHALLENGING PROJECTS',
    'footer.talk': 'Let\'s talk!',
    'footer.email': 'hello@mraspopovic.me',
    'footer.find': 'Find me online.',
    'footer.find.description': 'Connect with me on various platforms to see my work and get in touch.',
    'footer.links': 'My links.',
    'footer.github': 'GitHub',
    'footer.behance': 'Behance',
    'footer.resume': 'Download Resume',
    'footer.copyright': '© 2024 Mihajlo Raspopovic. All rights reserved.'
  },
  sr: {
    // Navigation
    'nav.home': 'Početna',
    'nav.projects': 'Projekti',
    'nav.design': 'Dizajn',
    'nav.about': 'O meni',
    'nav.skills': 'Veštine',
    'nav.career': 'Karijera',
    'nav.contact': 'KONTAKT',
    
    // Hero Section
    'hero.greeting': 'Zdravo & Dobrodošli',
    'hero.name': 'Mihajlo Raspopović',
    'hero.title': 'Full-Stack Developer i UI/UX Dizajner',
    'hero.description': 'Strastan u kreiranju inovativnih digitalnih rešenja koja spajaju funkcionalnost i estetiku.',
    'hero.cta': 'ZAPRATI ME',
    
    // Projects Section
    'projects.title': 'MOJI PROJEKTI',
    'projects.project1.title': 'PREPOZNAVANJE SLIKA\nPYTHON',
    'projects.project1.description': "Za završni zadatak Developers Lab kursa\nnapravio sam Python program koji omogućava korisnicima da\npostave sliku, te detektuje objekte.",
    'projects.project1.subtitle1': 'PROGRAMSKI\nPROJEKTI',
    'projects.project1.subtitle2': 'YOLOv5, FLASK & TKINTER',
    'projects.project2.title': 'LIČNI SERVER',
    'projects.project2.description': "Izgradio i konfigurisao lični server\nza hostovanje aplikacija i učenje\nDevOps praksi. Ovaj projekat mi je pomogao\nda razumem administraciju servera,\nmreže i strategije deploy-a.",
    'projects.project2.subtitle1': 'LIČNI\nSERVER',
    'projects.project2.subtitle2': 'LINUX & DOCKER',
    'projects.project2.serverIp': '192.168.1.100',
    'projects.button': 'Pogledaj projekat',

    // Design Section
    'design.title': 'MOJ DIZAJN',
    'design.project1.title': 'PORTFOLIO DIZAJN',
'design.project1.description': 'Napravio sam ovaj dizajn u Adobe XD kao jedan od prvih projekata. Održao sam ga jednostavnim, koristio svetle boje i organizovao sekcije da prikažem svoje projekte, obrazovanje i veštine.',
'design.project1.subtitle1': 'PORTFOLIO WEB STRANICA\nDIZAJN',
'design.project1.subtitle2': 'HTML, CSS & JS',

'design.project2.title': 'TENIS POSLOVNA KARTA',
'design.project2.description': 'Napravio sam dvostranu poslovnu kartu u\nIllustratoru za tenis trenera. Crtao sam\nprilagođene grafike, dodao jasan tekst na dva jezika, uključio QR kod i održao\nraspored jednostavnim i lakim za čitanje.',
'design.project2.subtitle1': 'POSLOVNA KARTA\nDIZAJN',
'design.project2.subtitle2': 'ADOBE ILLUSTRATOR',
    
    // About Section
    'about.title': 'O MENI',
    'about.timeline': 'VREMENSKA LINIJA',
    'about.education': 'OBRAZOVANJE',
    'about.experience': 'ISKUSTVO',
    'about.employee': 'Zaposlenik Endcode',
    'about.location': 'Lokacija: Bar/Podgorica',
    'about.language': 'Jezik: Engleski i Srpski',
    'about.greeting': 'ZDRAVO!\nJA SAM MIHAJLO.',
    'about.description': 'Treća sam godina studija računarskih nauka na Elektrotehničkom fakultetu. Naučio sam osnove softvera i hardvera, od programiranja i algoritama do rada sa ugrađenim sistemima i kolima. Ovo mi je pomoglo da razumijem kako računari rade i učinilo me zainteresovanijim za rad sa tehnologijom u budućnosti.',
    'about.university': 'UNIVERZITET ELEKTROTEHNIKE',
    'about.university_period': '2021-2025',
    'about.developer_lab': 'DEVELOPER LAB\nPYTHON',
    'about.developer_lab_period': '2024\nAVG-SEP',
    'about.graphic_designer': 'GRAFIČKI DIZAJNER',
    'about.graphic_designer_period': '2018-SADA',
    'about.endcode': 'ENDCODE',
    'about.endcode_period': '2025-SADA',
    
    // Skills Section
    'skills.title': 'MOJE VEŠTINE',
    'skills.coding': 'Programiranje',
    'skills.software': 'Softver',
    
    // Career Path Section
    'career.title': 'KARIJERA',
    'career.web_dev.title': 'Web Development',
    'career.web_dev.content': 'Tek počinjem sa web developmentom i tražim ulogu gde mogu da učim i poboljšavam se. Počeo sam tokom fakulteta sa HTML, CSS i JavaScript, što me je zainteresovalo za pravljenje veb sajtova. Nedavno sam završio kurs Pythona u Developers Lab-u koji mi je dao solidan početak u back-end developmentu. Nakon toga, naučio sam Node.js sa TypeScript-om, React i SQL radeći na stvarnim projektima, što mi je pomoglo da razumem kako se prave full-stack aplikacije. Sledeće planiram da se dublje udubim u React i Django. Možete videti moj rad do sada na portfoliju i GitHub-u.',
    'career.devops.title': 'DevOps/Sistemska administracija: Lično iskustvo i strast',
    'career.devops.content': 'Uvek sam uživao u radu sa sistemima, što me je dovelo do istraživanja DevOps-a i sistemske administracije sam. Kao hobi, napravio sam budžetske Linux servere za pokretanje aplikacija kao što su Plex, Minecraft, Counter-Strike i drugi game serveri. Ovo mi je pomoglo da naučim kako da postavim servere, upravljam mrežama i rešavam probleme kako se pojavljuju. Takođe sam hostovao alate kao što su n8n, Plausible Analytics i druge self-hosted servise, što me je naučilo više o postavljanju i održavanju različitih tipova softvera. Ovi praktični projekti su mi dali solidno razumevanje rada sa Linux-om. Posebno me interesuje automatizacija zadataka, poboljšanje performansi i održavanje sistema u radu—veštine koje želim da koristim u profesionalnoj ulozi.',
    'career.software_dev.title': 'Razvoj softvera',
    'career.software_dev.content': 'Python je postao glavni deo mog programskog rada. Nakon završetka kursa u Developers Lab-u, počeo sam da ga koristim za projekte kao što je pravljenje web aplikacija sa Django-om i analiza podataka sa Pandas-om. Fokusiram se na pisanje čistog, efikasnog koda i uvek tražim načine da se poboljšam. Možete pronaći primere mog rada na portfoliju i GitHub-u.',
    'career.ui_ux.title': 'UI/UX dizajn',
    'career.ui_ux.content': 'Dizajnirao sam nekoliko layout-a veb sajtova koristeći Adobe XD, fokusirajući se na jednostavne vizuele i laku navigaciju. Takođe sam kreirao meni interfejs za Flash igru u Adobe Animate-u, dodajući interaktivne elemente da je učinim lakšom za korišćenje. Ovi projekti su mi pomogli da razumem osnovne principe dizajna i kako da napravim interfejse koji su jasni i usmereni na korisnika.',
    
    // Contact Section
    'contact.title': 'STUPIMO U KONTAKT',
    'contact.description': 'Spreman da oživiš svoje ideje? Razgovarajmo o tvom sledećem projektu i kreirajmo nešto neverovatno zajedno.',
    'contact.form.name': 'Vaše ime',
    'contact.form.email': 'Vaš email',
    'contact.form.subject': 'PREDMET',
    'contact.form.subject_placeholder': 'O čemu se radi?',
    'contact.form.message': 'Vaša poruka',
    'contact.form.submit': 'Pošalji poruku',
    'contact.email_label': 'EMAIL',
    'contact.phone_label': 'TELEFON',
    'contact.availability_label': 'DOSTUPNOST',
    'contact.availability_text': 'Otvoren za projekte',
    
    // Footer
    'footer.motivation': 'VOLIM DA RADIM NA IZAZOVNIM PROJEKTIMA',
    'footer.talk': 'Razgovarajmo!',
    'footer.email': 'hello@mraspopovic.me',
    'footer.find': 'Pronađi me online.',
    'footer.find.description': 'Povežimo se na različitim platformama da vidiš moj rad i stupimo u kontakt.',
    'footer.links': 'Moji linkovi.',
    'footer.github': 'GitHub',
    'footer.behance': 'Behance',
    'footer.resume': 'Preuzmi CV',
    'footer.copyright': '© 2024 Mihajlo Raspopović. Sva prava zadržana.'
  }
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'sr'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sr' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};