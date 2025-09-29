import { Provider } from 'react-redux'
import { store } from '../state/store'
import { Products } from './Products'

export function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <h1>React ↔ ASP.NET Web API</h1>
                <Products />
            </div>
        </Provider>
    );
}
