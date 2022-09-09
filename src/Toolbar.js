import {useEffect, useState} from "react";
import data from "./data/servers.js";
import username from "./data/usersdata.js";

function Dropdown({selection, handler})
{
    const [open, setOpen] = useState(false);
    const [close] = useState(() => () => setOpen(false));
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
        <div className='dropdown server-menu'>
            <button className={open ? "selection arrow-active" : "selection"}
                    onClick={() => setOpen(prev => !prev)}>
                {data[selection]}
            </button>
            {open && (
                <div className='items'>
                    {
                        Object.keys(data).map(key =>
                        {
                            const val = data[key];
                            return(
                                <button className={data[selection] === val ? "selected-item" : ""}
                                       onClick={() => {handler(key); setOpen(false);}}
                                       key={key}>
                                    {val}
                               </button>
                            );
                        })
                    }
                </div>
            )}
        </div>
    );
}

function UserMenu({user})
{
    const [open, setOpen] = useState(false);
    const [close] = useState(() => () => setOpen(false));
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
        <div className='dropdown user-menu'>
            <button className="username"
                    onClick={() => setOpen(prev => !prev)}>
                {username[user]}
                <img alt='avatar' src='https://cdn.discordapp.com/avatars/241657945237094410/f2aad44a9199704f3af728ec1e39a507.webp' />
            </button>
            {open && (
                <div className='items'>
                    <button>
                        Log out<i class="fa fa-sign-out logout-icon"></i>
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Toolbar({selection, handler, user})
{
    useEffect(() =>
    {
        handler(Object.keys(data)[0]);
    }, [handler]);

    return(
        <div className='toolbar'>
            <Dropdown selection={selection} handler={handler} />
            <UserMenu user={user} />
        </div>
    );
}