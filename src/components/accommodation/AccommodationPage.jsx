import Heading from "../Heading";
import Logo from "../Logo";
import LogoBig from "../LogoBig";
import AllList from "../AllList";
import Footer from "../Footer";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/Api";

export default function AccommodationPage() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = BASE_URL + "api/accommodations"

    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
                setData(response.data.data);
            } catch(error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    if(loading) return <div className="loading"></div>

    if(error) return <div>An error occured: {error}</div>

    return (
        <>
            <Logo />
            <LogoBig />
            <Heading title="Accommodations"/>
            <SearchBar placeholder="Search accommodations" data={data}/>
            <AllList />
            <Footer />
        </>
    )
}
