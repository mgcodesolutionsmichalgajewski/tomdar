import {
  ArrowDown,
  ArrowUpRight,
  MoveUpRight,
  MessageSquare,
  Ruler,
  Wrench,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { assets, products, services, partners } from "../content/home";
export function SectionLabel({ children, number }: { children: React.ReactNode; number: string }) {
  return (
    <p className="eyebrow section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
export function About() {
  return (
    <section
      className="section container about-section"
      id="o-firmie"
      aria-labelledby="about-title"
    >
      <div className="about-picture">
        <img
          src={assets.about}
          alt="Katalogi drzwi i okien Pol-Skone oraz Porta na biurku"
          width="614"
          height="422"
          loading="lazy"
        />
        <div className="year-card">
          <strong>2002</strong>
          <span>
            Od tego roku
            <br />
            jesteśmy blisko Ciebie.
          </span>
        </div>
      </div>
      <div className="about-copy">
        <SectionLabel number="01">POZNAJ TOM-DAR</SectionLabel>
        <h2 id="about-title">
          Urzeczywistnimy
          <br />
          Wasze marzenia
          <br />
          <span>o idealnym domu.</span>
        </h2>
        <p>
          Firma TOM-DAR istnieje na rynku od 2002 roku. Nasza siedziba mieści się w Łyszkowicach
          przy ulicy Targowej 1. Przedmiotem działalności naszej firmy jest sprzedaż i montaż okien,
          drzwi, parapetów, bram i rolet w pełnej gamie kolorów i kształtów.
        </p>
        <div className="about-principles">
          <div>
            <h3>Jakość i fachowa obsługa</h3>
            <p>
              Od samego początku dbamy, aby klient, który skorzystał z naszej oferty, był zadowolony
              z jakości oraz fachowej obsługi. Produkty oferowane przez TOM-DAR wyróżnia solidność i
              estetyka wykonania.
            </p>
          </div>
          <div>
            <h3>Doświadczenie, któremu możesz zaufać</h3>
            <p>
              Dzięki doświadczeniu zdobywanemu od 2002 roku i długoletniej współpracy z największymi
              producentami jesteśmy w stanie zaproponować Państwu produkty najwyższej jakości po
              atrakcyjnych cenach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Services() {
  const icons = [Ruler, MessageSquare, Wrench];
  return (
    <section className="section services-section" id="uslugi" aria-labelledby="services-title">
      <div className="container">
        <SectionLabel number="02">OFEROWANE USŁUGI</SectionLabel>
        <div className="section-heading">
          <h2 id="services-title">
            Od dobrego pomysłu
            <br />
            <span>do fachowego montażu.</span>
          </h2>
          <p>
            Podejmujemy wyzwania.
            <br />
            Nasz profesjonalizm na to pozwala.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
              <article key={service.title} className="service-card">
                <div className="service-top">
                  <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
                  <span>0{i + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Partners() {
  return (
    <section className="partners-section container" aria-labelledby="partners-title">
      <div>
        <p className="eyebrow">SPRAWDZENI PRODUCENCI</p>
        <h2 id="partners-title">Produkty najwyższej jakości.</h2>
        <p>Szeroka gama produktów wiodących producentów.</p>
      </div>
      <div className="partner-logos">
        {partners.map((partner) => (
          <img
            key={partner.name}
            src={partner.image}
            alt={partner.name}
            width="150"
            height="80"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div>
          <SectionLabel number="05">KONTAKT</SectionLabel>
          <h2 id="contact-title">
            Twój dom zaczyna się
            <br />
            <span>od dobrej rozmowy.</span>
          </h2>
          <p>
            Służymy radą. Odwiedź nas w Łyszkowicach
            <br />
            lub skontaktuj się z nami.
          </p>
          <a className="button primary" href="mailto:biuro@tomdarokna.pl">
            Napisz do nas <MoveUpRight size={18} />
          </a>
        </div>
        <address className="contact-details">
          <div>
            <Phone size={20} aria-hidden="true" />
            <div>
              <span>POROZMAWIAJMY</span>
              <div className="contact-phones">
                <a href="tel:+48468388260">
                  <strong>46 838 82 60</strong>
                </a>
                <a href="tel:+48603514312">
                  <strong>603 514 312</strong>
                </a>
                <a href="tel:+48601514896">
                  <strong>601 514 896</strong>
                </a>
              </div>
            </div>
          </div>
          <a href="mailto:biuro@tomdarokna.pl">
            <Mail size={20} />
            <div>
              <span>NAPISZ DO NAS</span>
              <strong>biuro@tomdarokna.pl</strong>
            </div>
          </a>
          <div>
            <MapPin size={20} />
            <div>
              <span>ODWIEDŹ NAS</span>
              <strong>ul. Targowa 1</strong>
              <p>99-420 Łyszkowice, woj. łódzkie</p>
            </div>
          </div>
        </address>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#start" aria-label="TOM-DAR — wróć na górę">
            <img src={assets.logo} width="190" height="40" alt="TOM-DAR" />
          </a>
          <p>
            Sprzedaż i montaż okien, drzwi, bram garażowych, rolet, żaluzji i parapetów na terenie
            województwa łódzkiego.
          </p>
        </div>
        <div>
          <h3>Produkty</h3>
          <nav aria-label="Produkty w stopce">
            {products.map((p) => (
              <a key={p.id} href={`#produkt-${p.id}`}>
                {p.name}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h3>Jesteśmy blisko</h3>
          <p>
            Łódź · Zgierz
            <br />
            Aleksandrów Łódzki · Łowicz
            <br />
            Rawa Mazowiecka · Kutno
          </p>
        </div>
        <div>
          <h3>Kontakt</h3>
          <address>
            <p>
              ul. Targowa 1<br />
              99-420 Łyszkowice
            </p>
            <a href="tel:+48468388260">46 838 82 60</a>
            <a href="tel:+48603514312">603 514 312</a>
            <a href="tel:+48601514896">601 514 896</a>
            <a href="mailto:biuro@tomdarokna.pl">biuro@tomdarokna.pl</a>
          </address>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} TOM-DAR</span>
        <a
          className="footer-credit"
          href="https://mgcodesolutions.pl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Created by</span>
          <strong>MG Code Solutions</strong>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a href="#start">Wróć na górę ↑</a>
      </div>
    </footer>
  );
}
export function Hero() {
  return (
    <section className="hero" id="main-content" aria-labelledby="hero-title">
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="red-line" /> TWÓJ DOM. NASZE DOŚWIADCZENIE.
          </p>
          <h1 id="hero-title">
            Okna i drzwi,
            <br />
            które nadają
            <br />
            <span>charakter.</span>
          </h1>
          <p className="hero-description">
            Konstrukcja budynku wpływa na styl. To drzwi i okna nadadzą mu charakter. Pomożemy Ci
            wybrać właściwe.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#produkty">
              Poznaj nasze produkty <ArrowDown size={18} />
            </a>
            <a className="text-link" href="#kontakt">
              Skontaktuj się z nami <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <strong>Od 2002</strong>
              <span>tworzymy zaufanie</span>
            </div>
            <div>
              <strong>Sprzedaż i montaż</strong>
              <span>wszystko w jednym miejscu</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <img
          className="hero-image"
          src={assets.hero}
          width="1697"
          height="605"
          alt="Siedziba TOM-DAR w Łyszkowicach — szyld TOM-DAR i napis OKNA DRZWI"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
export function Products() {
  return (
    <section className="section products-section" id="produkty" aria-labelledby="products-title">
      <div className="container">
        <SectionLabel number="03">NASZA OFERTA</SectionLabel>
        <div className="section-heading">
          <h2 id="products-title">
            Dobry wybór.
            <br />
            <span>Na lata.</span>
          </h2>
          <p>
            Od okien po ostatni detal.
            <br />
            Poznaj produkty dla Twojego domu.
          </p>
        </div>
        <div className="product-grid">
          {products.map((product, i) => (
            <article className="product-card" key={product.id} id={`produkt-${product.id}`}>
              <a href={`https://tomdarokna.pl/${product.legacyPath}`} className="product-link">
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="600"
                    height="480"
                    loading="lazy"
                  />
                  <span className="product-number">0{i + 1}</span>
                  <span className="product-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
