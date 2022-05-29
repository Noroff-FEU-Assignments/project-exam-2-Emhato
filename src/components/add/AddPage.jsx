import Layout from "../layout/Layout";
import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import AddForm from "../forms/AddForm";

export default function AddPage() {
  document.title = "Add accommodation"
  return (
    <Layout>
      <Logo />
      <LogoBig />
      <Heading title="Add accommodation" />
      <AddForm />       
    </Layout>
  )
}