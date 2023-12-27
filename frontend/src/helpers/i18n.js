import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    my_account: 'My Account',
                    all: 'All',
                    new: 'New',
                    about: 'About',
                    account: 'Account',
                    no_orders_yet: 'You haven\'t placed any orders yet.',
                    shop_now: "Shop now",
                    order_history: "Order History",
                    logout: "Logout",
                    cart: "Cart",
                    size: 'Size',
                    subtotal: 'Subtotal',
                    proceed_with_order: "Proceed with Order",
                    checkout: "Checkout",
                    contact: "Contact",
                    delivery: "Delivery",
                    complete_order: "Complete Order",
                    error404: "404 Error :(",
                    error404text: "We couldn't find the requested URL on our server.",
                    error404back: "Go back to App",
                    filter: "Filter",
                    low_to_high: "Low To High",
                    high_to_low: "High to Low",
                    order_by: "Order By",
                    add_to_cart: "Add to Cart",
                    login: "Login",
                    register: "Register",
                    login_text: "New to SOLDI? Create an account",
                    register_text: "Already have an account? Log in",
                    about_us_text1: "SOLDI is a brand of comfortable basic clothes made in Ukraine. It was founded by Dasha Katsurina and Misha Katsurin in 2015.\n",
                    about_us_text2: "Dasha sewed her first down jacket out of a duvet to impress her future husband on a date. After seeing the enthusiastic comments from friends and subscribers, she decided to create a whole collection. Comfortable, warm and stylish down jackets-blankets became the basis of SOLDI's DNA.",
                    about_us_text3: "The first casual collection called \"Workwear\" came out in 2018, followed by the \"Voyage\" summer line with a capsule wardrobe for leisure, and by the \"Basic\" collection of comfortable homewear later on.\n"
                },
            },
            ua: {
                translation: {
                    my_account: 'Мій Аккаунт',
                    all: 'Всі',
                    new: 'Нові',
                    about: 'Про нас',
                    account: 'Аккаунт',
                    no_orders_yet: 'У вас поки немає замовлень.',
                    shop_now: 'До магазину',
                    order_history: "Історія покупок",
                    logout: "Вихід",
                    cart: "Корзина",
                    size: "Розмір",
                    subtotal: 'Загальна сума',
                    proceed_with_order: 'Продовжити',
                    checkout: "Оформлення",
                    contact: "Контакти",
                    delivery: "Доставка",
                    complete_order: "Завершити замовлення",
                    error404: "Помилка 404 :(",
                    error404text: "Ми не змогли знайти це посилання на нашому сервері.",
                    error404back: "Повернутись до магазину",
                    filter: "Фільтр",
                    low_to_high: "Від Найменшої",
                    high_to_low: "Від Найбільшої",
                    order_by: "Сортування",
                    add_to_cart: "Додати до корзини",
                    login: "Авторизація",
                    register: "Реєстрація",
                    login_text: "Новий користувач SOLDI? Створіть обліковий запис",
                    register_text: "Вже маєте обліковий запис? Авторизуйтесь",
                    about_us_text1: "SOLDI – бренд зручного базового одягу українського виробництва. Його заснували Даша Кацуріна та Міша Кацурін у 2015 році.",
                    about_us_text2: "Свій перший пуховик Даша пошила з пухової ковдри, щоб вразити майбутнього чоловіка на побаченні. Побачивши захоплені коментарі друзів і передплатників, вона вирішила створити цілу колекцію. Комфортні, теплі та стильні пуховики-ковдри стали основою ДНК SOLDI.",
                    about_us_text3: "У 2018 році вийшла перша повсякденна колекція «Workwear», потім літня лінія «Voyage» з капсульним гардеробом для відпочинку, а пізніше — колекція зручного домашнього одягу «Basic»."
                },
            },
        },
        lng: 'ua',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
