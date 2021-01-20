import React from 'react';

const Option = (props) => {
    return (
        <option value={props.name} key={props.key}>{props.name}</option>
    )
}

export default Option;