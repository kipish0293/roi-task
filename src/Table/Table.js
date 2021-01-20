import React from 'react';

const Table = (props) => {
    return (
        <tr className="table-row">
            <td className="table-name td">{props.name}</td>
            <td className="table-phone td">{props.phone}</td>
            <td className="table-boss td">{props.boss}</td>
        </tr>
    )
}

export default Table;