import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import AddForm from "../AddForm";
import Footer from "../Footer";

export default function AddPage() {
  return (
    <>
        <Logo />
        <LogoBig />
        <Heading title="Add accommodation" />
        <AddForm />
        <Footer />
    </>
  )
}