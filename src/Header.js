import hakase_picture from "./img/hakase.png";
import nano_picture from "./img/nano.png";
import sakamoto_picture from "./img/sakamoto.png";

function timeDiffInDays(date1, date2)
{
    return Math.floor((date1.getTime() - date2.getTime()) /　(24　*　3600　*　1000));
}

function WishCounter({count})
{
    return <div className='header-box'><img alt='' src={sakamoto_picture} /><div className='header-box-text'>Total wishes: {count}</div></div>;
}

function WishPerDay({count, start_date})
{
    const days_from_start = timeDiffInDays(new Date(), start_date);
    return <div className='header-box'><img alt='' src={nano_picture} /><div className='header-box-text'>Wish per day: {(count / days_from_start).toFixed(2)}</div></div>;
}

function DaysWithoutWish({last_date})
{
    const days_since_wish = timeDiffInDays(new Date(), last_date);
    return <div className='header-box'><img alt='' src={hakase_picture} /><div className='header-box-text'>{days_since_wish} days without a wish</div></div>;
}

export default function Header({data})
{
    const wish_count = data.length;
    const first_wish_date = data[0].date.split("/");
    const last_wish_date = data[data.length - 1].date.split("/");

    return (
        <div className='data-header'>
            <WishCounter count={wish_count} />
            <DaysWithoutWish last_date={new Date(last_wish_date[2], last_wish_date[1] - 1, last_wish_date[0])} />
            <WishPerDay count={wish_count} start_date={new Date(first_wish_date[2], first_wish_date[1] - 1, first_wish_date[0])} />
        </div>
    );
}