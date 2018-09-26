import { SERVICE_CONSTANTS } from '../../config';
import { mockApiService } from '../../../common/services';

/**
 * @description This method fetches the route from the server based on the given token
 */
const getRoute = async token => {
    const url = `${SERVICE_CONSTANTS.route}/${token}`;
    const response = await mockApiService.get(url);
    const { data } = response;
    return data;
};

/**
 * @description This method fetches the token from the server based on the starting and drop-off point
 */
const getToken = async (from, to) => {
    const url = SERVICE_CONSTANTS.route;
    const request = {
        from,
        to
    };
    const response = await mockApiService.post(url, request);
    const { data } = response;
    return data.token;
};

/**
 * @description Fetch the directions based on the starting and drop-off point
  */
const findDirections = async (from, to) => {
    // console.log(from);
    // console.log(to);
    const token = await getToken(from, to);
    let result = await getRoute(token);
    if (
        result &&
        result.status &&
        result.status.toLowerCase() === 'in progress'
    ) {
        result = await findDirections(from, to);
    }

    return result;
};

export { findDirections, getToken, getRoute };