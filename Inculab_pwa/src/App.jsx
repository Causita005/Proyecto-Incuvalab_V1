import { IonApp, IonLoading, IonRouterOutlet, IonSpinner, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
/* Tailwind styles */
import './theme/tailwind.css';
import { useContext } from 'react';
import { StoreContext } from './context/store';
import Login from './pages/Public/Login';
import Public from './pages/Public';
import Private from './pages/Private';

setupIonicReact();

function App() {
  const store = useContext(StoreContext);
  return (
    <IonApp>
      <IonLoading
        isOpen={store.loading}
        message={'Cargando...'}
      />
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Public} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/app" component={Private} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
