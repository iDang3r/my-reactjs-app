import style from './Auth.module.scss'
import {useState} from 'react'
import {setStorageValue} from '../../localStorage/useLocalStorage'
import {useNavigate} from 'react-router-dom'
import {getUserLogInPromise} from "../../store/loaders/userLogInLoader";

export function Auth() {
    const navigate = useNavigate()

    const [inputName, setInputName] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    const handleLogIn = () => {
        getUserLogInPromise(inputName, inputPassword).then((user) => {
            setStorageValue('user', user)
            navigate('/')
        }).catch((error) => {
            alert(error)
        });
    }

    const handleTitleChange = (event) => {
        setInputName(event.target.value)
    }

    const handleTextChange = (event) => {
        setInputPassword(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogIn()
        }
    }

    return (<>
        <div className={style.block}>
            <table className={style.inputTable}><tbody>
                <tr>
                    <td>Name:</td>
                    <td><input
                        className={style.fieldName}
                        value={inputName}
                        onChange={handleTitleChange}
                    /></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input
                        className={style.fieldName}
                        value={inputPassword}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown}
                        type={'password'}
                    /></td>
                </tr>
            </tbody></table>
            <button
                className={style.logInButtons + " " + style.logInButtonsLeft}
                onClick={handleLogIn}
            >Log in</button>
            <button
                className={style.logInButtons + " " + style.logInButtonsRight}
                onClick={() => navigate('/')}
            >Back Home</button>
        </div>
    </>)
}
