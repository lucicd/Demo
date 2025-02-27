const apiEndpoint = "/api/login";

function postConfig(data) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

const authenticationService = {
  async login(credentials) {
    const response = await fetch(apiEndpoint, postConfig(credentials));
    return response;
  },
};

export default authenticationService;
