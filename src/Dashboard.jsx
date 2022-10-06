import {useState} from "react";

import Header from "./Header";
import Leaderboards from "./Leaderboards";
import WishHitsTable from "./WishHitsTable";

export default function Dashboard({server, server_names, data, filter, currFilter})
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
                        return <WishHitsTable data={data} filter={filter} currFilter={currFilter}/>;
                    case 1:
                        return <Leaderboards data={data} />;
                    default:
                        return <p>Error.</p>;
                    }
                })()
            }
        </div>
    );
}