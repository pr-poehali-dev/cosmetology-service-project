import { faqItems } from "@/data/faq";

const FaqSection = () => (
  <section className="faq-section" id="faq">
    <div className="container container--narrow">
      <div className="section-header reveal">
        <div className="section-eyebrow">Вопросы и ответы</div>
        <h2 className="section-title">Частые вопросы о косметологе в Артёме</h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item) => (
          <details key={item.q} className="faq-item">
            <summary className="faq-question">{item.q}</summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
