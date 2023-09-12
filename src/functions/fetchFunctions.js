const token = localStorage.getItem('token');
const headers = {
  "Content-Type": "application/json",
  'Authorization': `Bearer ${token}`,
}

export function getData(url) {
  return fetch(url, {
    method: "GET",
    headers: headers
  })
}

export function createData(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
}

export function updateData(url, data) {
  return fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });
}

export function deleteData(url) {
  return fetch(url, {
    method: "DELETE",
    headers: headers
  });
}

