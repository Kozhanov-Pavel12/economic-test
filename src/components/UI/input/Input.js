import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && touched && shouldValidate
}

function Input(props) {
    const inputType = props.type || 'text'
    const htmlFor = `${inputType} = ${Math.random()}`
    const cls = ['input']

    if(isInvalid(props)) {
        cls.push('invalid')
    }

    return (
        <div className={cls.join(' ')}>

            <label htmlFor={htmlFor}> {props.label} </label>

            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid(props) ? <span>{props.errorMessage || 'Введите данные'}</span> : null
            }

        </div>
    )
}

export default Input;