import { useState } from 'react';
import SolicitudForm from './components/SolicitudForm';
import SolicitudList from './components/SolicitudList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Motor de Reglas de Priorización</h1>

      <section>
        <SolicitudForm onCreated={handleCreated} />
      </section>

      <hr />

      <section>
        <SolicitudList refresh={refresh} />
      </section>
    </div>
  );
}

export default App;
