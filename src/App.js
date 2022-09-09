import axios from "axios";
import {useEffect, useState} from "react";
import Dashboard from "./Dashboard";
import Toolbar from "./Toolbar.js";

import config from "./config.json";

async function authenticate(token)
{
    const params = new URLSearchParams(
    {
        "client_id": config.clientId,
        "client_secret": config.clientSecret,
        "code": token,
        "grant_type": "authorization_code",
        "redirect_uri": config.appUrl
    });

    const axios_config = {
        headers:
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    try
    {
        const response = await axios(
        {
            method: "post",
            url: "https://discord.com/api/oauth2/token",
            data: params,
            headers:
            {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

//        const response = await axios.post("https://discord.com/api/oauth2/token", params, axios_config);
//        console.log(response);
    }
    catch(error)
    {
        console.log(error);
    }
}

export default function App()
{
    const [logged_in, setLoggedIn] = useState(false);

    useEffect(() =>
    {
        if(!logged_in)
        {
            const params = new URLSearchParams(window.location.search);
            if(params.get("code"))
            {
                authenticate(params.get("code"));
                setLoggedIn(true);
            }
            else
            {
                window.location = config.authUrl;
            }
        }
    }, [logged_in]);

    const [server, setServer] = useState("");
    const [user, setUser] = useState("241657945237094410");
    return(
        <>
            {logged_in && (
                <>
                    <Toolbar selection={server} handler={setServer} user={user} />
                    <Dashboard server={server} />
                </>
            )}
        </>
    );
}