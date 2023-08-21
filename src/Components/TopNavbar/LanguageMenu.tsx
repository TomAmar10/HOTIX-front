import { useDispatch } from "react-redux";
import { languageAction } from "../../store/languageSlice";
import LanguageIcon from "@mui/icons-material/Language";
import { useEffect, useRef, useState } from "react";
import { LanguageTopNavbar } from "../../languageControl/Language";
import { hebrewImg } from "../../utils/file-import";
import { englishImg } from "../../utils/file-import";
import "./LanguageMenu.scss";

interface props {
  data: LanguageTopNavbar;
}

function LanguageMenu(props: props): JSX.Element {
  const dispatch = useDispatch();
  const languageAreaRef = useRef<HTMLDivElement>(null);
  const [isLanguage, setIsLanguage] = useState(false);

  const toggleLang = (language: string) => {
    dispatch(languageAction.setLanguage(language));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      languageAreaRef.current &&
      !languageAreaRef.current.contains(event.target as Node)
    ) {
      setIsLanguage(false);
    }
  };

  return (
    <div
      className="LanguageMenu"
      onClick={() => setIsLanguage((prev) => !prev)}
      ref={languageAreaRef}
    >
      <LanguageIcon className="icon" />
      {isLanguage && (
        <div className="lang-menu">
          <div
            className="single-language"
            onClick={() => toggleLang("ENGLISH")}
          >
            <img src={englishImg} className="lang-img" alt="english" />
            <span>{props.data.english}</span>
          </div>
          <hr />
          <div className="single-language" onClick={() => toggleLang("HEBREW")}>
            <img src={hebrewImg} className="lang-img" alt="hebrew" />
            <span>{props.data.hebrew}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageMenu;
