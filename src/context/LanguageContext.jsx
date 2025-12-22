import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
    uz: {
        nav: {
            home: 'Bosh Sahifa',
            courses: 'Kurslar',
            about: 'Biz Haqimizda',
            status: 'Holat',
            contact: 'Aloqa',
            getStarted: 'Boshlash'
        },
        home: {
            hero: {
                titlePrefix: 'Kelajak',
                titleSuffix: 'Shu Yerda',
                keywords: ['Dasturlash', 'Dizayn', 'Fullstack'],
                subtitle: 'Biz shunchaki dars o\'tmaymiz, biz real loyihalar orqali karyera qurishga yordam beramiz.',
                cta: 'Kurslarni Ko\'rish',
                secondaryCta: 'Biz Haqimizda'
            },
            whyTitle: 'Nega Datasite Academy?',
            whySubtitle: 'Biz shunchaki dars o\'tmaymiz. Biz karyera quramiz.',
            features: {
                secondTeacher: 'Ikkinchi Ustoz Tizimi',
                secondTeacherDesc: 'Sizga har doim yordam beradigan yordamchi mentorlar.',
                mentors: 'Tajribali Mentorlar',
                mentorsDesc: 'Top texnologiya kompaniyalarida ishlagan mutaxassislardan o\'rganing.',
                events: 'IT Eventlar va Networking',
                eventsDesc: 'Sohadagi eng sara mutaxassislar bilan uchrashuvlar.',
                mock: 'Mock Intervyular',
                mockDesc: 'Haqiqiy ish intervyulariga tayyorgarlik va tajriba.',
                coworking: '24/7 Coworking',
                coworkingDesc: 'Xohlagan vaqtingizda dars qilishingiz uchun qulay maydon.'
            },
            stats: {
                students: 'O\'quvchilar',
                employment: 'Ishga Joylashish',
                partners: 'Hamkorlar',
                projects: 'Loyihalar'
            },
            path: {
                title: 'Muvaffaqiyat Yo\'li',
                step1: 'Qabul: Darajangizni aniqlaymiz',
                step1Desc: 'Sizning qiziqishingizga qarab yo\'nalish tanlaymiz.',
                step2: 'Amaliyot: Real proyektlar ustida ishlaysiz',
                step2Desc: 'Faqat kod yozmaysiz, balki tizimlar qurasiz.',
                step3: 'Portfolio: Kuchli loyihalar to\'plami',
                step3Desc: 'Ish beruvchilarni hayron qoldiradigan portfolioni tayyorlaymiz.',
                step4: 'Karyera: Ish taklifi va mentorlik',
                step4Desc: 'Biz sizni top kompaniyalarga tavsiya qilamiz.'
            }
        },
        status: {
            title: 'Talaba Holatini Tekshirish',
            subtitle: 'To\'lov holati va kurs ma\'lumotlarini ko\'rish uchun ID raqamingizni kiriting.',
            placeholder: 'ID raqamingiz (masalan: DS2025)',
            btn: 'Tekshirish',
            notFound: 'O\'quvchi Topilmadi',
            notFoundDesc: 'Iltimos, ID raqamni tekshirib qaytadan urinib ko\'ring.',
            course: 'Kurs',
            paymentStatus: 'To\'lov Holati',
            paid: 'To\'langan',
            unpaid: 'To\'lanmagan',
            nextPayment: 'Keyingi To\'lov',
            payNow: 'Hozir To\'lash'
        },
        admin: {
            loginTitle: 'Admin Kirish',
            username: 'Login',
            password: 'Parol',
            loginBtn: 'Kirish',
            error: 'Login yoki parol xato!',
            dashboardTitle: 'Boshqaruv Paneli',
            addStudent: 'O\'quvchi Qo\'shish',
            editStudent: 'Tahrirlash',
            deleteStudent: 'O\'chirish',
            saveBtn: 'Saqlash',
            cancelBtn: 'Bekor qilish',
            id: 'ID',
            name: 'Ism Familiya',
            course: 'Kurs',
            status: 'Holat',
            nextPayment: 'Keyingi To\'lov',
            actions: 'Amallar'
        },
        monitoring: {
            title: 'Monitoring Tizimi',
            subtitle: 'Akademiya bo\'yicha umumiy statistika va tahlillar.',
            stats: {
                totalStudents: 'Jami O\'quvchilar',
                totalRevenue: 'Umumiy Tushum',
                activeCourses: 'Faol Kurslar',
                paidStudents: 'To\'lov Qilganlar',
                unpaidStudents: 'To\'lov Qilmaganlar'
            },
            charts: {
                studentDist: 'O\'quvchilar Taqsimoti',
                paymentStats: 'To\'lov Statistikasi'
            },
            loginTitle: 'Monitoring Kirish',
            error: 'Login yoki parol xato!'
        },
        footer: {
            desc: 'Raqamli yaratuvchilar va dasturchilarning yangi avlodini tarbiyalaymiz.',
            quickLinks: 'Tezkor Havolalar',
            socials: 'Ijtimoiy Tarmoqlar',
            rights: 'Barcha huquqlar himoyalangan.'
        },
        courses: {
            title: 'Kurslarimizni Keshf Eting',
            subtitle: 'Malakangizni oshirish uchun mukammal kursni toping.',
            instructor: 'Mentor',
            experience: 'Tajriba',
            years: 'yil',
            filter: {
                all: 'Barchasi',
                dev: 'Dasturlash',
                data: 'Ma\'lumotlar',
                design: 'Dizayn',
                marketing: 'Marketing'
            },
            card: {
                weeks: 'Hafta',
                students: 'O\'quvchi'
            }
        },
        about: {
            title: 'Datasite Academy Haqida',
            subtitle: 'Bizning vazifamiz - texnologik ta\'limni demokratlashtirish va sizga orzu qilgan karyerangizni qurishda yordam berish.',
            storyTitle: 'Bizning Hikoyamiz',
            storyText1: '2025-yilda asos solinagan Datasite Academy oddiy bir g\'oya bilan boshlandi: yuqori sifatli texnologik ta\'lim hamma joyda, hamma uchun ochiq bo\'lishi kerak.',
            storyText2: 'Biz amaliy o\'rganishga ishonamiz. Shuning uchun barcha kurslarimiz loyihalarga asoslangan va tizimlarni masshtabli qurgan soha mutaxassislari tomonidan o\'tiladi.',
            stats: {
                students: 'O\'quvchilar',
                courses: 'Kurslar',
                mentors: 'Mentorlar'
            }
        },
        aboutPage: {
            heroTitle: 'Kelajakni Birga Quramiz',
            heroSubtitle: 'Biz shunchaki o\'rgatmaymiz, biz hayotlarni o\'zgartiramiz va yangi imkoniyatlar yaratamiz.',
            missionTitle: 'Bizning Missiyamiz',
            missionDesc: 'Sifatli IT ta\'limni hamma uchun ochiq qilish va har bir o\'quvchimizni professional darajaga ko\'tarish.',
            timeline: {
                year2022: '2022:Ilk qadam',
                desc2022: 'Datasite Academy loyihasi ustida ish boshlandi.',
                year2023: '2023:Akademiya ochilishi',
                desc2023: 'Ilk guruhlar shakllantirildi va darslar boshlandi.',
                year2024: '2024:Masshtab kengayishi',
                desc2024: 'Yangi kurslar va mentorlar jamoasi qo\'shildi.',
                year2025: '2025:IT markazga aylanish',
                desc2025: 'Respublika miqyosida yetakchi IT akademiyalardan biriga aylandik.'
            },
            stats: {
                students: 'Faol o\'quvchilar',
                courses: 'Kurslar soni',
                mentors: 'Tajribali mentorlar'
            }
        },
        contact: {
            title: 'Bog\'lanish',
            subtitle: 'Savollaringiz bormi? Sizdan eshitishni xohlaymiz.',
            labels: {
                phone: 'Telefon',
                email: 'Email',
                office: 'Ofis',
                name: 'Ism Familiya',
                emailAddr: 'Email Manzil',
                message: 'Xabar',
                send: 'Xabarni Yuborish'
            }
        }
    },
    en: {
        nav: {
            home: 'Home',
            courses: 'Courses',
            about: 'About Us',
            status: 'Status',
            contact: 'Contact',
            getStarted: 'Get Started'
        },
        home: {
            hero: {
                titlePrefix: 'The Future of',
                titleSuffix: 'is Here',
                keywords: ['Coding', 'Design', 'Fullstack'],
                subtitle: 'We don\'t just teach. We help you build a career through real-world projects.',
                cta: 'Explore Courses',
                secondaryCta: 'About Us'
            },
            whyTitle: 'Why Datasite Academy?',
            whySubtitle: 'We provide more than just tutorials. We build careers.',
            features: {
                secondTeacher: 'Second Teacher System',
                secondTeacherDesc: 'Assistant mentors always available to help you with your challenges.',
                mentors: 'Expert Mentors',
                mentorsDesc: 'Learn from industry veterans who have worked in top tech companies.',
                events: 'IT Events & Networking',
                eventsDesc: 'Meet with top industry professionals during our exclusive events.',
                mock: 'Mock Interviews',
                mockDesc: 'Preparation and experience for real job interviews.',
                coworking: '24/7 Coworking Space',
                coworkingDesc: 'A comfortable space for you to study at any time.'
            },
            stats: {
                students: 'Total Students',
                employment: 'Employment Rate',
                partners: 'Partner Companies',
                projects: 'Real Projects'
            },
            path: {
                title: 'Success Path',
                step1: 'Admission: Define your level',
                step1Desc: 'We choose a direction based on your interests.',
                step2: 'Practice: Work on real projects',
                step2Desc: 'You don\'t just write code, you build systems.',
                step3: 'Portfolio: Build a strong collection',
                step3Desc: 'We prepare a portfolio that will wow employers.',
                step4: 'Career: Job offer & Mentorship',
                step4Desc: 'We recommend you to top tech companies.'
            }
        },
        status: {
            title: 'Check Student Status',
            subtitle: 'Enter your Student ID to check payment status and course details.',
            placeholder: 'Enter Student ID (e.g. DS2025)',
            btn: 'Check',
            notFound: 'Student Not Found',
            notFoundDesc: 'Please check your ID and try again.',
            course: 'Course',
            paymentStatus: 'Payment Status',
            paid: 'Paid',
            unpaid: 'Unpaid',
            nextPayment: 'Next Payment',
            payNow: 'Pay Now'
        },
        admin: {
            loginTitle: 'Admin Login',
            username: 'Username',
            password: 'Password',
            loginBtn: 'Login',
            error: 'Invalid username or password!',
            dashboardTitle: 'Admin Dashboard',
            addStudent: 'Add Student',
            editStudent: 'Edit',
            deleteStudent: 'Delete',
            saveBtn: 'Save',
            cancelBtn: 'Cancel',
            id: 'ID',
            name: 'Full Name',
            course: 'Course',
            status: 'Status',
            nextPayment: 'Next Payment',
            actions: 'Actions'
        },
        monitoring: {
            title: 'Monitoring System',
            subtitle: 'General statistics and analytics of the academy.',
            stats: {
                totalStudents: 'Total Students',
                totalRevenue: 'Total Revenue',
                activeCourses: 'Active Courses',
                paidStudents: 'Paid Students',
                unpaidStudents: 'Unpaid Students'
            },
            charts: {
                studentDist: 'Student Distribution',
                paymentStats: 'Payment Statistics'
            },
            loginTitle: 'Monitoring Login',
            error: 'Invalid username or password!'
        },
        footer: {
            desc: 'Empowering the next generation of digital creators and developers through world-class education.',
            quickLinks: 'Quick Links',
            socials: 'Socials',
            rights: 'All rights reserved.'
        },
        courses: {
            title: 'Explore Our Courses',
            subtitle: 'Find the perfect course to upgrade your skills.',
            instructor: 'Instructor',
            experience: 'Experience',
            years: 'years',
            filter: {
                all: 'All',
                dev: 'Development',
                data: 'Data Science',
                design: 'Design',
                marketing: 'Marketing'
            },
            card: {
                weeks: 'Weeks',
                students: 'Students'
            }
        },
        about: {
            title: 'About Datasite Academy',
            subtitle: "We're on a mission to democratize tech education and help you build the career of your dreams.",
            storyTitle: 'Our Story',
            storyText1: 'Founded in 2025, Datasite Academy started with a simple idea: that high-quality tech education should be accessible to everyone, everywhere.',
            storyText2: "We believe in learning by doing. That's why all our courses are project-based and taught by industry experts who have actually built systems at scale.",
            stats: {
                students: 'Students',
                courses: 'Courses',
                mentors: 'Mentors'
            }
        },
        aboutPage: {
            heroTitle: 'Building the Future Together',
            heroSubtitle: 'We don\'t just teach, we transform lives and create new opportunities.',
            missionTitle: 'Our Mission',
            missionDesc: 'Making quality IT education accessible to everyone and raising every student to a professional level.',
            timeline: {
                year2022: '2022:First Steps',
                desc2022: 'Work on the Datasite Academy project began.',
                year2023: '2023:Academy Opening',
                desc2023: 'First groups were formed and classes began.',
                year2024: '2024:Scaling Up',
                desc2024: 'New courses and mentors joined the team.',
                year2025: '2025:Leading IT Center',
                desc2025: 'Became one of the leading IT academies at the national level.'
            },
            stats: {
                students: 'Active Students',
                courses: 'Number of Courses',
                mentors: 'Expert Mentors'
            }
        },
        contact: {
            title: 'Get In Touch',
            subtitle: "Have questions? We'd love to hear from you.",
            labels: {
                phone: 'Phone',
                email: 'Email',
                office: 'Office',
                name: 'Full Name',
                emailAddr: 'Email Address',
                message: 'Message',
                send: 'Send Message'
            }
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('uz');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'uz' ? 'en' : 'uz');
    };

    const value = {
        language,
        toggleLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
