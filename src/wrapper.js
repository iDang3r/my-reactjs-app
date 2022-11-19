import {App} from './app/App.jsx'

import {BrowserRouter} from 'react-router-dom'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {rootReducer} from './store/reducers/root-reducer.js'

const store = createStore(rootReducer)

export function Wrapper() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    )
}
