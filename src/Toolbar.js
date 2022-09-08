import {useEffect, useState} from "react";
import data from "./data/servers.js";

function Dropdown({selection, handler})
{
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(() => () => setOpen(false));
    useEffect(() =>
    {
        setTimeout(() =>
        {
            if(open)
            {
                window.addEventListener("click", close)
            }
            else
            {
                window.removeEventListener("click", close);
            }
        }, 0);
    }, [open, close]);

    return(
        <div className='dropdown'>
            <button className={open ? "selection arrow-active" : "selection"}
                    onClick={() => setOpen(!open)}>
                {selection}
            </button>
            {open && (
                <div className='items'>
                    {
                        data.map(el =>
                        {
                            return <button className={selection === el ? "selected-item" : ""}
                                           onClick={() => {handler(el); setOpen(false);}}
                                           key={el}>
                                        {el}
                                   </button>;
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default function Toolbar({selection, handler})
{
    useEffect(() =>
    {
        handler(data[0]);
    }, [handler]);

    return(
        <div className='toolbar'>
            <Dropdown selection={selection} handler={handler} />
        </div>
    );
}