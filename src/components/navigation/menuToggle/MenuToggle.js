import './MenuToggle.css'

function MenuToggle({onToggle, isOpen}) {

    const cls = [
        'toggle-icon',
        'fas',
    ]

    if(isOpen) {
        cls.push('fa-times')
        cls.push('open')
    } else {
        cls.push('fa-bars')
    }

    return (
        <i
            className={cls.join(' ')}
            onClick={onToggle}
        />
    )
}

export default MenuToggle;