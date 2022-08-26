import data from "./fakedata.js";
import WishHitItem from "./WishHitItem.js";

export default function WishHitsTable()
{
    return (
        <table>
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
                            return <WishHitItem item={el} />;
                        }
                    )
                }
            </tbody>
        </table>
    );
}