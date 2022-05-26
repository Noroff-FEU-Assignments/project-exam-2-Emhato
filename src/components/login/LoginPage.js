import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import LoginForm from "../LoginForm";
import Footer from "../Footer";

export default function LoginPage() {
  return (
    <>
        <Logo />
        <LogoBig />
        <Heading title="Login" />
        <LoginForm />
        <Footer />
    </>
  )
}
