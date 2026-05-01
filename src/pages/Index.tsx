import { useEffect, useState } from "react";

export default function Index() {
  const [modal, setModal] = useState<'privacy' | 'consent' | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
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
            <img src="https://cdn.poehali.dev/files/96710f67-2945-4d7a-8537-a866ce300658.png" alt="SO студия красоты" style={{width: 104, height: 104, objectFit: 'contain', flexShrink: 0}} />
            <span style={{fontSize: 'var(--text-xs)', fontWeight: 400, letterSpacing: '0.12em', color: 'var(--color-text-inverse)', textTransform: 'uppercase', opacity: 0.85}}>Эстетическая косметология</span>
          </div>
          <nav className="header-nav">
            <a href="#about" className="header-nav-link">Обо мне</a>
            <a href="#services" className="header-nav-link">Услуги</a>
            <a href="#programs" className="header-nav-link">Программы</a>
            <a href="#reviews" className="header-nav-link">Отзывы</a>
            <a href="#form" className="header-nav-link">Запись</a>
          </nav>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
            <button className="theme-toggle" data-theme-toggle aria-label="Сменить тему">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <button className="burger" aria-label="Меню" onClick={() => setMenuOpen(o => !o)}>
              <span className={`burger-line${menuOpen ? ' open' : ''}`} />
              <span className={`burger-line${menuOpen ? ' open' : ''}`} />
              <span className={`burger-line${menuOpen ? ' open' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#about" className="mobile-menu-link">Обо мне</a>
          <a href="#services" className="mobile-menu-link">Услуги</a>
          <a href="#programs" className="mobile-menu-link">Программы</a>
          <a href="#reviews" className="mobile-menu-link">Отзывы</a>
          <a href="#form" className="mobile-menu-link">Запись</a>
        </div>
      )}

      {/* БЛОК 1: HERO */}
      <section className="hero" id="top">
        <video
          className="hero-video"
          src="https://cdn.poehali.dev/projects/035a812e-0b57-4b0d-bfee-fe71e6d535d6/bucket/20688edd-4653-48ab-ab87-f5a0765fa651.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-video-overlay" />
        <div className="hero-inner">
          <div className="hero-content reveal">
            <div className="hero-eyebrow">✦ Эстетическая косметология в Артёме</div>
            <h1 className="hero-title">Никто не догадается. <em>Все заметят.</em></h1>
            <p className="hero-subtitle">Один визит — и ты уже другая!</p>
            <div className="hero-actions">
              <a href="#form" className="btn-primary">Записаться</a>
              <a href="#services" className="btn-ghost">Смотреть услуги</a>
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
              <div className="pain-icon" style={{background:'transparent', flexShrink:0}}>
                <svg className="program-icon-3d" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#9f72b0"/>
                  <path d="M32 18c-3.87 0-7 3.13-7 7 0 2.61 1.43 4.88 3.54 6.12L27 44h10l-1.54-12.88C37.57 29.88 39 27.61 39 25c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" fill="white"/>
                  <ellipse cx="32" cy="44" rx="5" ry="2" fill="rgba(255,255,255,0.3)"/>
                </svg>
              </div>
              <div className="pain-card-text">
                <h3>Поры расширены, кожа тусклая</h3>
                <p>Тональный крем не помогает, вечером лицо выглядит «уставшим» уже к полудню</p>
              </div>
            </div>
            <div className="pain-card reveal">
              <div className="pain-icon" style={{background:'transparent', flexShrink:0}}>
                <svg className="program-icon-3d" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#9f72b0"/>
                  <rect x="18" y="16" width="28" height="32" rx="3" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="2"/>
                  <ellipse cx="32" cy="28" rx="7" ry="8" fill="white" opacity="0.9"/>
                  <path d="M25 36c0-3.87 3.13-5 7-5s7 1.13 7 5" fill="white" opacity="0.6"/>
                  <path d="M24 20l16 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="pain-card-text">
                <h3>Овал «поплыл», появился второй подбородок</h3>
                <p>Фотографии в профиль всё меньше нравятся, контуры лица стали менее чёткими</p>
              </div>
            </div>
            <div className="pain-card reveal">
              <div className="pain-icon" style={{background:'transparent', flexShrink:0}}>
                <svg className="program-icon-3d" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#9f72b0"/>
                  <path d="M44 22l-2-2-3 3-2-2-8 8 2 2-6 6-2 6 6-2 6-6 2 2 8-8-2-2 3-3z" fill="white" opacity="0.9"/>
                  <circle cx="22" cy="42" r="3" fill="rgba(255,255,255,0.4)"/>
                  <path d="M40 20l4 4" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="pain-card-text">
                <h3>Боишься инъекций, но хочешь выглядеть свежо</h3>
                <p>Не готова к уколам и операциям, но хочется видимого, долгосрочного результата</p>
              </div>
            </div>
            <div className="pain-card reveal">
              <div className="pain-icon" style={{background:'transparent', flexShrink:0}}>
                <svg className="program-icon-3d" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#9f72b0"/>
                  <path d="M38 18v10h-2v-8h-2v8h-2v-8h-2v8h-2V18c0-1.1-.9-2-2-2s-2 .9-2 2v16l-3-3c-.78-.78-2.05-.78-2.83 0-.78.78-.78 2.05 0 2.83l7.83 7.83C24.56 43.22 27.14 44 30 44h4c4.42 0 8-3.58 8-8V18c0-1.1-.9-2-2-2s-2 .9-2 2z" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <div className="pain-card-text">
                <h3>Руки выдают возраст</h3>
                <p>Даже когда лицо выглядит хорошо, руки «рассказывают» другую историю</p>
              </div>
            </div>
          </div>
          <div className="pain-conclusion reveal">
            <p>Ты не одна. 8 из 10 женщин, которые приходят впервые,<br/>говорят именно это.<br/>
            <strong>Хорошая новость: всё это решается без скальпеля и без страха.</strong></p>
          </div>
        </div>
      </section>

      {/* БЛОК 3: О МАСТЕРЕ */}
      <section id="about" style={{padding:'var(--space-12) 0'}}>
        <div className="container">
          <div style={{display:'flex', flexDirection:'row', gap:'var(--space-10)', alignItems:'center'}}>

            {/* Фото слева — квадрат с отступами */}
            <div className="reveal" style={{flexShrink:0, width:'460px', padding:'var(--space-4)', marginLeft:'-var(--space-4)'}}>
              <div style={{position:'relative', width:'100%', paddingBottom:'100%', borderRadius:'var(--radius-xl)', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)'}}>
                <img
                  src="https://cdn.poehali.dev/files/1cd6180d-bbad-42e0-8bfe-b7e562c537e8.jpeg"
                  alt="Александра — косметолог в Артёме"
                  style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block'}}
                />
              </div>
            </div>

            {/* Текст справа */}
            <div className="reveal" style={{flex:'1 1 0', minWidth:0}}>
              <div className="about-eyebrow">Косметолог, которому доверяют лицо</div>
              <h2 className="about-title" style={{fontSize:'var(--text-xl)', marginBottom:'var(--space-3)'}}>Привет, я — Александра</h2>
              <div className="about-principle" style={{fontSize:'var(--text-lg)', marginBottom:'var(--space-4)'}}>
                «Лучший аксессуар, который ты носишь каждый день — это твоя кожа. Пусть он будет безупречен»
              </div>
              <p style={{fontSize:'var(--text-sm)',color:'var(--color-text-muted)',marginBottom:'var(--space-4)',lineHeight:'1.6'}}>
                Я специализируюсь на эстетической косметологии — от базового ухода до аппаратных методик омоложения. Работаю в уютном кабинете без очередей и спешки: каждый клиент получает полное внимание и индивидуальный протокол.
              </p>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-3)', marginBottom:'var(--space-5)', alignItems:'start'}}>
                <div style={{display:'flex', alignItems:'flex-start', gap:'var(--space-2)', fontSize:'var(--text-sm)', color:'var(--color-text-muted)'}}>
                  <span style={{color:'var(--color-primary)', flexShrink:0}}>✦</span>
                  <span>Только сертифицированные аппараты и профессиональная косметика</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'var(--space-3)'}}>
                  <div style={{display:'flex', alignItems:'flex-start', gap:'var(--space-2)', fontSize:'var(--text-sm)', color:'var(--color-text-muted)'}}>
                    <span style={{color:'var(--color-primary)', flexShrink:0}}>✦</span>
                    <span>Индивидуальный протокол для каждого клиента</span>
                  </div>
                  <div style={{display:'flex', alignItems:'flex-start', gap:'var(--space-2)', fontSize:'var(--text-sm)', color:'var(--color-text-muted)'}}>
                    <span style={{color:'var(--color-primary)', flexShrink:0}}>✦</span>
                    <span>Уютный кабинет — без очередей и спешки</span>
                  </div>
                </div>
              </div>
              <a href="#form" className="btn-primary">Записаться</a>
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
            <div className="service-card reveal" style={{display:'flex', flexDirection:'row', alignItems:'stretch', gap:'16px', overflow:'hidden'}}>
              <div style={{flex:'1 1 0', minWidth:0, display:'flex', flexDirection:'column'}}>
                <div className="service-num">01</div>
                <div className="service-title">Чистка лица</div>
                <p className="service-desc">Глубокое очищение пор, удаление комедонов и загрязнений. Кожа буквально дышит после процедуры. Подходит для всех типов кожи, включая чувствительную.</p>
                <div className="service-result" style={{marginTop:'auto'}}>✦ Чистая, свежая кожа уже в день процедуры</div>
              </div>
              <div style={{flex:'0 0 42%', maxWidth:'42%', borderRadius:'10px', overflow:'hidden'}}>
                <img
                  src="https://cdn.poehali.dev/projects/035a812e-0b57-4b0d-bfee-fe71e6d535d6/bucket/3d252354-5031-4a6c-aea5-5c7a02c7c218.png"
                  alt="Чистка лица"
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}
                />
              </div>
            </div>
            <div className="service-card reveal" style={{display:'flex', flexDirection:'row', alignItems:'stretch', gap:'16px', overflow:'hidden'}}>
              <div style={{flex:'1 1 0', minWidth:0, display:'flex', flexDirection:'column'}}>
                <div className="service-num">02</div>
                <div className="service-title">Гидропилинг</div>
                <p className="service-desc">Инновационная аппаратная процедура: вакуум мягко очищает поры, насыщая кожу питательными сыворотками. Никакого дискомфорта — только ощущение обновлённой кожи.</p>
                <div className="service-result" style={{marginTop:'auto'}}>✦ Сужение пор, выравнивание рельефа, сияние</div>
              </div>
              <div style={{flex:'0 0 42%', maxWidth:'42%', borderRadius:'10px', overflow:'hidden'}}>
                <img
                  src="https://cdn.poehali.dev/projects/035a812e-0b57-4b0d-bfee-fe71e6d535d6/bucket/fe8a30db-1130-4620-a10e-4982f6ca880b.jpeg"
                  alt="Гидропилинг"
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}
                />
              </div>
            </div>
            <div className="service-card reveal" style={{display:'flex', flexDirection:'row', alignItems:'stretch', gap:'16px', overflow:'hidden'}}>
              <div style={{flex:'1 1 0', minWidth:0, display:'flex', flexDirection:'column'}}>
                <div className="service-num">03</div>
                <div className="service-title">Пилинги</div>
                <p className="service-desc">Химические пилинги на кислотах — подбираем тип и концентрацию индивидуально. Устраняют пигментацию, постакне, выравнивают тон.</p>
                <div className="service-result" style={{marginTop:'auto'}}>✦ Обновлённая, ровная кожа с видимым сиянием</div>
              </div>
              <div style={{flex:'0 0 42%', maxWidth:'42%', borderRadius:'10px', overflow:'hidden'}}>
                <img
                  src="https://cdn.poehali.dev/files/b67ea631-8679-4d90-8f00-1f6225c4e346.jpeg"
                  alt="Пилинги"
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}
                />
              </div>
            </div>
            <div className="service-card reveal" style={{display:'flex', flexDirection:'row', alignItems:'stretch', gap:'16px', overflow:'hidden'}}>
              <div style={{flex:'1 1 0', minWidth:0, display:'flex', flexDirection:'column'}}>
                <div className="service-num">04</div>
                <div className="service-title">Микронидлинг (Дермапен)</div>
                <p className="service-desc">Микроиглы запускают выработку коллагена и эластина. Лечебные сыворотки вводятся глубоко в дерму — туда, куда крем никогда не доберётся.</p>
                <div className="service-result" style={{marginTop:'auto'}}>✦ Подтяжка, уменьшение морщин, устранение постакне</div>
              </div>
              <div style={{flex:'0 0 42%', maxWidth:'42%', borderRadius:'10px', overflow:'hidden'}}>
                <img
                  src="https://cdn.poehali.dev/files/7a761715-1f5b-4128-b830-3d3ea78a7164.jpeg"
                  alt="Микронидлинг"
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}
                />
              </div>
            </div>
            <div className="service-card reveal" style={{display:'flex', flexDirection:'row', alignItems:'stretch', gap:'16px', overflow:'hidden'}}>
              <div style={{flex:'1 1 0', minWidth:0, display:'flex', flexDirection:'column'}}>
                <div className="service-num">05</div>
                <div className="service-title">Массаж лица</div>
                <p className="service-desc">Классический массаж лица — это когда уходишь с другим лицом и полным ощущением, что отдохнула неделю. Тёплые руки, точные движения — мышцы расслабляются, лимфа разгоняется, кожа наполняется.</p>
                <div className="service-result" style={{marginTop:'auto'}}>✦ Лифтинг, свежесть, естественная красота — видно сразу</div>
              </div>
              <div style={{flex:'0 0 42%', maxWidth:'42%', borderRadius:'10px', overflow:'hidden'}}>
                <img
                  src="https://cdn.poehali.dev/projects/035a812e-0b57-4b0d-bfee-fe71e6d535d6/bucket/9d5b1ed6-d036-4456-a947-f38e1ab23dde.jpeg"
                  alt="Массаж лица"
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}
                />
              </div>
            </div>
            <div className="service-card reveal" style={{display:'flex', flexDirection:'row', alignItems:'stretch', gap:'16px', overflow:'hidden'}}>
              <div style={{flex:'1 1 0', minWidth:0, display:'flex', flexDirection:'column'}}>
                <div className="service-num">06</div>
                <div className="service-title">Микротоки</div>
                <p className="service-desc">Слабые электрические импульсы тонизируют мышцы лица, запускают лимфодренаж и синтез коллагена. «Фитнес для лица» — результат накапливается и держится.</p>
                <div className="service-result" style={{marginTop:'auto'}}>✦ Подтянутые контуры, здоровый цвет лица</div>
              </div>
              <div style={{flex:'0 0 42%', maxWidth:'42%', borderRadius:'10px', overflow:'hidden'}}>
                <img
                  src="https://cdn.poehali.dev/projects/035a812e-0b57-4b0d-bfee-fe71e6d535d6/bucket/240f6709-3359-4296-9eba-7879a9a1e119.jpeg"
                  alt="Микротоки"
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}
                />
              </div>
            </div>
            <div className="service-card reveal" style={{display:'flex', flexDirection:'row', alignItems:'stretch', gap:'16px', overflow:'hidden'}}>
              <div style={{flex:'1 1 0', minWidth:0, display:'flex', flexDirection:'column'}}>
                <div className="service-num">07</div>
                <div className="service-title">РФ-лифтинг</div>
                <p className="service-desc">Радиочастотное тепловое воздействие нагревает глубокие слои кожи — коллаген сокращается, запускается омоложение изнутри. Безоперационная подтяжка лица, шеи и декольте.</p>
                <div className="service-result" style={{marginTop:'auto'}}>✦ Подтянутый овал, устранение брылей и второго подбородка — без уколов</div>
              </div>
              <div style={{flex:'0 0 42%', maxWidth:'42%', borderRadius:'10px', overflow:'hidden'}}>
                <img
                  src="https://cdn.poehali.dev/projects/035a812e-0b57-4b0d-bfee-fe71e6d535d6/bucket/0e086857-89be-41d5-893b-1599fbe50781.jpeg"
                  alt="РФ-лифтинг"
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}
                />
              </div>
            </div>
          </div>
          <div className="services-cta-row reveal">
            <a href="#form" className="btn-primary">Записаться</a>
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
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f33f.svg" alt="" className="program-icon-3d" />
              <div className="program-title">Релакс</div>
              <div className="program-composition">Ультразвуковая чистка + пилинг + массаж лица + маска</div>
              <p className="program-desc">Идеальная программа для тех, кто давно не баловал себя уходом или просто хочет «перезагрузиться». Полный цикл за один визит: очищение, обновление, расслабление, питание.</p>
              <p className="program-fits"><strong>Подходит:</strong> всем типам кожи, особенно уставшей и тусклой.</p>
              <div className="program-effect">✨ Ощущение после: как будто поменяла кожу</div>
            </div>
            <div className="program-card reveal">
              <div className="program-badge">Сияние</div>
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f90d.svg" alt="" className="program-icon-3d" />
              <div className="program-title">Фарфоровая куколка</div>
              <div className="program-composition">Ультразвуковая чистка + фонофорез с детокс-капсулами</div>
              <p className="program-desc">Аппаратная программа для глубокого детокса и сияния. Ультразвук открывает каналы в коже, фонофорез доставляет детокс-капсулы точно в дерму. Кожа становится светлой, ровной и буквально светится изнутри.</p>
              <p className="program-fits"><strong>Подходит:</strong> тусклая, пористая кожа, усталость после стресса.</p>
              <div className="program-effect">✨ Фарфоровая текстура, детокс, внутреннее сияние</div>
            </div>
            <div className="program-card reveal">
              <div className="program-badge">Интенсив</div>
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4a7.svg" alt="" className="program-icon-3d" />
              <div className="program-title">Глубокое увлажнение</div>
              <div className="program-composition">Ультразвуковая чистка + пилинг + микронидлинг</div>
              <p className="program-desc">Трёхступенчатая программа интенсивного обновления. Сначала очищаем и подготавливаем кожу, затем дермапен доставляет сыворотку с гиалуроновой кислотой в глубокие слои. Эффект держится неделями.</p>
              <p className="program-fits"><strong>Подходит:</strong> сухая, обезвоженная кожа, первые признаки старения.</p>
              <div className="program-effect">✨ Кожа как после капельницы — наполненная, упругая, молодая</div>
            </div>
            <div className="program-card reveal">
              <div className="program-badge">Уход</div>
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f485.svg" alt="" className="program-icon-3d" />
              <div className="program-title">Спа для рук</div>
              <div className="program-composition">Пилинг + питательная маска + массаж рук</div>
              <p className="program-desc">Руки выдают возраст быстрее лица. Процедура включает пилинг, питательную маску, массаж — кожа становится мягкой, ухоженной и нежной.</p>
              <p className="program-fits"><strong>Подходит:</strong> для регулярного ухода, особенно в холодное время года.</p>
              <div className="program-effect">✨ Молодые, ухоженные руки после первого сеанса</div>
            </div>
            <div className="program-card reveal">
              <div className="program-badge">Мужское</div>
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f9d4.svg" alt="" className="program-icon-3d" />
              <div className="program-title">Мужской уход</div>
              <div className="program-composition">Глубокая чистка + уход + тонизирование</div>
              <p className="program-desc">Мужская кожа требует особого подхода: более плотная, склонная к жирности и раздражению после бритья. Глубокая чистка, уход и тонизирование — всё, что нужно, чтобы выглядеть свежо и уверенно.</p>
              <p className="program-fits"><strong>Подходит:</strong> для мужчин с любым типом кожи.</p>
              <div className="program-effect">✦ Чёткий овал — чёткий мужчина</div>
            </div>
          </div>
          <div className="services-cta-row reveal">
            <a href="#form" className="btn-primary">Записаться</a>
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
                    <p>Здесь всё продумано до мелочей: стерильность, чистота и твой комфорт — в приоритете</p>
                  </div>
                </li>
              </ul>
              <a href="#form" className="btn-primary reveal">Записаться</a>
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
                <li>Скидка 10% при первичной записи онлайн</li>
                <li>Индивидуальный план ухода в подарок</li>
              </ul>
              <a href="#form" className="btn-primary">Записаться</a>
            </div>
            <div className="promo-gift" style={{background:'none',boxShadow:'none',padding:'0',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div className="reveal" style={{position:'relative',display:'inline-block',padding:'20px 20px 30px 10px'}}>
                {/* Декоративный круг позади */}
                <div style={{
                  position:'absolute',
                  width:'320px',
                  height:'320px',
                  borderRadius:'50%',
                  background:'radial-gradient(circle, rgba(159,114,176,0.18) 0%, rgba(196,158,212,0.08) 70%, transparent 100%)',
                  top:'-20px',
                  right:'-20px',
                  zIndex:0
                }}/>
                {/* Дальняя тень (самая размытая) */}
                <div style={{
                  position:'absolute',
                  bottom:'-10px',
                  left:'30px',
                  right:'10px',
                  height:'80%',
                  borderRadius:'24px',
                  background:'rgba(100,60,120,0.22)',
                  filter:'blur(32px)',
                  zIndex:0
                }}/>
                {/* Средняя тень */}
                <div style={{
                  position:'absolute',
                  bottom:'0px',
                  left:'20px',
                  right:'5px',
                  height:'60%',
                  borderRadius:'24px',
                  background:'rgba(159,114,176,0.28)',
                  filter:'blur(14px)',
                  zIndex:0
                }}/>
                {/* Декоративная рамка-карточка сзади */}
                <div style={{
                  position:'absolute',
                  inset:0,
                  borderRadius:'24px',
                  border:'1.5px solid rgba(159,114,176,0.25)',
                  transform:'translate(10px, 10px) rotate(2deg)',
                  background:'rgba(255,255,255,0.5)',
                  backdropFilter:'blur(2px)',
                  zIndex:1
                }}/>
                <img
                  src="https://cdn.poehali.dev/files/01919ea6-575b-472e-b797-203bdacb06d3.png"
                  alt="Косметолог"
                  style={{
                    position:'relative',
                    zIndex:2,
                    width:'100%',
                    maxWidth:'370px',
                    borderRadius:'20px',
                    display:'block',
                    boxShadow:'0 2px 8px rgba(0,0,0,0.08), 0 16px 48px rgba(120,70,150,0.22), 0 4px 16px rgba(0,0,0,0.12)',
                    transform:'perspective(900px) rotateY(-3deg) rotateX(2deg)',
                    transition:'transform 0.4s ease, box-shadow 0.4s ease'
                  }}
                  onMouseEnter={e=>{
                    (e.currentTarget as HTMLImageElement).style.transform='perspective(900px) rotateY(0deg) rotateX(0deg) scale(1.03)';
                    (e.currentTarget as HTMLImageElement).style.boxShadow='0 4px 12px rgba(0,0,0,0.10), 0 24px 64px rgba(120,70,150,0.32), 0 8px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={e=>{
                    (e.currentTarget as HTMLImageElement).style.transform='perspective(900px) rotateY(-3deg) rotateX(2deg)';
                    (e.currentTarget as HTMLImageElement).style.boxShadow='0 2px 8px rgba(0,0,0,0.08), 0 16px 48px rgba(120,70,150,0.22), 0 4px 16px rgba(0,0,0,0.12)';
                  }}
                />
              </div>
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
              <label style={{display:'flex',alignItems:'flex-start',gap:'var(--space-3)',cursor:'pointer',marginBottom:'var(--space-4)',marginTop:'var(--space-2)'}}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  style={{width:18,height:18,flexShrink:0,marginTop:2,accentColor:'var(--color-primary)',cursor:'pointer'}}
                />
                <span style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',lineHeight:1.6}}>
                  Я ознакомилась с{' '}
                  <button type="button" onClick={() => setModal('privacy')} style={{color:'var(--color-primary)',textDecoration:'underline',background:'none',border:'none',cursor:'pointer',font:'inherit',padding:0}}>политикой конфиденциальности</button>
                  {' '}и даю{' '}
                  <button type="button" onClick={() => setModal('consent')} style={{color:'var(--color-primary)',textDecoration:'underline',background:'none',border:'none',cursor:'pointer',font:'inherit',padding:0}}>согласие на обработку персональных данных</button>
                </span>
              </label>
              <button type="submit" className="form-submit" disabled={!agreed} style={{opacity: agreed ? 1 : 0.45, cursor: agreed ? 'pointer' : 'not-allowed', transition:'opacity var(--transition)'}}>[ ЗАПИСАТЬСЯ БЕСПЛАТНО → ]</button>
              <div className="form-divider">или</div>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="tg-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.5l-2.946-.924c-.64-.203-.654-.64.136-.954l11.49-4.43c.534-.194 1.001.13.044.029z"/></svg>
                Написать в Telegram
              </a>
              <p className="form-privacy" style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'24px',height:'24px',borderRadius:'50%',background:'var(--color-primary)',flexShrink:0}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                </span>
                Данные защищены. Не передаём третьим лицам.
              </p>
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

          </div>
          <div>
            <div className="footer-heading">Контакты</div>
            <ul className="footer-contact-list">
              <li style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'28px',height:'28px',borderRadius:'50%',background:'var(--color-primary)',flexShrink:0}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </span>
                <a href="https://2gis.ru/artem/geo/3519072864057850?m=132.176508%2C43.352743%2F16" target="_blank" rel="noopener noreferrer" style={{color:'var(--color-primary)'}}>г. Артём, ул. Фрунзе, 60</a>
              </li>
              <li style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'28px',height:'28px',borderRadius:'50%',background:'var(--color-primary)',flexShrink:0}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </span>
                <a href="tel:+79084602924" style={{color:'var(--color-primary)'}}>+7-908-460-29-24</a>
              </li>
              <li style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'28px',height:'28px',borderRadius:'50%',background:'var(--color-primary)',flexShrink:0}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </span>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" style={{color:'var(--color-primary)'}}>Telegram-канал</a>
              </li>
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

        </div>
        <div className="footer-warn">
          ⚠️ Имеются противопоказания. Требуется консультация специалиста. Процедуры выполняются после личной консультации и оценки состояния кожи.
        </div>
      </footer>
      {/* МОДАЛЬНЫЕ ОКНА */}
      {modal && (
        <div onClick={() => setModal(null)} style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.55)',display:'flex',alignItems:'center',justifyContent:'center',padding:'var(--space-6)'}}>
          <div onClick={e => e.stopPropagation()} style={{background:'var(--color-bg)',borderRadius:'var(--radius-xl)',maxWidth:'600px',width:'100%',maxHeight:'85vh',overflowY:'auto',boxShadow:'var(--shadow-lg)',border:'1px solid var(--color-border)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--space-6) var(--space-8)',borderBottom:'1px solid var(--color-divider)',position:'sticky',top:0,background:'var(--color-bg)',zIndex:1}}>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,margin:0}}>
                {modal === 'privacy' ? 'Политика конфиденциальности' : 'Согласие на обработку персональных данных'}
              </h2>
              <button onClick={() => setModal(null)} style={{width:36,height:36,borderRadius:'var(--radius-full)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--color-text-muted)',flexShrink:0,cursor:'pointer',border:'none',background:'none',fontSize:'1.25rem'}}>✕</button>
            </div>
            <div style={{padding:'var(--space-8)',fontSize:'var(--text-sm)',color:'var(--color-text-muted)',lineHeight:1.8}}>
              {modal === 'privacy' ? (
                <>
                  <p style={{marginBottom:'var(--space-5)',color:'var(--color-text-faint)',fontSize:'var(--text-xs)'}}>Последнее обновление: апрель 2026 г.</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>1. Общие положения</h3>
                  <p style={{marginBottom:'var(--space-5)'}}>Настоящая политика конфиденциальности регулирует порядок обработки и использования персональных данных пользователей, оставивших заявку на сайте косметолога Александры (г. Артём).</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>2. Какие данные мы собираем</h3>
                  <p style={{marginBottom:'var(--space-5)'}}>При заполнении формы записи мы собираем: имя (имя, которое вы указали), номер телефона, а также выбранную процедуру. Данные передаются исключительно с целью обратной связи и записи на процедуру.</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>3. Как мы используем данные</h3>
                  <p style={{marginBottom:'var(--space-5)'}}>Собранные данные используются исключительно для: связи с вами по вопросам записи, подтверждения и напоминания о визите, предоставления информации об актуальных предложениях (только с вашего согласия).</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>4. Передача данных третьим лицам</h3>
                  <p style={{marginBottom:'var(--space-5)'}}>Мы не передаём ваши персональные данные третьим лицам, партнёрам или рекламным сетям. Данные хранятся только у специалиста и используются исключительно для записи клиентов.</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>5. Хранение и защита данных</h3>
                  <p style={{marginBottom:'var(--space-5)'}}>Данные хранятся в защищённом виде. Вы вправе в любой момент запросить удаление ваших данных, направив сообщение по контактам, указанным на сайте.</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>6. Контакты</h3>
                  <p>По вопросам обработки персональных данных обращайтесь по телефону: <a href="tel:+79084602924" style={{color:'var(--color-primary)'}}>+7-908-460-29-24</a></p>
                </>
              ) : (
                <>
                  <p style={{marginBottom:'var(--space-5)',color:'var(--color-text-faint)',fontSize:'var(--text-xs)'}}>В соответствии с Федеральным законом № 152-ФЗ «О персональных данных»</p>
                  <p style={{marginBottom:'var(--space-5)'}}>Я, субъект персональных данных, оставляя заявку на сайте косметолога Александры (г. Артём, ул. Фрунзе, 60), даю своё согласие на обработку следующих персональных данных:</p>
                  <ul style={{marginBottom:'var(--space-5)',paddingLeft:'var(--space-6)',display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>
                    <li>Имя (фамилия, имя — по желанию)</li>
                    <li>Номер телефона</li>
                    <li>Информация о выбранной процедуре</li>
                  </ul>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>Цели обработки</h3>
                  <p style={{marginBottom:'var(--space-5)'}}>Персональные данные обрабатываются исключительно в целях организации записи на косметологические процедуры, подтверждения и напоминания о визите.</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>Условия обработки</h3>
                  <p style={{marginBottom:'var(--space-5)'}}>Обработка персональных данных осуществляется без передачи третьим лицам. Срок хранения данных — до момента отзыва согласия субъектом персональных данных.</p>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',color:'var(--color-text)',marginBottom:'var(--space-3)'}}>Отзыв согласия</h3>
                  <p>Я вправе отозвать настоящее согласие в любой момент, направив соответствующее уведомление по телефону <a href="tel:+79084602924" style={{color:'var(--color-primary)'}}>+7-908-460-29-24</a> или в Telegram.</p>
                </>
              )}
            </div>
            <div style={{padding:'var(--space-6) var(--space-8)',borderTop:'1px solid var(--color-divider)',textAlign:'center'}}>
              <button onClick={() => setModal(null)} className="btn-primary">Понятно, закрыть</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}