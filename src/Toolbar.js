import {useEffect, useState} from "react";

function Dropdown({selection, items, handler})
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
                {items[selection]}
            </button>
            {open && (
                <div className='items'>
                    {
                        Object.keys(items).map(key =>
                        {
                            const val = items[key];
                            return(
                                <button className={selection === key ? "selected-item" : ""}
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

function UserMenu({user, logout})
{
    const [open, setOpen] = useState(false);
    const [close] = useState(() => () => setOpen(false));
    const user_defined = user.id !== undefined;
    
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
            {user_defined && (
                <button className="username"
                        onClick={() => setOpen(prev => !prev)}>
                    {user.username}
                    <img alt='avatar' src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`} />
                </button>
            )}
            {open && (
                <div className='items'>
                    <button onClick={logout}>
                        Log out<i className="fa fa-sign-out logout-icon"></i>
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Toolbar({selection, items, handler, user, logout})
{
    return(
        <div className='toolbar'>
            <Dropdown selection={selection} items={items} handler={handler} />
            <UserMenu user={user} logout={logout} />
        </div>
    );
}