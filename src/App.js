import axios from "axios";
import {useEffect, useState} from "react";
import {ReactSession} from 'react-client-session';
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

    const axios_config =
    {
        headers:
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    try
    {
        const response = await axios.post("https://discord.com/api/oauth2/token", params, axios_config);
        console.log("Auth response");
        console.log(response);
        return`${response.data.token_type} ${response.data.access_token}`;
    }
    catch(error)
    {
        console.log("Auth error");
        console.log(error);
        return null;
    }
}

async function getUserData()
{
    const axios_config =
    {
        headers:
        {
            "authorization": ReactSession.get("auth_token")
        }
    };

    try
    {
        const response = await axios.get("https://discord.com/api/users/@me", axios_config);
        console.log("User response");
        console.log(response);
        return response;
    }
    catch(error)
    {
        console.log("User error");
        console.log(error);
        return null;
    }
}

export default function App()
{
    ReactSession.setStoreType("sessionStorage");
    const [logged_in, setLoggedIn] = useState(ReactSession.get("auth_token") !== undefined);
    const [server, setServer] = useState("");
    const [user, setUser] = useState({});

    useEffect(() =>
    {
        if(!logged_in)
        {
            const params = new URLSearchParams(window.location.search);
            if(params.get("code"))
            {
                authenticate(params.get("code")).then(auth_token =>
                {
                    if(auth_token)
                    {
                        ReactSession.set("auth_token", auth_token);
                        setLoggedIn(true);
                    }
                    else
                    {
                        window.location = config.authUrl;
                    }
                });

            }
            else
            {
                window.location = config.authUrl;
            }
        }
        else
        {
            getUserData().then(user_data =>
            {
                if(user_data)
                {
                    setUser(
                    {
                        id: user_data.data.id,
                        username: user_data.data.username,
                        avatar: user_data.data.avatar
                    });
                }
            });
        }
    }, [logged_in]);

    return(
        <>
            {logged_in && (
                <>
                    <Toolbar selection={server} handler={setServer} user={user}
                             logout={() => {ReactSession.set("auth_token", undefined); setLoggedIn(false);}} />
                    <Dashboard server={server} />
                </>
            )}
        </>
    );
}