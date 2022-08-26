export default function WishHitItem({item})
{
    const extra_wishees = [item["Wishee_2"], item["Wishee_3"], item["Wishee_4"]]

    return (
        <tr>
            <td>
                {item["Date"]}
            </td>
            <td>
                {item["Wished"]}
            </td>
            <td>
                {item["Roller"]}
            </td>
            <td>
                {
                    extra_wishees.reduce((acc, el) =>
                        {
                            if(el)
                            {
                                acc += ", " + el;
                            }
                            return acc;
                        },
                    item["Wishee_1"])
                }
            </td>
            <td>
                {item["Claimer"]}
            </td>
            <td>
                {item["Claim Speed"]}
            </td>
        </tr>
    );
}