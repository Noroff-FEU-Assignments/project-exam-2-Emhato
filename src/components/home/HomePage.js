import Heading from "../Heading";
import Featured from "../Featured";
import Footer from "../Footer";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/Api";
import Logo from "../Logo";
import LogoBig from "../LogoBig";


// api:
// https://strapi-for-herbergen-2.herokuapp.com/api/accommodations

export default function HomePage() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const [searchTerm, setSearchTerm] = useState('')

    const url = BASE_URL + "api/accommodations"
    // const http = UseAxios();

    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
                // console.log(response.data.data[0]);
                setData(response.data.data);
            } catch(error) {
                console.log(error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    return (
        <div className="body">
            <Logo />
            <LogoBig />
            <div className="background-container">
                <h1 className="home-h1">Welcome to Holidaze! The place to start your Bergen holiday</h1>
                {/* <Heading  title="Welcome to Holidaze! The place to start your Bergen holiday"/> */}
                <SearchBar placeholder="Search accommodations" data={data}/>
                <Featured />
            </div>
            <Footer />
        </div>
  )
}
