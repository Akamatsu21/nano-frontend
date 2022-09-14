function WishHitItem({item, usernames})
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
                {usernames[item.roller]}
            </td>
            <td className="breakable">
                {
                    item.wishers.map(el =>
                    {
                        return usernames[el];
                    }).join("\n")
                }
            </td>
            <td>
                {usernames[item.claimer]}
            </td>
            <td>
                {item.claimSpeed}
            </td>
        </tr>
    );
}

export default function WishHitsTable({data, usernames})
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
                        return <WishHitItem item={el} key={el.id} usernames={usernames} />;
                    })
                }
            </tbody>
        </table>
    );
}