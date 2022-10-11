import axios from "axios";

const list = () => axios.get("/public/preferences");

const publicPreferencesApi = { list };

export default publicPreferencesApi;
