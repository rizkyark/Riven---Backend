const supabase = require("../config/supabase");

module.exports = {
  createBooking: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createBookingSection: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("bookingSection")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getBookingByUserId: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .select(
          `*, bookingSection:bookingId(section, statusUsed), event:eventId(name, location, dateTimeShow)`
        )
        .eq("userId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getBookingSection: (eventId) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .select(`bookingId, eventId, statusPayment, bookingSection ( section )`)
        .eq("eventId", eventId)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
