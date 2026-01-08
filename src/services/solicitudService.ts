import api from '../api/api';

export interface Solicitud {
    id?: number;
    tipo: string;
    prioridadManual: number;
    fechaCreacion?: string;
    usuario: string;
}

export const getSolicitudesPriorizadas = async (): Promise<Solicitud[]> => {
    const response = await api.get('/solicitud/priorizadas');
    return response.data;
};

export const createSolicitud = async (solicitud: Solicitud): Promise<Solicitud> => {
    const response = await api.post('/solicitud', solicitud);
    return response.data;
};
