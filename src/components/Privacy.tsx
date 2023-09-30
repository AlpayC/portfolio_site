import React from "react";
import { useLanguage } from "../context/language-context";
// import { Link } from "react-router-dom";

const Privacy = () => {
  const { language } = useLanguage();

  return (
    <React.Fragment>
      {language === "DE" ? (
        <article className="flex flex-col gap-6 max-w-[70vw] break-words">
          <h1>Datenschutz&shy;erkl&auml;rung</h1>
        </article>
      ) : (
        <article className="flex flex-col gap-6 max-w-[70vw] break-words">
          <h1>Privacy Policy</h1>
        </article>
      )}
    </React.Fragment>
  );
};

export default Privacy;
