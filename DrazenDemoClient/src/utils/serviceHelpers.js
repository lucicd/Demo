export function putConfig(body) {
  const tokenType = localStorage.getItem("tokenType");
  const accessToken = localStorage.getItem("accessToken");

  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${accessToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function postConfig(body) {
  const tokenType = localStorage.getItem("tokenType");
  const accessToken = localStorage.getItem("accessToken");

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${accessToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function deleteConfig() {
  const tokenType = localStorage.getItem("tokenType");
  const accessToken = localStorage.getItem("accessToken");

  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${accessToken}`,
    },
  };
}

export function getConfig() {
  const tokenType = localStorage.getItem("tokenType");
  const accessToken = localStorage.getItem("accessToken");

  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${accessToken}`,
    },
  };
}
