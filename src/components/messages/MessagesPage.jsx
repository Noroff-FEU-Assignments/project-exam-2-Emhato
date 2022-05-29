import Layout from "../layout/Layout";
import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import ContactMessages from "../apiCalls/ContactMessages";

export default function MessagesPage() {
  document.title = "Messages"
  return (
    <Layout>
        <Logo />
        <LogoBig />
        <Heading title="Messages" />
        <ContactMessages />
    </Layout>
  )
}