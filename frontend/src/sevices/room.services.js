import http from "./http-common";

export async function getRoom(query, type) {
  return await http.get(`/rooms?keyword=${query}&type=${type}`);
}

export async function getRooms(query) {
  return await http.get(`/rooms?keyword=${query}`);
}

export async function deleteRoomByID(id) {
  return await http.delete(`/rooms/${id}`);
}

export async function addRoom(room) {
  return await http.post("/rooms", room, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function getRoomByID(id) {
  return await http.get(`/rooms/${id}`);
}

export async function updateRoom(id, room) {
  return await http.put(`/rooms/${id}`, room, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function updateRoom2(roomId, updatedRoomData) {
  return await http.patch(`/rooms/${roomId}`, updatedRoomData);
}
