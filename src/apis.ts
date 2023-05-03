import request from './utils';

export const getPatients = async () => {
    return await request('/mock_data.json');
};