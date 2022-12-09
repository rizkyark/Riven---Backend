const supabase = require("../config/supabase");

module.exports = {
  getCountEvent: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  showAllEvent: (offset, limit, searchName, sort, searchDateShow, asc) => {
    // new Promise((resolve, reject) => {
    //   const day = new Date(searchDateShow);
    //   const nextDay = new Date(new Date(day).setDate(day.getDate() + 1));
    //   // const query = supabase
    //   .from("event")
    //   .select("*")
    //   .range(offset, offset + limit - 1)
    //   .ilike("name", `%${searchName}%`)
    //   .order(`${sort}`, { ascending: true });
    // .gt("dateTimeShow", `${day.toISOString()}`)
    // .lt("dateTimeShow", `${nextDay.toISOString()}`)
    // query.then((result) => {
    //   if (!result.error) {
    //     resolve(result);
    //   } else {
    //     reject(result);
    //   }
    // });

    if (searchDateShow === "") {
      return new Promise((resolve, reject) => {
        supabase
          .from("event")
          .select("*")
          .range(offset, offset + limit - 1)
          .ilike("name", `%${searchName}%`)
          .order(`${sort}`, { ascending: asc })
          .then((result) => {
            if (!result.error) {
              resolve(result);
            } else {
              reject(result);
            }
          });
      });
    }
    return new Promise((resolve, reject) => {
      const day = new Date(searchDateShow);
      const nextDay = new Date(new Date(day).setDate(day.getDate() + 1));
      supabase
        .from("event")
        .select("*")
        .range(offset, offset + limit - 1)
        .ilike("name", `%${searchName}%`)
        .order(`${sort}`, { ascending: asc })
        .gt("dateTimeShow", `${day.toISOString()}`)
        .lt("dateTimeShow", `${nextDay.toISOString()}`)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    });
  },

  getEventById: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*")
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createEvent: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateEvent: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .update(data)
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteEvent: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .delete()
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getImage: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("image")
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
