import {useEffect} from "react";
import data from "./data/servers.js";

export default function Toolbar({handler})
{
    useEffect(() =>
    {
        handler(data[0]);
    }, [handler]);

    return(
        <div className='toolbar'>
            <select onChange={(event) => handler(event.target.value)}>
                {
                    data.map(el =>
                    {
                        return <option>{el}</option>;
                    })
                }
            </select>
        </div>
    );
}