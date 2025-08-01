const getToken = () => {
    let token = JSON.parse(localStorage.getItem('fh_user'))?.token ?? "";
    return token;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const structureError = (e) => {
    if (e.response?.data) {
        return e.response.data.detail;
    } else {
        return e.message;
    }
};

export const getData = async (path_url, requires_token) => {
    let token = "";
    if (requires_token) {
        token = getToken();
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${path_url}`, {
            method: 'GET',
            headers: requires_token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        console.log('Url:', API_BASE_URL);
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw structureError(error);
    }
};

export const postData = async (path_url, requires_token, data) => {
    let token = "";
    if (requires_token) {
        token = getToken();
    }
    console.log('object', data);

    try {
        const response = await fetch(`${API_BASE_URL}/${path_url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                ...(requires_token && { 'Authorization': `Bearer ${token}` }),
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw structureError(error);
    }
};

export const editData = async (path_url, requires_token, data) => {
    let token = "";
    if (requires_token) {
        token = getToken();
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${path_url}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                ...(requires_token && { 'Authorization': `Bearer ${token}` }),
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw structureError(error);
    }
};

// Alias for editData to maintain consistency with naming conventions
export const putData = async (path_url, data, requires_token) => {
    return await editData(path_url, requires_token, data);
};

export const deleteData = async (path_url, requires_token) => {
    let token = "";
    if (requires_token) {
        token = getToken();
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${path_url}`, {
            method: 'DELETE',
            headers: requires_token ? { 'Authorization': `Bearer ${token}` } : {}
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw structureError(error);
    }
};

export const uploadFile = async (path_url, formdata, requires_token, method) => {
    let token = "";
    if (requires_token) {
        token = getToken();
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${path_url}`, {
            method: method,
            body: formdata,
            headers: {
                ...(requires_token && { 'Authorization': `Bearer ${token}` })
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw structureError(error);
    }
};
