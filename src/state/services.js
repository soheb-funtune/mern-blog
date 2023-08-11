import axios from "axios";

const createAPi = axios.create();
const defaultOptions = {
  headers: {},
  queryParams: null,
};

const httpClient = async (url = "", options = defaultOptions, noBaseUrl) => {
  const baseUrl =
    import.meta.env.VITE_REACT_APP_API_URL || "https://localhost:2000";
  let fullPath = noBaseUrl ? `${url}` : `${baseUrl}${url}`;

  createAPi.defaults.headers.common["Content-Type"] = "multipart/form-data";

  return await createAPi({
    url: fullPath,
    method: options.method || "GET",
    data: options.data,
  })
    .then((response) => {
      return {
        data: response?.data || {},
        error: response?.data.error || response?.data.message,
        // message: response?.data.message,
        // success:
        //   (response?.status === 200 || response?.status === 201) &&
        //   response?.data?.status,
        // ...(allowRaw && { raw_response: response }),
      };
    })
    .catch((err) => {
      return {
        data: err,
        errors: err?.response?.data.errors,
        success: false, // mock status
        errorData: err?.response?.data,
        message: err?.response?.message || err?.response?.data?.message,
        ...(allowRaw && { raw_error: err }),
      };
    });
};

export const RegisterAPI = async (data) => {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/reg`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  });
  //   const { data, error } = httpClient("/reg", { method: "GET", data });

  console.log("process:", import.meta.env.VITE_REACT_APP_API_URL);
  if (res.ok === 201) {
    alert("Successful to Register");
  } else {
    alert("Failed to Register");
  }
};
