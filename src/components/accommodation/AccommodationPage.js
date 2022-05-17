import Heading from "../Heading";
import AllList from "../AllList";
import Footer from "../Footer";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/Api";

export default function AccommodationPage() {

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
        <>
            <Heading title="Accommodations"/>
            <SearchBar placeholder="Search accommodations" data={data}/>
            <AllList />
            <Footer />
        </>
    )
}
