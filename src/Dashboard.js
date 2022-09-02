import data from "./data/fakedata.js";
import {useState} from "react";

import Header from "./Header.js";
import Leaderboards from "./Leaderboards.js";
import WishHitsTable from "./WishHitsTable.js";

export default function Dashboard()
{
    const [tab, setTab] = useState(0);

    return(
        <>
            <Header data={data} />
            <button onClick={() => setTab(0)}>All Wishes</button>
            <button onClick={() => setTab(1)}>Leaderboard</button>
            {
                (() =>
                {
                    switch(tab)
                    {
                    case 0:
                        return <WishHitsTable data={data} />;
                        break;
                    case 1:
                        return <Leaderboards data={data} />;
                        break;
                    }
                })()
            }
        </>
    );
}