import Layout from "../layout/Layout";
import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import EnquieryMessages from "../apiCalls/EnquieryMessages";

export default function EnquieriesPage() {
  document.title = "Enquieries"
  return (
    <Layout>
        <Logo />
        <LogoBig />
        <Heading title="Enquieries" />
        <EnquieryMessages />
    </Layout>
  )
}