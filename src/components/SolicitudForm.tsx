import React, { useState } from 'react';
import { createSolicitud } from '../services/solicitudService';

interface SolicitudFormProps {
    onCreated: () => void;
}

const SolicitudForm: React.FC<SolicitudFormProps> = ({ onCreated }) => {
    const [usuario, setUsuario] = useState('');
    const [tipo, setTipo] = useState('INCIDENTE');
    const [prioridadManual, setPrioridadManual] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createSolicitud({
                usuario,
                tipo,
                prioridadManual
            });
            setUsuario('');
            setPrioridadManual(1);
            onCreated();
            alert('Solicitud creada con éxito');
        } catch (error) {
            console.error('Error al crear solicitud:', error);
            alert('Error al crear solicitud');
        }
    };

    return (
        <div>
            <h2>Crear Solicitud</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario: </label>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tipo: </label>
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="INCIDENTE">INCIDENTE</option>
                        <option value="REQUERIMIENTO">REQUERIMIENTO</option>
                        <option value="CONSULTA">CONSULTA</option>
                    </select>
                </div>
                <div>
                    <label>Prioridad Manual (1-5): </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={prioridadManual}
                        onChange={(e) => setPrioridadManual(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default SolicitudForm;
