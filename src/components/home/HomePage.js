import Heading from "../Heading";
import Featured from "../Featured";
import Footer from "../Footer";

// api:
// https://strapi-for-herbergen-2.herokuapp.com/api/accommodations

export default function HomePage() {
  return (
    <>
        <Heading title="Herbergen"/>
        <Featured />
        <Footer />
    </>
  )
}
