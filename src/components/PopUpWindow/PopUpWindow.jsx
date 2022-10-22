import React from 'react'
import style from './PopUpWindow.module.scss'

export class PopUp extends React.Component {
    render() {
        return (
            <div className={style.modal}>
                {this.props.inner}
            </div>
        );
    }
}