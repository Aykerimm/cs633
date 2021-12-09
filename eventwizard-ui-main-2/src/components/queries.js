

const apiURL = process.env.API_URL || 'api.lookum.org';
const serverURL = "http://"+ apiURL;

export const signUp = (credentials) => {
    return fetch(serverURL + "/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credentials)
    })
}

export const signIn = (credentials) => {
    return fetch(serverURL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credentials)
    })
}

export const getEventsByCategory = (category) => {

    if (category === 'ALL') {
        category = '';
    }
    const requestURL = serverURL + "/event/" + (category !== '' ? ('?category=' + category) : '');
    
    console.log(requestURL)

    return fetch(requestURL)
}

export const getEventById = (id) =>{ 
    return fetch(serverURL + '/event/' + id);
}

export const orderTicket = (orderInfo) => {
    const body = JSON.stringify(orderInfo);
    console.log(body);
    return fetch(serverURL + '/order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body,
    });
}