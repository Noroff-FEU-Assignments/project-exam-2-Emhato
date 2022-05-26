import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import Footer from "../Footer";
import ContactMessages from "../ContactMessages";

export default function MessagesPage() {
  return (
    <>
        <Logo />
        <LogoBig />
        <Heading title="Messages" />
        <ContactMessages />
        <Footer />
    </>
  )
}