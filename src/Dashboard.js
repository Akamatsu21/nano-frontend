import data from "./data/fakedata.js";
import {useState} from "react";

import Header from "./Header.js";
import Leaderboards from "./Leaderboards.js";
import WishHitsTable from "./WishHitsTable.js";

export default function Dashboard()
{
    const [tab, setTab] = useState(0);
    const tabSelected = (id) => (tab === id ? "selected" : "");

    return(
        <div className='canvas'>
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
                        return <WishHitsTable data={data} />;
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