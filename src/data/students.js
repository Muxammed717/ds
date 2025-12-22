// Bu yerda barcha o'quvchilar ro'yxati saqlanadi.
// Yangi o'quvchi qo'shish uchun ro'yxatga yangi obyekt qo'shing.

// ID berish bo'yicha tavsiya: DS + YIL + TARTIB RAQAMI (Masalan: DS2025001)

export const mockStudents = [
    {
        id: 'DS2025',
        name: 'Abdullayev Botir',
        course: 'Frontend React Bootcamp',
        status: 'paid', // 'paid' - to'langan, 'unpaid' - to'lanmagan, 'pending' - kutilmoqda
        nextPayment: '2026-01-15'
    },
    {
        id: 'DS2026',
        name: 'Karimov Sardor',
        course: 'Python Backend Mastery',
        status: 'unpaid',
        nextPayment: '2025-12-20'
    },
    {
        id: 'DS2027',
        name: 'Tursunova Malika',
        course: 'UI/UX Design',
        status: 'pending',
        nextPayment: '2025-12-25'
    },
    // Yangi o'quvchini shu yerga qo'shing:
    /*
    {
        id: 'DS2025004',
        name: 'Ismingiz Familiyangiz',
        course: 'Kurs nomi',
        status: 'paid',
        nextPayment: '2026-02-01'
    },
    */
];
