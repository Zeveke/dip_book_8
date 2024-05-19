import { getRooms } from "../../sevices/room.services";

export async function fetchRooms(query) {
  try {
    const res = await getRooms(query);
    return res.data;
  } catch (error) {
    console.error("Ошибка при выборе комнат:", error);
    throw error;
  }
}
