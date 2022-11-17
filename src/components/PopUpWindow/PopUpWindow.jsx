import style from './PopUpWindow.module.scss'

export function PopUp(props) {
    return (
        <div className={style.modal}>
            {props.inner}
        </div>
    );
}
