import http from "./http-common";

export async function addUser(u) {
  return await http.post("/signUp", u);
}
export async function userLogin(loginData) {
  return await http.post("/login", loginData);
}

export async function getUsers(query) {
  return await http.get(`/users?keyword=${query}`);
}

export async function deleteUserById(id) {
  return await http.delete(`/users/${id}`);
}

export async function updatePassword(userId, newPassword) {
  return await http.put(`/update-password/${userId}`, { newPassword });
}
