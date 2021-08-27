import './Button.css'

function Button(props) {
    const cls = [
        'button',
        props.type
    ]

    return (
        <button className={cls.join(' ')} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;