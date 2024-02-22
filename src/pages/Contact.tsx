import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import ContactSection from "../Components/ContactSection/ContactSection";
import Footer from "../Components/Footer/Footer";

function ContactPage(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  return (
    <>
      <ContactSection data={langData} />
      <Footer />
    </>
  );
}

export default ContactPage;
