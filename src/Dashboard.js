import {useState} from "react";

import Header from "./Header.js";
import Leaderboards from "./Leaderboards.js";
import WishHitsTable from "./WishHitsTable.js";

export default function Dashboard({server, server_names, data, usernames})
{
    const [tab, setTab] = useState(0);
    const tabSelected = (id) => (tab === id ? "selected" : "");

    return(
        <div className='canvas'>
            <h1 className='server-name'>{server_names[server]}</h1>
            <Header data={data} />
            <div className='menu'>
                <button onClick={() => setTab(0)} className={tabSelected(0)}>All Wishes</button>
                <button onClick={() => setTab(1)} className={tabSelected(1)}>Leaderboards</button>
            </div>
            {
                (() =>
                {
                    switch(tab)
                    {
                    case 0:
                        return <WishHitsTable data={data} usernames={usernames} />;
                    case 1:
                        return <Leaderboards data={data} usernames={usernames} />;
                    default:
                        return <p>Error.</p>;
                    }
                })()
            }
        </div>
    );
}