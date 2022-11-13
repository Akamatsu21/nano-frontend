import username from "./data/usersdata.js";

function sortObject(obj)
{
    let items = Object.keys(obj).map((key) =>
    {
        return [key, obj[key]];
    });

    items.sort((first, second) =>
    {
        return second[1] - first[1];
    });

    let sorted_obj = {};
    items.map((el) =>
    {
        const use_key = el[0];
        const use_value = el[1];
        sorted_obj[use_key] = use_value;
        return null;
    });

    return sorted_obj;
}

function RankingTable({title, data})
{
    return(
        <table className='nano-table ranking'>
            <thead><tr><th colSpan='2'>{title}</th></tr></thead>
            <tbody>
                {
                    Object.keys(sortObject(data)).map((el) =>
                    {
                        return (<tr key={username[el]}><td>{username[el]}</td><td>{data[el]}</td></tr>);
                    })
                }
            </tbody>
        </table>
    );
}

function TopClaimers({data})
{
    const leaders = data.reduce((acc, el) =>
    {
        if(el.claimer)
        {
            if(!acc[el.claimer])
            {
                acc[el.claimer] = 1;
            }
            else
            {
                ++acc[el.claimer];
            }
        }
        return acc;
    }, {});

    return <RankingTable title='Top Claimers' data={leaders} />;
}

function TopWishers({data})
{
    const leaders = data.reduce((acc, el) =>
    {
        el.wishers.forEach((wisher) =>
        {
            if(!acc[wisher])
            {
                acc[wisher] = 1;
            }
            else
            {
                ++acc[wisher];
            }
        });
        
        return acc;
    }, {});

    return <RankingTable title='Top Wishers' data={leaders} />;
}

function TopRollers({data})
{
    const leaders = data.reduce((acc, el) =>
    {
        if(!acc[el.roller])
        {
            acc[el.roller] = 1;
        }
        else
        {
            ++acc[el.roller];
        }
        return acc;
    }, {});

    return <RankingTable title='Top Rollers' data={leaders} />;
}

export default function Leaderboards({data})
{
    return (
        <div className='leaderboards'>
            <TopRollers data={data} />
            <TopWishers data={data} />
            <TopClaimers data={data} />
        </div>
    );
}