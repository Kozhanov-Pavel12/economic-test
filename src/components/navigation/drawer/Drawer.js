import React from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/backdrop/Backdrop'
import './Drawer.css'

class Drawer extends React.Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName='active'
                        onClick={this.clickHandler} 
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = ['drawer']

        if(!this.props.isOpen) {
            cls.push('close')
        }

        console.log(this.props.isAuthenticated)

        const links = [
            {to: '/', label: 'Домашняя страница', exact: true},
            {to: '/quiz-list', label: 'Список тестов', exact: true}
        ]

        if(this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {
                            this.renderLinks(links)
                        }
                    </ul>
                </nav>
                
                {
                    this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null
                }

            </React.Fragment>
        )
    }
}

export default Drawer;