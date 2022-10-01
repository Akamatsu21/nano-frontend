import axios from "axios";
import {useEffect, useState} from "react";
import {ReactSession} from 'react-client-session';
import Dashboard from "./Dashboard";
import Toolbar from "./Toolbar";

import config from "./config.json";
import endpoints from "./data/endpoints.json";

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
        const response = await axios.post(endpoints.discordAuth, params, axios_config);
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

async function getDiscordApiData(url)
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
        const response = await axios.get(url, axios_config);
        console.log(response);
        return response;
    }
    catch(error)
    {
        console.log(error);
        return null;
    }
}

async function getNanoApiData(url, params)
{
    try
    {
        const response = await axios.get(url + "?" + params);
        console.log(response);
        return response;
    }
    catch(error)
    {
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
    const [server_list, setServerList] = useState([]);
    const [data, setData] = useState({});
    const [ready, setReady] = useState(false);

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
            getDiscordApiData(endpoints.discordUser).then(user_data =>
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

            getDiscordApiData(endpoints.discordGuilds).then(guilds_data =>
            {
                if(guilds_data)
                {
                    const params = guilds_data.data.reduce((acc, el) =>
                    {
                        const prefix = acc.length === 0 ? '' : '&';
                        return acc + prefix + "ids[]=" + el.id;
                    }, "");

                    getNanoApiData(endpoints.nanoServers, params).then(servers_data =>
                    {
                        if(servers_data)
                        {
                            const list = servers_data.data.reduce((acc, el) =>
                            {
                                const name = guilds_data.data.find(guild => guild.id === el).name;
                                acc[el] = name;
                                return acc;
                            }, {});
                            setServerList(list);
                        }
                    });
                }
            });
        }
    }, [logged_in]);

    useEffect(() =>
    {
        setServer(Object.keys(server_list)[0]);
    }, [server_list]);

    useEffect(() =>
    {
        if(server)
        {
            getNanoApiData(endpoints.nanoWishes, `server=${server}`).then(wish_data =>
            {
                if(wish_data)
                {
                    setData(wish_data.data);
                    setReady(true);
                    console.log(wish_data);
                }
            });
        }
    }, [server]);

    return(
        <>
            {logged_in && ready && (
                <>
                    <Toolbar selection={server} items={server_list} handler={setServer} user={user}
                             logout={() => {ReactSession.set("auth_token", undefined); setLoggedIn(false);}} />
                    <Dashboard server={server} server_names={server_list} data={data} />
                </>
            )}
        </>
    );
}
