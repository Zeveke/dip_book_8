import http from './http-common'; 

export async function getBooking(query){
       return await http.get(`/bookings?keyword=${query}`);
}
export async function deleteBookingByID(id){
       return await http.delete(`/bookings/${id}`);
}
export async function addBooking(booking){
       return await http.post("/bookings/",booking);
}

export async function getBookingByID(id){
       return await http.get(`/bookings/${id}`);
}

export async function cancelBooking(bookingId) {
       return await http.patch(`/bookings/${bookingId}/cancel`);
}

export async function getBookings(userId) {
       return await http.get(`/bookings/user/${userId}`);
}

export async function updateBooking(booking){
       return await http.patch(`/bookings/${booking._id}`,booking);
}
