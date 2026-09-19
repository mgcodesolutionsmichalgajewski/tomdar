import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { advice, assets } from "../content/home";
import { SectionLabel } from "./sections";

export function Advice() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section
      className="section container advice-section"
      id="doradztwo"
      aria-labelledby="advice-title"
    >
      <div>
        <SectionLabel number="04">DOBRZE WIEDZIEĆ</SectionLabel>
        <h2 id="advice-title">
          Stolarka okienna
          <br />
          <span>i drzwiowa.</span>
        </h2>
        <div className="advice-accordion">
          {advice.map((item, index) => (
            <details className="advice-item" key={item.title} open={openIndex === index}>
              <summary
                className="advice-trigger"
                onClick={(event) => {
                  event.preventDefault();
                  setOpenIndex((current) => (current === index ? null : index));
                }}
              >
                <h3>{item.title}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <p className="advice-content">{item.text}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="profiles-picture">
        <img
          src={assets.profiles}
          alt="Przekroje profili okiennych renomowanych marek"
          width="450"
          height="500"
          loading="lazy"
        />
        <p>Precyzja, którą widać w każdym przekroju.</p>
      </div>
    </section>
  );
}
