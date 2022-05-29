import Layout from "../layout/Layout";
import LogoBig from "../LogoBig";
import Logo from "../Logo";
import Spesific from "../apiCalls/Spesific";
import EnquieriesForm from "../forms/EnquieriesForm";

export default function SpesificPage() {
  return (
    <Layout>
        <Logo />
        <LogoBig />
        <Spesific />
        <EnquieriesForm />
    </Layout>
  )
}