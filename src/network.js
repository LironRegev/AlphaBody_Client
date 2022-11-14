const baseUrl = "https://localhost:5001/";

export function get(relativePath) {
  const fullPath = baseUrl + relativePath;
  return fetch(fullPath).then((resp) => resp.json());
}

export function post(relativePath, payload) {
  const fullPath = baseUrl + relativePath;
  return fetch(fullPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}

export function put(relativePath, payload) {
  const fullPath = baseUrl + relativePath;
  return fetch(fullPath, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (response) return response.json();
  });
}

export function del(relativePath) {
  const fullPath = baseUrl + relativePath;
  return fetch(fullPath, {
    method: "DELETE",
  }).then((response) => response.json());
}
