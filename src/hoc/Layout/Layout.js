import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevSate) => {
            return { showSideDrawer: !prevSate.showSideDrawer };
        })
    };

    render() {
        return (
            <Aux>
                <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;