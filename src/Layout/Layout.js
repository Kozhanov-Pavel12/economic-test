import React from 'react'
import Drawer from '../components/navigation/drawer/Drawer';
import MenuToggle from '../components/navigation/menuToggle/MenuToggle'
import './Layout.css'
import { connect } from 'react-redux'

class Layout extends React.Component {
    state = {
        menu: false
    }


    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }


    menuToggleHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }


    render() {
        return (
            <div className='layout'>

                <Drawer 
                    isOpen={this.state.menu} 
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <MenuToggle 
                    isOpen={this.state.menu} 
                    onToggle={this.menuToggleHandler} 
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);