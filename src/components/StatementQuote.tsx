import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { quotesData } from "../assets/lib/data";
import { useLanguage } from "../context/language-context";

gsap.registerPlugin(ScrollTrigger);

const StatementQuote: React.FC = () => {
  const { language } = useLanguage();

  const quoteTranslation =
    language === "DE" ? quotesData[1].de : quotesData[1].en;

  useEffect(() => {
    const h2Element = document.querySelector(".statement-container h2");

    if (h2Element) {
      const h2Text = h2Element.textContent || "";
      h2Element.textContent = "";

      const h2Timeline = gsap.timeline();

      let isInsideWord = false;
      for (const char of h2Text) {
        if (char === " ") {
          const spaceSpan = document.createElement("span");
          spaceSpan.textContent = char;
          h2Element.appendChild(spaceSpan);
        } else {
          if (!isInsideWord) {
            const wordSpan = document.createElement("span");
            h2Element.appendChild(wordSpan);
            isInsideWord = true;
          }
          const charSpan = document.createElement("span");
          charSpan.textContent = char;
          charSpan.style.display = "inline";
          h2Timeline.from(charSpan, {
            // y: 30,
            opacity: 0.2,
            duration: 0.6,
            ease: "power3.out",
          });
          h2Element.lastChild?.appendChild(charSpan);
        }
      }

      ScrollTrigger.create({
        trigger: h2Element,
        start: "top bottom",
        end: "bottom center",
        scrub: true,

        onToggle: (self) => {
          if (self.isActive) {
            h2Timeline.play();
          } else {
            h2Timeline.pause();
          }
        },
        onUpdate: (self) => {
          if (self.progress >= 1) {
            h2Timeline.progress(1);
          } else if (self.progress <= 0) {
            h2Timeline.progress(0);
          } else {
            h2Timeline.progress(self.progress);
          }
          const scrollDirection = self.getVelocity() > 1 ? 1 : -1; // 1 für runter scrollen, -1 für hoch scrollen
          if (scrollDirection === 1) {
            h2Timeline.play(); // Animation fortsetzen, wenn der Benutzer nach unten scrollt
          } else {
            h2Timeline.pause(); // Animation stoppen, wenn der Benutzer nach oben scrollt
          }
        },
      });
    }
  }, [quoteTranslation]);

  return (
    <>
      <section className="quote-banner relative overflow-x-clip min-[1921px]:px-96">
        <div className="h-[50vh] -rotate-3 flex justify-center items-center scale-110">
          <div className="statement-container rotate-3 flex items-center flex-col justify-center p-56 max-lg:p-20">
            <h2 className="text-[--black] text-center text-9xl mb-20 mt-20 max-lg:text-[3rem] max-lg:mb-10 max-lg:leading-tight">
              {quoteTranslation}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatementQuote;
