import Layout from "../layout/Layout";
import Featured from "../apiCalls/Featured";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/Api";
import Logo from "../Logo";
import LogoBig from "../LogoBig";

export default function HomePage() {
    document.title = "Holidaze"

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
        <Layout>
            <div className="body">
                <Logo />
                <LogoBig />
                <div className="background-container">
                    <h1 className="home-h1">Welcome to Holidaze! The place to book your Bergen holiday</h1>
                    <SearchBar placeholder="Search accommodations" data={data}/>                
                </div>
                <Featured />
            </div>        
        </Layout>

  )
}
