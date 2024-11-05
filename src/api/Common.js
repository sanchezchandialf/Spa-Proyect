//const API_URL = "http://localhost:8080/"; 
/* const API_URL = "http://vps-4291415-x.dattaweb.com:8080/"; */
//const API_URL = "https://agile-flexibility-production.up.railway.app/"
//const API_URL = "https://calm-perception-production.up.railway.app/"
const API_URL = "https://amiable-learning-production.up.railway.app/"

const createFetchApi = () => {
  return async function FetchApi({
    path,
    method,
    payload,
    requiresAuth,
    contentType,
    token,
  }) {
    const headers = {
      "Content-Type": contentType || "application/json",
    };

    let url = `${API_URL}${path}`;

    if (requiresAuth) {
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        const message = "Authentication required";
        return { code: 401, data: null, message };
      }
    }

    let body;
    if (method === "GET" && payload !== undefined) {
      let queryString;
      if (typeof payload === "object") {
        queryString = Object.entries(payload)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
      } else {
        queryString = payload;
      }
      url += `?${queryString}`;
    } else if (payload instanceof FormData) {
      body = payload;
    } else {
      body = JSON.stringify(payload);
    }

    const options = {
      method,
      headers,
      body,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData.message || "Error en la solicitud";

      return { code: response.status, data: null, message };
    }

    let rData = null;
    if (method !== "DELETE") {
      rData = await response.json();
    }
    if (rData && Object.keys(rData).includes("data")) {
      rData = rData.data;
    }
    return { code: response.status, data: rData, message: "Success" };
  };
};

export const FetchApi = createFetchApi();
