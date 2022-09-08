import {useState} from "react";
import Dashboard from "./Dashboard";
import Toolbar from "./Toolbar.js";

export default function App()
{
    const [server, setServer] = useState();
    return(
        <>
            <Toolbar selection={server} handler={setServer} />
            <Dashboard server={server} />
        </>
    );
}