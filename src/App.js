import {useState} from "react";
import Dashboard from "./Dashboard";
import Toolbar from "./Toolbar.js";

export default function App()
{
    const [server, setServer] = useState("");
    const [user, setUser] = useState("241657945237094410");
    return(
        <>
            <Toolbar selection={server} handler={setServer} user={user} />
            <Dashboard server={server} />
        </>
    );
}