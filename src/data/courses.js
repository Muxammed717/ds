import img3230 from '../assets/IMG_3230.JPG';
import img3213 from '../assets/IMG_3213.JPG';
import img3206 from '../assets/IMG_3206.JPG';
import img3216 from '../assets/IMG_3216.JPG';
import img3281 from '../assets/IMG_3281.JPG';
import imgNemis from '../assets/nemis.png';
import koreanImg from '../assets/korean.png';

// Kurslar va Mentorlar ma'lumotlari
export const coursesData = [
    {
        id: 1,
        title: 'Kompyuter savodxonligi',
        instructor: 'Zokirjon Ahmadqulov',
        instructorSlug: 'datasite-ustozi',
        instructorBio: {
            uz: 'Kompyuter texnologiyalari va ofis dasturlari bo\'yicha ko\'p yillik tajribaga ega mutaxassis. Yuqori natijalarga erishgan 500 dan ortiq shogirdlar tayyorlagan.',
            en: 'Specialist with years of experience in computer technology and office programs. Taught over 500 highly successful students.'
        },
        instructorSkills: {
            uz: ['Microsoft Office', 'Windows OS', 'Apparat diagnostikasi', 'Tarmoq asoslari'],
            en: ['Microsoft Office', 'Windows OS', 'Hardware Diagnostics', 'Basic Networking']
        },
        instructorEdu: {
            uz: 'TATU - Axborot texnologiyalari fakulteti',
            en: 'TUIT - Information Technology Faculty'
        },
        instructorAchieve: {
            uz: 'Yilning eng yaxshi o\'qituvchisi (2022)',
            en: 'Instructor of the Year (2022)'
        },
        rating: 5.0,
        students: 200,
        duration: '3 Oy',
        price: '299 000 UZS',
        oldPrice: '500 000 UZS',
        category: 'Boshlang\'ich',
        image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        instructorImg: img3230,
    },
    {
        id: 2,
        title: 'Front-end Dasturlash',
        instructor: 'Frontend Eksperti',
        instructorSlug: 'frontend-eksperti',
        instructorBio: {
            uz: 'Zamonaviy veb-texnologiyalar (React, Vue, Next.js) bo\'yicha chuqur bilimga ega. Ko\'plab xalqaro loyihalarda ishtirok etgan senior dasturchi.',
            en: 'In-depth knowledge of modern web technologies (React, Vue, Next.js). Senior developer who has worked on many international projects.'
        },
        instructorSkills: {
            uz: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS'],
            en: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS']
        },
        instructorEdu: {
            uz: 'Inha Universiteti - Kompyuter injiniringi',
            en: 'Inha University - Computer Science'
        },
        instructorAchieve: {
            uz: 'Xalqaro Web-Programming tanlovi g\'olibi',
            en: 'Winner of International Web-Programming Competition'
        },
        rating: 5.0,
        students: 150,
        duration: '9 Oy',
        price: '399 000 UZS',
        oldPrice: '700 000 UZS',
        category: 'Dasturlash',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        instructorImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        title: 'Backend Dasturlash',
        instructor: 'Backend Senyori',
        instructorSlug: 'backend-senyori',
        instructorBio: {
            uz: 'Node.js va Python (Django) bo\'yicha yuqori malakali mutaxassis. Masshtablanuvchi tizimlar va micro-servislar qurishda katta tajribaga ega.',
            en: 'Highly qualified specialist in Node.js and Python (Django). Extensive experience in building scalable systems and micro-services.'
        },
        instructorSkills: {
            uz: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
            en: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS']
        },
        instructorEdu: {
            uz: 'Amity Universiteti - Dasturiy ta\'minot injiniringi',
            en: 'Amity University - Software Engineering'
        },
        instructorAchieve: {
            uz: 'Zamin loyihasi bosh backend me\'mori',
            en: 'Lead backend architect of the Zamin project'
        },
        rating: 5.0,
        students: 120,
        duration: '9 Oy',
        price: '499 000 UZS',
        oldPrice: '800 000 UZS',
        category: 'Dasturlash',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        instructorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 4,
        title: 'Full Stack Dasturlash',
        instructor: 'Ilyosbek Habibullayev',
        instructorSlug: 'senior-mentor',
        instructorBio: {
            uz: 'Individual yondashuv orqali har bir o\'quvchini qisqa vaqtda natijaga olib chiqish bo\'yicha ekspert. IT sohasidagi turli yo\'nalishlarni uyg\'unlashtirgan.',
            en: 'Expert in leading students to results in a short time through an individual approach. Bridges various fields in IT.'
        },
        instructorSkills: {
            uz: ['Karyera bo\'yicha mentorlik', 'Full-stack umumiy ko\'rinishi', 'Loyihalarni boshqarish', 'Soft Skills'],
            en: ['Career Mentoring', 'Full-stack Overview', 'Project Management', 'Soft Skills']
        },
        instructorEdu: {
            uz: 'Vestminster xalqaro universiteti',
            en: 'Westminster International University'
        },
        instructorAchieve: {
            uz: 'O\'zbekistondagi eng kuchli 10 ta IT mentori ro\'yxatida',
            en: 'Top 10 IT Mentors list in Uzbekistan'
        },
        rating: 5.0,
        students: 50,
        duration: '5 Oy',
        price: '1 500 000 UZS',
        oldPrice: '2 500 000 UZS',
        category: 'Individual',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        instructorImg: img3213
    },
    {
        id: 6,
        title: 'Buxgalteriya',
        instructor: 'Bosh Hisobchi',
        instructorSlug: 'bosh-hisobchi',
        instructorBio: {
            uz: '1C: Buxgalteriya va milliy soliq tizimi bo\'yicha kuchli bilimga ega. Ko\'plab yirik korxonalarda moliyaviy maslahatchi sifatida faoliyat yuritgan.',
            en: 'Strong knowledge of 1C: Accounting and national tax system. Financial advisor for many large enterprises.'
        },
        instructorSkills: {
            uz: ['1C Korxona', 'Soliq hisobi', 'Audit', 'Moliyaviy rejalashtirish'],
            en: ['1C Enterprise', 'Tax Accounting', 'Audit', 'Financial Planning']
        },
        instructorEdu: {
            uz: 'Toshkent Davlat Iqtisodiyot Universiteti',
            en: 'Tashkent State University of Economics'
        },
        instructorAchieve: {
            uz: 'Professional Buxgalter sertifikati egasi',
            en: 'Holder of Professional Accountant Certificate'
        },
        rating: 5.0,
        students: 300,
        duration: '3 Oy',
        price: '700 000 UZS',
        category: 'Boshqa',
        image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        instructorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 8,
        title: 'Ingliz tili',
        instructor: 'Salohiddin Obidov',
        instructorSlug: 'ielts-instruktori',
        instructorBio: {
            uz: 'IELTS 8.5 sohibi. O\'quvchilariga intensiv metodika orqali til o\'rganish sirlarini o\'rgatadi. Ko\'plab o\'quvchilari IELTS 7.5+ ball olgan.',
            en: 'IELTS 8.5 holder. Teaches language secrets through intensive methodology. Many students scored 7.5+ in IELTS.'
        },
        instructorSkills: {
            uz: ['IELTS tayyorgarlik', 'Akademik yozish', 'Notiqlik san\'ati', 'Grammatika'],
            en: ['IELTS Preparation', 'Academic Writing', 'Public Speaking', 'Grammar']
        },
        instructorEdu: {
            uz: 'O\'zDJTU - Filologiya',
            en: 'UzSWLU - Philology'
        },
        instructorAchieve: {
            uz: 'TESOL & CELTA sertifikati egasi',
            en: 'TESOL & CELTA Certified'
        },
        rating: 5.0,
        students: 500,
        duration: '10 Oy',
        price: '199 000 UZS',
        oldPrice: '350 000 UZS',
        category: 'Til',
        badge: 'MOCK Tekin',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        instructorImg: img3206
    },
    {
        id: 9,
        title: 'Koreys tili',
        instructor: 'Osimxon Rahimjanov',
        instructorSlug: 'koreys-mutaxassisi',
        instructorBio: {
            uz: 'TOPIK 6 sohibi. Koreya universitetlariga grantlar yutish va til o\'rganishda yordam beradi. Janubiy Koreyada 4 yil yashab tahsil olgan.',
            en: 'TOPIK 6 holder. Helps win grants for Korean universities and learn the language. Studied and lived in South Korea for 4 years.'
        },
        instructorSkills: {
            uz: ['TOPIK tayyorgarlik', 'Koreys madaniyati', 'So\'zlashuv amaliyoti', 'Tarjima'],
            en: ['TOPIK Preparation', 'Korean Culture', 'Speaking Practice', 'Translation']
        },
        instructorEdu: {
            uz: 'Seul Milliy Universiteti (Talabalar almashinuvi)',
            en: 'Seoul National University (Exchange)'
        },
        instructorAchieve: {
            uz: 'GKS stipendiyasi g\'olibi',
            en: 'GKS Scholarship Winner'
        },
        rating: 5.0,
        students: 250,
        duration: '6 Oy',
        price: '299 000 UZS',
        oldPrice: '350 000 UZS',
        category: 'Til',
        image: koreanImg,
        instructorImg: img3216
    },
    {
        id: 10,
        title: 'Nemis tili',
        instructor: 'Nemis Tili O\'qituvchisi',
        instructorSlug: 'nemis-tili-oqituvchisi',
        instructorBio: {
            uz: 'Goethe-Zertifikat C1 sohibi. Nemis tili grammatikasini oson va mazmunli tushuntirib berishda juda mohir.',
            en: 'Goethe-Zertifikat C1 holder. Skilled in explaining German grammar clearly and meaningfully.'
        },
        instructorSkills: {
            uz: ['TestDaF tayyorgarlik', 'Nemis tili grammatikasi', 'Suhbatlashuv', 'Goethe imtihoniga tayyorlov'],
            en: ['TestDaF Preparation', 'German Grammar', 'Conversation', 'Goethe Exam Prep']
        },
        instructorEdu: {
            uz: 'Toshkent Davlat Sharqshunoslik Universiteti',
            en: 'Tashkent State University of Oriental Studies'
        },
        instructorAchieve: {
            uz: 'DAAD Alumni a\'zosi',
            en: 'DAAD Alumni Member'
        },
        rating: 5.0,
        students: 150,
        duration: '6 Oy',
        price: '350 000 UZS',
        category: 'Til',
        image: imgNemis,
        instructorImg: img3281
    }
];
