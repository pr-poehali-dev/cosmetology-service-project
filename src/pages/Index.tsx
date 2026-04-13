import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/035a812e-0b57-4b0d-bfee-fe71e6d535d6/files/da311707-eba5-42b5-90bc-a98d391c2d03.jpg";

const services = [
  { icon: "Sparkles", title: "Чистка лица", desc: "Глубокое очищение пор, ультразвуковая и механическая чистка", price: "от 3 500 ₽", duration: "90 мин" },
  { icon: "Zap", title: "Лазерная эпиляция", desc: "Удаление нежелательных волос на любых участках тела", price: "от 1 200 ₽", duration: "30–120 мин" },
  { icon: "Droplets", title: "Биоревитализация", desc: "Инъекции гиалуроновой кислоты для увлажнения и омоложения", price: "от 7 000 ₽", duration: "60 мин" },
  { icon: "Star", title: "Мезотерапия", desc: "Коктейли витаминов и микроэлементов для кожи", price: "от 5 500 ₽", duration: "60 мин" },
  { icon: "Sun", title: "Фотоомоложение", desc: "IPL-терапия для выравнивания тона и структуры кожи", price: "от 4 000 ₽", duration: "45 мин" },
  { icon: "Heart", title: "Контурная пластика", desc: "Филлеры на основе гиалуроновой кислоты для коррекции", price: "от 12 000 ₽", duration: "60 мин" },
];

const portfolio = [
  { before: "Фото ДО", after: "Фото ПОСЛЕ", label: "Биоревитализация", result: "Увлажнение и сияние" },
  { before: "Фото ДО", after: "Фото ПОСЛЕ", label: "Контурная пластика", result: "Коррекция овала" },
  { before: "Фото ДО", after: "Фото ПОСЛЕ", label: "Мезотерапия", result: "Омоложение кожи" },
];

const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const stats = [
  { value: "8+", label: "лет опыта" },
  { value: "2 400", label: "клиентов" },
  { value: "98%", label: "довольны результатом" },
  { value: "15+", label: "процедур" },
];

const faqs = [
  { q: "Нужна ли консультация перед процедурой?", a: "Да, первичная консультация косметолога входит в стоимость любой процедуры и проходит перед её началом." },
  { q: "Как подготовиться к лазерной эпиляции?", a: "Побрейте зону обработки за 1–2 дня, избегайте загара 2 недели. Мы пришлём полную памятку после записи." },
  { q: "Болезненны ли инъекционные процедуры?", a: "Мы используем современные препараты с анестетиком и местную анестезию. Дискомфорт минимален." },
  { q: "Сколько сеансов нужно?", a: "Зависит от процедуры и задачи. Косметолог составит индивидуальный план на консультации." },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("home");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "about", label: "О кабинете" },
    { id: "portfolio", label: "Портфолио" },
    { id: "booking", label: "Запись" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDone(true);
  };

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      value: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
      day: d.toLocaleDateString("ru-RU", { weekday: "short" }),
    };
  });

  return (
    <div className="min-h-screen bg-white font-golos overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <span className="font-cormorant text-2xl font-semibold gradient-text">Beauty Studio</span>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeNav === l.id
                    ? "gradient-brand text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-purple-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("booking")}
            className="hidden md:block shimmer-btn text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Записаться
          </button>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} className="text-gray-700" />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass-white border-t border-white/30 px-4 py-4 flex flex-col gap-2">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-50 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="shimmer-btn text-white px-5 py-3 rounded-full text-sm font-semibold mt-2"
            >
              Записаться онлайн
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-90 z-0" />
        <div
          className="absolute inset-0 z-0 mix-blend-overlay opacity-30"
          style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 z-0" style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(92,53,204,0.5) 0%, transparent 60%)"
        }} />

        {/* decorative blobs */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20 animate-float"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15 animate-float"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)", animationDelay: "2s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass text-white/90 px-4 py-2 rounded-full text-sm mb-6 animate-fade-up">
              <Icon name="Sparkles" size={14} />
              <span>Профессиональная косметология</span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl text-white font-light leading-tight mb-6 animate-fade-up animate-delay-100">
              Красота,<br />
              <span className="italic font-medium">которой доверяют</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-md animate-fade-up animate-delay-200">
              Современные процедуры для вашей кожи. Индивидуальный подход, сертифицированные специалисты, результат, который заметят все.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-300">
              <button
                onClick={() => scrollTo("booking")}
                className="glass text-white border border-white/30 px-8 py-4 rounded-full text-base font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Записаться онлайн
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="text-white/80 px-8 py-4 rounded-full text-base font-medium hover:text-white transition-colors flex items-center gap-2"
              >
                Услуги <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-4 animate-fade-up animate-delay-400">
            <div className="glass rounded-3xl p-6 text-white">
              <div className="grid grid-cols-2 gap-4">
                {stats.map(s => (
                  <div key={s.value} className="text-center">
                    <div className="font-cormorant text-4xl font-semibold text-gold">{s.value}</div>
                    <div className="text-white/70 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-3xl p-5 text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                <Icon name="Award" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Сертифицированный косметолог</div>
                <div className="text-white/60 text-xs mt-0.5">Диплом международного класса, 8 лет практики</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce z-10">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* STATS mobile */}
      <section className="md:hidden gradient-brand py-8 px-4">
        <div className="grid grid-cols-2 gap-6">
          {stats.map(s => (
            <div key={s.value} className="text-center text-white">
              <div className="font-cormorant text-3xl font-semibold text-gold">{s.value}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding bg-gradient-to-b from-white to-purple-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase gradient-text">Наши услуги</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light mt-2 text-gray-900">
              Процедуры для вашей красоты
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Каждая процедура разработана для конкретного результата. Консультация — бесплатно.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`hover-lift cursor-pointer rounded-3xl p-6 border transition-all duration-300 ${
                  selectedService === s.title
                    ? "gradient-brand text-white border-transparent shadow-2xl"
                    : "bg-white border-purple-100 hover:border-purple-200"
                }`}
                onClick={() => {
                  setSelectedService(s.title);
                  scrollTo("booking");
                }}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  selectedService === s.title ? "bg-white/20" : "gradient-brand"
                }`}>
                  <Icon name={s.icon} size={22} className="text-white" fallback="Star" />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${selectedService === s.title ? "text-white" : "text-gray-900"}`}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${selectedService === s.title ? "text-white/80" : "text-gray-500"}`}>
                  {s.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${selectedService === s.title ? "text-gold" : "gradient-text"}`}>
                    {s.price}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${selectedService === s.title ? "text-white/60" : "text-gray-400"}`}>
                    <Icon name="Clock" size={12} /> {s.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 gradient-brand rounded-3xl opacity-10 blur-2xl" />
            <img
              src={HERO_IMG}
              alt="О кабинете"
              className="relative rounded-3xl w-full h-96 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 glass-white rounded-2xl p-5 shadow-xl border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">Безопасность</div>
                  <div className="text-xs text-gray-500">Сертифицированные препараты</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold tracking-widest uppercase gradient-text">О нас</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light mt-2 mb-6 text-gray-900 leading-tight">
              Кабинет, где<br /><span className="italic">заботятся о вас</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Beauty Studio — это современный косметологический кабинет, где каждая процедура подбирается индивидуально. Мы работаем только с сертифицированными препаратами и оборудованием ведущих брендов.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Наш специалист имеет международный сертификат и более 8 лет практического опыта. Вы в надёжных руках.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Award", text: "Международный сертификат" },
                { icon: "Microscope", text: "Медицинское оборудование" },
                { icon: "Users", text: "Индивидуальный подход" },
                { icon: "Clock", text: "Запись онлайн 24/7" },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50/50">
                  <div className="w-8 h-8 gradient-brand rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={f.icon} size={15} className="text-white" fallback="Check" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section-padding bg-gradient-to-b from-purple-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase gradient-text">Результаты</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light mt-2 text-gray-900">
              До и после
            </h2>
            <p className="text-gray-500 mt-4">Реальные результаты наших клиентов</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <div key={i} className="hover-lift rounded-3xl overflow-hidden border border-purple-100 bg-white shadow-sm">
                <div className="grid grid-cols-2 h-56">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                    <div className="text-center">
                      <Icon name="ImageOff" size={28} className="text-purple-300 mx-auto mb-2" />
                      <span className="text-xs text-purple-400 font-medium">До</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-white/80 text-xs px-2 py-1 rounded-full text-gray-600">ДО</div>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100">
                    <div className="text-center">
                      <Icon name="ImageOff" size={28} className="text-pink-300 mx-auto mb-2" />
                      <span className="text-xs text-pink-400 font-medium">После</span>
                    </div>
                    <div className="absolute top-2 right-2 gradient-brand text-white text-xs px-2 py-1 rounded-full">ПОСЛЕ</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-semibold text-gray-900 mb-1">{p.label}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Icon name="TrendingUp" size={13} className="text-pink-400" />
                    {p.result}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            * Фотографии клиентов размещаются с их письменного согласия
          </p>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold tracking-widest uppercase text-white/60">Онлайн-запись</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light mt-2 text-white">
              Запишитесь прямо сейчас
            </h2>
            <p className="text-white/70 mt-3">Выберите процедуру, дату и удобное время</p>
          </div>

          {bookingDone ? (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} className="text-white" />
              </div>
              <h3 className="font-cormorant text-3xl text-white font-medium mb-3">Вы записаны!</h3>
              <p className="text-white/70 mb-2">Ждём вас <strong className="text-white">{selectedDate}</strong> в <strong className="text-white">{selectedTime}</strong></p>
              <p className="text-white/60 text-sm">Мы отправим подтверждение и напоминание</p>
              <button
                className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
                onClick={() => { setBookingDone(false); setName(""); setPhone(""); setSelectedDate(""); setSelectedTime(""); }}
              >
                Записаться ещё раз
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="glass rounded-3xl p-6 md:p-10 space-y-6">
              {/* Service */}
              <div>
                <label className="text-white/80 text-sm font-medium mb-3 block">Процедура</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {services.map(s => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setSelectedService(s.title)}
                      className={`px-3 py-2 rounded-2xl text-sm font-medium text-left transition-all duration-200 ${
                        selectedService === s.title
                          ? "bg-white text-purple-700 shadow-lg"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-white/80 text-sm font-medium mb-3 block">Дата</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map(d => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.label)}
                      className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl transition-all duration-200 ${
                        selectedDate === d.label
                          ? "bg-white text-purple-700 shadow-lg"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      <span className="text-xs uppercase">{d.day}</span>
                      <span className="font-semibold text-sm mt-1">{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="text-white/80 text-sm font-medium mb-3 block">Время</label>
                <div className="grid grid-cols-5 gap-2">
                  {times.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedTime === t
                          ? "bg-white text-purple-700 shadow-lg"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contacts */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Ваше имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Анна"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-2xl px-4 py-3 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Телефон</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-2xl px-4 py-3 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedService || !selectedDate || !selectedTime}
                className="w-full bg-white text-purple-700 py-4 rounded-2xl font-bold text-base hover:bg-white/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Подтвердить запись
              </button>
              <p className="text-center text-white/40 text-xs">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase gradient-text">FAQ</span>
            <h2 className="font-cormorant text-4xl font-light mt-2 text-gray-900">Частые вопросы</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  openFaq === i ? "border-purple-200 bg-purple-50/50" : "border-gray-100 bg-white"
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-medium text-gray-900"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={18}
                    className={`flex-shrink-0 ml-4 transition-colors ${openFaq === i ? "text-purple-500" : "text-gray-400"}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="section-padding bg-gradient-to-b from-purple-50/30 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-sm font-semibold tracking-widest uppercase gradient-text">Контакты</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light mt-2 mb-8 text-gray-900">
              Мы всегда<br /><span className="italic">на связи</span>
            </h2>

            <div className="space-y-5">
              {[
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Красоты, 12, офис 34" },
                { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "Mail", label: "Email", value: "hello@beautystudio.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 10:00–20:00, Вс: 11:00–18:00" },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 gradient-brand rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon name={c.icon} size={18} className="text-white" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{c.label}</div>
                    <div className="text-gray-800 font-medium mt-0.5">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              {[
                { icon: "Instagram", label: "Instagram" },
                { icon: "MessageCircle", label: "WhatsApp" },
                { icon: "Send", label: "Telegram" },
              ].map(s => (
                <button
                  key={s.label}
                  className="w-11 h-11 gradient-brand rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                >
                  <Icon name={s.icon} size={18} className="text-white" fallback="ExternalLink" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-purple-50 h-80 flex items-center justify-center border border-purple-100 relative">
            <div className="text-center">
              <Icon name="Map" size={48} className="text-purple-200 mx-auto mb-3" />
              <p className="text-purple-300 font-medium">Карта будет здесь</p>
              <p className="text-purple-200 text-sm mt-1">г. Москва, ул. Красоты, 12</p>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => scrollTo("booking")}
                className="shimmer-btn text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="gradient-brand py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-semibold text-white">Beauty Studio</span>
          <p className="text-white/50 text-sm">© 2025 Beauty Studio. Все права защищены.</p>
          <button
            onClick={() => scrollTo("booking")}
            className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            Записаться онлайн
          </button>
        </div>
      </footer>
    </div>
  );
}