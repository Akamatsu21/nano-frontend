import username from "./data/usersdata.js";

function WishHitItem({item})
{
    return (
        <tr>
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

export default function WishHitsTable({data})
{
    return (
        <table className="nano-table full-width">
            <thead><tr>
                <th>Date</th>
                <th>Character</th>
                <th>Rolled by</th>
                <th>Wished by</th>
                <th>Claimed by</th>
                <th>Claim speed</th>
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
