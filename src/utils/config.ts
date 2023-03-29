const api_url = process.env.REACT_APP_API_URL;
const config = {
  userURL: {
    login: api_url + "/users/single/login",
    register: api_url + "/users/single/register",
    getAll: api_url + "/users/all",
    getSingle: api_url + "/users/single",
    update: api_url + "/users/single/update",
    delete: api_url + "/users/single/delete",
  },
  eventURL: {
    getAll: api_url + "/events/all",
    getSingle: api_url + "/events/single",
    create: api_url + "/events/single/add",
    update: api_url + "/events/single/update",
    delete: api_url + "/events/single/delete",
  },
  ticketURL: {
    getAll: api_url + "/tickets/all",
    getSingle: api_url + "/tickets/single",
    create: api_url + "/tickets/single/add",
    update: api_url + "/tickets/single/update",
    delete: api_url + "/tickets/single/delete",
  },
  dealURL: {
    getAll: api_url + "/deals/all",
    getSingle: api_url + "/deals/single",
    create: api_url + "/deals/single/add",
    update: api_url + "/deals/single/update",
    delete: api_url + "/deals/single/delete",
  },
  categoryURL: {
    getAll: api_url + "/categories/all",
    getSingle: api_url + "/categories/single",
    create: api_url + "/categories/single/add",
    update: api_url + "/categories/single/update",
    delete: api_url + "/categories/single/delete",
  },
  options: {
    headers: { "content-type": "application/json" },
  },
};

export default config;