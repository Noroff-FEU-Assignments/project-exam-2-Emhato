import Layout from "../layout/Layout";
import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import LoginForm from "../forms/LoginForm";

export default function LoginPage() {
  document.title = "Login"
  return (
    <Layout>
        <Logo />
        <LogoBig />
        <Heading title="Login" />
        <LoginForm />
    </Layout>
  )
}
