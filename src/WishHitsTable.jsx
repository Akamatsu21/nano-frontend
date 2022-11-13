import username from "./data/usersdata.js";

function WishHitItem({item})
{
    return (
        <tr onClick={() => {window.open(item.link)}}>
            <td>
                {item.date}
            </td>
            <td>
                {item.character}
            </td>
            <td>
                {username[item.roller]}
            </td>
            <td className="breakable">
                {
                    item.wishers.map(el =>
                    {
                        return username[el];
                    }).join("\n")
                }
            </td>
            <td>
                {username[item.claimer]}
            </td>
            <td>
                {item.claimSpeed}
            </td>
        </tr>
    );
}

export default function WishHitsTable({data, filter, currFilter})
{
    return (
        <table className="nano-table full-width">
            <thead><tr>
                <th onClick={() => filter('1')}>Date{currFilter == 1 ? "⬇️" : currFilter == -1 ? "⬆️" : "➖"}</th>
                <th onClick={() => filter('2')}>Character{currFilter == 2 ? "⬇️" : currFilter == -2 ? "⬆️" : "➖"}</th>
                <th onClick={() => filter('3')}>Rolled by{currFilter == 3 ? "⬇️" : currFilter == -3 ? "⬆️" : "➖"}</th>
                <th /*onClick={() => filter('wished')}*/>Wished by</th>
                <th onClick={() => filter('4')}>Claimed by{currFilter == 4 ? "⬇️" : currFilter == -4 ? "⬆️" : "➖"}</th>
                <th onClick={() => filter('5')}>Claim speed{currFilter == 5 ? "⬆️" : currFilter == -5 ? "⬇️" : "➖"}</th>
            </tr></thead>
            <tbody>
                {
                    data.map(el =>
                    {
                        return <WishHitItem item={el} key={el.id} />;
                    })
                }
            </tbody>
        </table>
    );
}
