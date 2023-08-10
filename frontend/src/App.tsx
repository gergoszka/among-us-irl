import './App.css'
import {WebsocketContainer} from "./websocket/websocket-container";
import {AdminPanel} from "./components/panels/admin-panel";
import {SabotagePanel} from "./components/panels/sabotage-panel";

const App = () => {

    const searchParams = new URLSearchParams(document.location.search)
    const mode = searchParams.get('mode')

    if (mode === 'admin') {
        return <AdminPanel />
    }

    if (mode === 'sabotage') {
        return <SabotagePanel />
    }

    return (
        <div>
            <WebsocketContainer />
        </div>
  )
}

export default App
