import React, { useEffect, useState } from 'react';
import { getSolicitudesPriorizadas } from '../services/solicitudService';
import type { Solicitud } from '../services/solicitudService';

const SolicitudList: React.FC<{ refresh: boolean }> = ({ refresh }) => {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSolicitudes = async () => {
        try {
            const data = await getSolicitudesPriorizadas();
            setSolicitudes(data);
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, [refresh]);

    if (loading) return <p>Cargando solicitudes...</p>;

    return (
        <div>
            <h2>Ver lista ordenada (Priorizadas)</h2>
            {solicitudes.length === 0 ? (
                <p>No hay solicitudes registradas</p>
            ) : (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Tipo</th>
                            <th>Prioridad Manual</th>
                            <th>Fecha Creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.usuario}</td>
                                <td>{s.tipo}</td>
                                <td>{s.prioridadManual}</td>
                                <td>{s.fechaCreacion ? new Date(s.fechaCreacion).toLocaleString() : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SolicitudList;
