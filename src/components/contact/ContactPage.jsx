import Layout from "../layout/Layout";
import Heading from "../Heading";
import ContactForm from "../forms/ContactForm";
import LogoBig from "../LogoBig";
import Logo from "../Logo";

export default function ContactPage() {
  document.title = "Contact"
  return (
    <Layout>
        <Logo />
        <LogoBig />
        <Heading title="Contact" />
        <ContactForm />
    </Layout>
  )
}
