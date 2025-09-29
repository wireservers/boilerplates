
import { Provider } from 'react-redux'
import { store } from '../state/store'
import { Dashboard } from './Dashboard'
export function App(){ return <Provider store={store}><div className="container"><h1>Nivo Realtime Telemetry</h1><Dashboard/></div></Provider> }
