import './Select.css'

function Select(props) {
    const htmlFor = `${props.label} = ${Math.random()}`
    return (
        <div className='select'>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select 
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {
                    props.options.map((elem, index) => {
                        return (
                            <option
                                value={elem.value}
                                key={elem.value + index}
                            >
                                {elem.text}
                            </option>
                        )
                    })
                }

            </select>
        </div>
    )
}

export default Select;