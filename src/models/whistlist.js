const supabase = require("../config/supabase");

module.exports = {
  getAllWhistlist: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select(
          `*, user:userId(name, email), event:eventId(name, category, location, detail, dateTimeShow)`
        )
        .filter("userId", "in", `(${id})`)
        // .textSearch("userId", `${id}`)
        // .contains("userId", `[${id}]`)
        // .like("userId", "%e5481edb-7f69-4a44-98b3-a7d47962c772%")
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createWhistlist: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteWishlist: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .delete()
        .eq("wishlistId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
