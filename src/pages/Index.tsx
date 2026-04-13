import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // Dark mode toggle
    const t = document.querySelector('[data-theme-toggle]') as HTMLButtonElement | null;
    const r = document.documentElement;
    let d = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    r.setAttribute('data-theme', d);
    const sunIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    const moonIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    if (t) {
      t.innerHTML = d === 'dark' ? sunIcon : moonIcon;
      const handler = () => {
        d = d === 'dark' ? 'light' : 'dark';
        r.setAttribute('data-theme', d);
        t.innerHTML = d === 'dark' ? sunIcon : moonIcon;
      };
      t.addEventListener('click', handler);
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Service card last span fix for mobile
    const lastCard = document.querySelector('.service-card[data-wide]') as HTMLElement | null;
    function fixLastCard() {
      if (!lastCard) return;
      if (window.innerWidth <= 768) lastCard.style.gridColumn = 'span 1';
      else lastCard.style.gridColumn = 'span 3';
    }
    fixLastCard();
    window.addEventListener('resize', fixLastCard);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fixLastCard);
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('.form-submit') as HTMLButtonElement;
    btn.textContent = '✓ Заявка отправлена! Скоро свяжемся.';
    btn.style.background = '#437a22';
    btn.disabled = true;
  }

  return (
    <>
      {/* HEADER */}
      <header>
        <div className="header-inner">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Логотип Александра косметолог">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 22 C10 14 16 10 16 10 C16 10 22 14 22 22" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <circle cx="16" cy="10" r="2.5" fill="var(--color-primary)"/>
              <path d="M12 19 Q16 16 20 19" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            Александра
          </div>
          <div className="header-actions">
            <button className="theme-toggle" data-theme-toggle aria-label="Сменить тему">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <a href="#form" className="header-cta">Уточнить свободные даты →</a>
          </div>
        </div>
      </header>

      {/* БЛОК 1: HERO */}
      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="hero-content reveal">
            <div className="hero-eyebrow">✦ Эстетическая косметология в Артёме</div>
            <h1 className="hero-title">Твоя кожа заслуживает <em>большего</em></h1>
            <p className="hero-subtitle">Эстетическая косметология в Артёме. Результат виден уже после первой процедуры — без боли, без операций, без «заметного вмешательства».</p>
            <div className="hero-actions">
              <a href="#form" className="btn-primary">Уточнить свободные даты →</a>
              <a href="#services" className="btn-ghost">Смотреть услуги</a>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-dots">
                <span></span><span></span><span></span>
              </div>
              <span>Более 200 довольных клиентов в Артёме</span>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-card">
              <div className="hero-card-badge">Популярно сегодня</div>
              <div className="hero-card-title">Программа «Фарфоровая куколка»</div>
              <div className="hero-card-text">Глубокий детокс + сияние кожи за один визит. Ультразвуковая чистка и фонофорез с детокс-капсулами.</div>
              <div className="hero-card-stats">
                <div className="stat-item">
                  <div className="stat-num">1</div>
                  <div className="stat-label">визит</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">0</div>
                  <div className="stat-label">дискомфорта</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">7</div>
                  <div className="stat-label">процедур</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">∞</div>
                  <div className="stat-label">удовольствия</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 2: БОЛЬ */}
      <section className="pain-section" id="pain">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">Узнаёшь себя?</div>
            <h2 className="section-title">Знакомые ощущения?</h2>
          </div>
          <div className="pain-grid">
            <div className="pain-card reveal">
              <div className="pain-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </div>
              <div className="pain-card-text">
                <h3>Поры расширены, кожа тусклая</h3>
                <p>Тональный крем не помогает, вечером лицо выглядит «уставшим» уже к полудню</p>
              </div>
            </div>
            <div className="pain-card reveal">
              <div className="pain-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div className="pain-card-text">
                <h3>Овал «поплыл», появился второй подбородок</h3>
                <p>Фотографии в профиль всё меньше нравятся, контуры лица стали менее чёткими</p>
              </div>
            </div>
            <div className="pain-card reveal">
              <div className="pain-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="pain-card-text">
                <h3>Боишься инъекций, но хочешь выглядеть свежо</h3>
                <p>Не готова к уколам и операциям, но хочется видимого, долгосрочного результата</p>
              </div>
            </div>
            <div className="pain-card reveal">
              <div className="pain-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
              </div>
              <div className="pain-card-text">
                <h3>Руки выдают возраст</h3>
                <p>Даже когда лицо выглядит хорошо, руки «рассказывают» другую историю</p>
              </div>
            </div>
          </div>
          <div className="pain-conclusion reveal">
            <p>Ты не одна. 8 из 10 женщин, которые приходят впервые, говорят именно это.<br/>
            <strong>Хорошая новость: всё это решается без скальпеля и без страха.</strong></p>
          </div>
        </div>
      </section>

      {/* БЛОК 3: О МАСТЕРЕ */}
      <section id="about">
        <div className="container">
          <div className="about-inner">
            <div className="about-photo reveal">
              <div className="about-photo-placeholder">
                <div>
                  <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{margin:'0 auto var(--space-4)'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <p style={{fontSize:'var(--text-sm)'}}>Фото мастера</p>
                </div>
              </div>
              <div className="about-photo-badge">
                <div className="about-name">Александра</div>
                <div className="about-role">Косметолог · Артём</div>
              </div>
            </div>
            <div className="about-text reveal">
              <div className="about-eyebrow">Косметолог, которому доверяют лицо</div>
              <h2 className="about-title">Привет, я — Александра</h2>
              <div className="about-principle">
                «Кожа должна выглядеть ухоженно, а не "сделанно"»
              </div>
              <p style={{fontSize:'var(--text-base)',color:'var(--color-text-muted)',marginBottom:'var(--space-6)',lineHeight:'1.7'}}>
                Я специализируюсь на эстетической косметологии — от базового ухода до аппаратных методик омоложения. Работаю в уютном кабинете без очередей и спешки: каждый клиент получает полное внимание и индивидуальный протокол.
              </p>
              <ul className="about-list">
                <li>Только сертифицированные аппараты и профессиональная косметика</li>
                <li>Индивидуальный протокол для каждого клиента</li>
                <li>Уютный кабинет — без очередей и спешки</li>
              </ul>
              <a href="#form" className="btn-primary">Уточнить свободные даты →</a>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 4: УСЛУГИ */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">Услуги</div>
            <h2 className="section-title">Что я предлагаю</h2>
            <p className="section-subtitle">7 проверенных методик — от деликатного ухода до аппаратного омоложения</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-num">01</div>
              <div className="service-title">Чистка лица</div>
              <p className="service-desc">Глубокое очищение пор, удаление комедонов и загрязнений. Кожа буквально дышит после процедуры. Подходит для всех типов кожи, включая чувствительную.</p>
              <div className="service-result">✦ Чистая, свежая кожа уже в день процедуры</div>
            </div>
            <div className="service-card reveal">
              <div className="service-num">02</div>
              <div className="service-title">Гидропилинг</div>
              <p className="service-desc">Инновационная аппаратная процедура: вакуум мягко очищает поры, одновременно насыщая кожу питательными сыворотками. Никакого дискомфорта — только ощущение обновлённой кожи.</p>
              <div className="service-result">✦ Сужение пор, выравнивание рельефа, сияние</div>
            </div>
            <div className="service-card reveal">
              <div className="service-num">03</div>
              <div className="service-title">Пилинги</div>
              <p className="service-desc">Химические пилинги на кислотах (гликолевый, салициловый, миндальный, ретиноевый) — подбираем тип и концентрацию индивидуально. Устраняют пигментацию, постакне, выравнивают тон.</p>
              <div className="service-result">✦ Обновлённая, ровная кожа с видимым сиянием</div>
            </div>
            <div className="service-card reveal">
              <div className="service-num">04</div>
              <div className="service-title">Микронидлинг (Дермапен)</div>
              <p className="service-desc">Микроиглы создают каналы в коже — это запускает выработку собственного коллагена и эластина. Одновременно вводятся лечебные сыворотки глубоко в дерму. Работает там, куда крем никогда не доберётся.</p>
              <div className="service-result">✦ Подтяжка, уменьшение морщин, устранение постакне</div>
            </div>
            <div className="service-card reveal">
              <div className="service-num">05</div>
              <div className="service-title">Массаж лица</div>
              <p className="service-desc">Буккальный, скульптурный, лимфодренажный — выбираем технику под твою задачу. Подтягивает овал, снимает отёки, возвращает чёткие контуры без единого укола.</p>
              <div className="service-result">✦ Лифтинг, свежесть, естественная красота — видно сразу</div>
            </div>
            <div className="service-card reveal">
              <div className="service-num">06</div>
              <div className="service-title">Микротоки</div>
              <p className="service-desc">Слабые электрические импульсы тонизируют мышцы лица, запускают лимфодренаж и синтез коллагена. «Фитнес для лица» — результат накапливается и держится.</p>
              <div className="service-result">✦ Подтянутые контуры, здоровый цвет лица</div>
            </div>
            <div className="service-card reveal" data-wide style={{gridColumn:'span 3'}}>
              <div className="service-num">07</div>
              <div className="service-title">РФ-лифтинг</div>
              <p className="service-desc" style={{maxWidth:'60ch'}}>Радиочастотное тепловое воздействие нагревает глубокие слои кожи — коллаген сокращается, запускается процесс омоложения изнутри. Безоперационная подтяжка лица, шеи и декольте.</p>
              <div className="service-result">✦ Подтянутый овал, устранение брылей и второго подбородка — без уколов</div>
            </div>
          </div>
          <div className="services-cta-row reveal">
            <a href="#form" className="btn-primary">Уточнить свободные даты →</a>
          </div>
        </div>
      </section>

      {/* БЛОК 5: ПРОГРАММЫ */}
      <section id="programs">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">Уходовые программы</div>
            <h2 className="section-title">Готовые программы — для тех, кто хочет максимум</h2>
            <p className="section-subtitle">Если хочешь не просто одну процедуру, а полноценный результат — выбирай программу. Эффект от процедур усиливает друг друга.</p>
          </div>
          <div className="programs-grid">
            <div className="program-card reveal">
              <div className="program-badge">Хит</div>
              <div className="program-title">🌿 Релакс</div>
              <div className="program-composition">Ультразвуковая чистка + пилинг + массаж лица + маска</div>
              <p className="program-desc">Идеальная программа для тех, кто давно не баловал себя уходом или просто хочет «перезагрузиться». Полный цикл за один визит: очищение, обновление, расслабление, питание.</p>
              <p className="program-fits"><strong>Подходит:</strong> всем типам кожи, особенно уставшей и тусклой.</p>
              <div className="program-effect">✨ Ощущение после: как будто поменяла кожу</div>
            </div>
            <div className="program-card reveal">
              <div className="program-badge">Сияние</div>
              <div className="program-title">🤍 Фарфоровая куколка</div>
              <div className="program-composition">Ультразвуковая чистка + фонофорез с детокс-капсулами</div>
              <p className="program-desc">Аппаратная программа для глубокого детокса и сияния. Ультразвук открывает каналы в коже, фонофорез доставляет детокс-капсулы точно в дерму. Кожа становится светлой, ровной и буквально светится изнутри.</p>
              <p className="program-fits"><strong>Подходит:</strong> тусклая, пористая кожа, усталость после стресса.</p>
              <div className="program-effect">✨ Фарфоровая текстура, детокс, внутреннее сияние</div>
            </div>
            <div className="program-card reveal">
              <div className="program-badge">Интенсив</div>
              <div className="program-title">💧 Глубокое увлажнение</div>
              <div className="program-composition">Ультразвуковая чистка + пилинг + микронидлинг</div>
              <p className="program-desc">Трёхступенчатая программа интенсивного обновления. Сначала очищаем и подготавливаем кожу, затем дермапен доставляет сыворотку с гиалуроновой кислотой в глубокие слои. Эффект держится неделями.</p>
              <p className="program-fits"><strong>Подходит:</strong> сухая, обезвоженная кожа, первые признаки старения.</p>
              <div className="program-effect">✨ Кожа как после капельницы — наполненная, упругая, молодая</div>
            </div>
            <div className="program-card reveal">
              <div className="program-badge">Уход</div>
              <div className="program-title">💅 Спа для рук</div>
              <div className="program-composition">Пилинг + питательная маска + массаж рук + уход за кутикулой</div>
              <p className="program-desc">Руки выдают возраст быстрее лица. Процедура включает уход за кутикулой, пилинг, питательную маску, массаж — кожа становится мягкой, ухоженной и нежной.</p>
              <p className="program-fits"><strong>Подходит:</strong> для регулярного ухода, особенно в холодное время года.</p>
              <div className="program-effect">✨ Молодые, ухоженные руки после первого сеанса</div>
            </div>
          </div>
          <div className="services-cta-row reveal">
            <a href="#form" className="btn-primary">Уточнить свободные даты →</a>
          </div>
        </div>
      </section>

      {/* БЛОК 6: ПОЧЕМУ Я */}
      <section className="why-section" id="why">
        <div className="container">
          <div className="why-inner">
            <div>
              <div className="section-eyebrow reveal">Почему я</div>
              <h2 className="section-title reveal" style={{marginBottom:'var(--space-8)'}}>Почему клиенты возвращаются снова</h2>
              <ul className="why-list">
                <li className="why-item reveal">
                  <div className="why-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div className="why-item-text">
                    <h3>Индивидуальный подход</h3>
                    <p>Никаких шаблонных протоколов — только твоя кожа, твои задачи и твой результат</p>
                  </div>
                </li>
                <li className="why-item reveal">
                  <div className="why-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div className="why-item-text">
                    <h3>Честность</h3>
                    <p>Честно скажу, что тебе нужно, а что — нет. Без давления и лишних трат</p>
                  </div>
                </li>
                <li className="why-item reveal">
                  <div className="why-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  </div>
                  <div className="why-item-text">
                    <h3>Только сертифицированное оборудование</h3>
                    <p>Аппараты с подтверждённой эффективностью и профессиональная косметика</p>
                  </div>
                </li>
                <li className="why-item reveal">
                  <div className="why-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </div>
                  <div className="why-item-text">
                    <h3>Комфортно и безопасно</h3>
                    <p>Как у хорошей подруги — но с сертификатом. Без стресса и спешки</p>
                  </div>
                </li>
              </ul>
              <a href="#form" className="btn-primary reveal">Уточнить свободные даты →</a>
            </div>
            <div className="why-visual reveal">
              <div className="why-stat-card">
                <div className="why-stat-num">200+</div>
                <div className="why-stat-label">довольных клиентов</div>
              </div>
              <div className="why-stat-card">
                <div className="why-stat-num">7</div>
                <div className="why-stat-label">аппаратных и ручных методик</div>
              </div>
              <div className="why-stat-card">
                <div className="why-stat-num">98%</div>
                <div className="why-stat-label">клиентов приходят снова</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 7: ОТЗЫВЫ */}
      <section id="reviews">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">Отзывы</div>
            <h2 className="section-title">Что говорят клиенты</h2>
          </div>
          <div className="reviews-grid">
            <div className="review-card reveal">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">«Пришла с жирной кожей и комедонами — ушла с ощущением новой кожи. Через курс из 5 процедур поры уменьшились вдвое. Теперь хожу только сюда»</p>
              <div className="review-author">
                <div className="review-avatar">А</div>
                <div>
                  <div className="review-name">Алина</div>
                  <div className="review-meta">28 лет · Чистка лица</div>
                </div>
              </div>
            </div>
            <div className="review-card reveal">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">«Боялась микронидлинга как огня. Оказалось — почти не больно, а результат шокировал. Постакне, которое не уходило 3 года, прошло за 4 сеанса»</p>
              <div className="review-author">
                <div className="review-avatar">Е</div>
                <div>
                  <div className="review-name">Екатерина</div>
                  <div className="review-meta">34 года · Микронидлинг</div>
                </div>
              </div>
            </div>
            <div className="review-card reveal">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">«РФ-лифтинг — моя находка. Второй подбородок ушёл, овал подтянулся. Подруги спрашивают, что я сделала. Говорю: просто нашла хорошего косметолога»</p>
              <div className="review-author">
                <div className="review-avatar">М</div>
                <div>
                  <div className="review-name">Марина</div>
                  <div className="review-meta">42 года · РФ-лифтинг</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 8: АКЦИЯ */}
      <section className="promo-section" id="promo">
        <div className="container">
          <div className="promo-inner">
            <div className="reveal">
              <div className="section-eyebrow">Специальное предложение</div>
              <h2 className="promo-title">Запишись сегодня — и получи бонус</h2>
              <p className="promo-text">Первичная консультация — бесплатно. Я изучу состояние кожи, отвечу на все вопросы и составлю индивидуальный план ухода — без давления и навязывания.</p>
              <ul className="promo-perks">
                <li>Бесплатная первичная консультация</li>
                <li>Скидка 10% при записи онлайн</li>
                <li>Индивидуальный план ухода в подарок</li>
              </ul>
              <a href="#form" className="btn-primary">Уточнить свободные даты →</a>
            </div>
            <div className="promo-gift reveal">
              <div className="promo-gift-emoji">🎁</div>
              <div className="promo-gift-title">Бесплатная консультация</div>
              <p className="promo-gift-text">Узнай, какие процедуры подойдут именно твоей коже — без обязательств и давления</p>
              <a href="#form" className="btn-primary" style={{width:'100%',justifyContent:'center'}}>Записаться →</a>
              <p className="promo-timer">⏳ Количество мест ограничено — свободные окошки разбирают быстро</p>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 9: ФОРМА */}
      <section className="form-section" id="form">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">Запись</div>
            <h2 className="section-title">Начни заботиться о себе прямо сейчас</h2>
            <p className="section-subtitle">Не жди «идеального момента». Твоя кожа начнёт меняться с первого визита.</p>
          </div>
          <div className="form-wrap reveal">
            <div className="form-title">Оставь заявку</div>
            <p className="form-subtitle">Отвечу в течение 1 часа и подберём удобное время</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Ваше имя</label>
                <input className="form-input" type="text" id="name" placeholder="Как к вам обращаться?" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Телефон</label>
                <input className="form-input" type="tel" id="phone" placeholder="+7 (___) ___-__-__" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="service">Какая процедура интересует</label>
                <select className="form-select" id="service">
                  <option value="">— Выберите процедуру —</option>
                  <optgroup label="Процедуры">
                    <option>Чистка лица</option>
                    <option>Гидропилинг (аппаратная вакуумная чистка)</option>
                    <option>Пилинги</option>
                    <option>Микронидлинг (Дермапен)</option>
                    <option>Массаж лица</option>
                    <option>Микротоки</option>
                    <option>РФ-лифтинг</option>
                  </optgroup>
                  <optgroup label="Уходовые программы">
                    <option>Программа «Релакс»</option>
                    <option>Программа «Фарфоровая куколка»</option>
                    <option>Программа «Глубокое увлажнение»</option>
                    <option>Спа для рук</option>
                  </optgroup>
                  <option>Не знаю — нужна консультация</option>
                </select>
              </div>
              <button type="submit" className="form-submit">[ ЗАПИСАТЬСЯ БЕСПЛАТНО → ]</button>
              <div className="form-divider">или</div>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="tg-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.5l-2.946-.924c-.64-.203-.654-.64.136-.954l11.49-4.43c.534-.194 1.001.13.044.029z"/></svg>
                Написать в Telegram
              </a>
              <p className="form-privacy">🔒 Данные защищены. Не передаём третьим лицам.</p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Александра</div>
            <p className="footer-desc">Эстетическая косметология в Артёме. Результат — без боли и страха.</p>
            <div className="footer-social">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.5l-2.946-.924c-.64-.203-.654-.64.136-.954l11.49-4.43c.534-.194 1.001.13.044.029z"/></svg>
              </a>
              <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.26h-1.7c-.64 0-.84-.51-1.99-1.67-1-.98-1.44-.98-1.7-.98-.35 0-.45.1-.45.6v1.52c0 .43-.14.69-1.26.69-1.86 0-3.92-1.12-5.37-3.22C4.47 9.82 4 7.81 4 7.38c0-.26.1-.5.6-.5h1.7c.45 0 .62.2.79.68.87 2.5 2.32 4.69 2.92 4.69.22 0 .32-.1.32-.65V9.14c-.07-1.17-.68-1.27-.68-1.69 0-.2.16-.4.42-.4h2.68c.38 0 .51.2.51.64v3.44c0 .38.17.51.28.51.22 0 .41-.13.82-.54 1.27-1.42 2.18-3.6 2.18-3.6.12-.26.32-.5.77-.5h1.7c.51 0 .62.26.51.64-.22 1.01-2.37 4.06-2.37 4.06-.19.3-.26.44 0 .77.19.26.81.8 1.22 1.29.76.87 1.34 1.6 1.5 2.1.15.51-.12.77-.63.77z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Контакты</div>
            <ul className="footer-contact-list">
              <li>📍 г. Артём, ул. Фрунзе, 60</li>
              <li>📞 <a href="tel:+79084602924" style={{color:'var(--color-primary)'}}>+7-908-460-29-24</a></li>
              <li>✈️ <a href="https://t.me/" target="_blank" style={{color:'var(--color-primary)'}}>Telegram-канал</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Услуги</div>
            <ul className="footer-contact-list">
              <li><a href="#services" style={{color:'var(--color-text-muted)'}}>Чистка лица</a></li>
              <li><a href="#services" style={{color:'var(--color-text-muted)'}}>Гидропилинг</a></li>
              <li><a href="#services" style={{color:'var(--color-text-muted)'}}>Микронидлинг</a></li>
              <li><a href="#services" style={{color:'var(--color-text-muted)'}}>РФ-лифтинг</a></li>
              <li><a href="#programs" style={{color:'var(--color-text-muted)'}}>Уходовые программы</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">© 2026 Александра · Эстетическая косметология · Артём</p>
          <p className="footer-legal">ИНН / ОГРНИП: [укажите]</p>
        </div>
        <div className="footer-warn">
          ⚠️ Имеются противопоказания. Требуется консультация специалиста. Процедуры выполняются после личной консультации и оценки состояния кожи.
        </div>
      </footer>
    </>
  );
}
