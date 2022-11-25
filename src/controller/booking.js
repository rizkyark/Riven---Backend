const bookingModel = require("../models/booking");
const wrapper = require("../utils/wrapper");
const groupingSection = require("../utils/groupingSection");

module.exports = {
  createBooking: async (request, response) => {
    try {
      const {
        userId,
        eventId,
        totalTicket,
        totalPayment,
        paymentMethod,
        section,
      } = request.body;
      const setData = {
        userId,
        eventId,
        totalTicket,
        totalPayment,
        paymentMethod,
        statusPayment: "Success",
      };

      const result = await bookingModel.createBooking(setData);
      //   console.log(result.data[0].bookingId);

      await section.map(async (section) => {
        const sectionData = {
          bookingId: result.data[0].bookingId,
          section,
          statusUsed: "Unused",
        };
        await bookingModel.createBookingSection(sectionData);
        return section;
      });

      return wrapper.response(
        response,
        result.status,
        "Success Create Booking",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getBookingByUserId: async (request, response) => {
    try {
      const { id } = request.params;

      const result = await bookingModel.getBookingByUserId(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }
      return wrapper.response(
        response,
        result.status,
        "Success Get Greetings",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getBookingSection: async (request, response) => {
    try {
      const { id } = request.params;

      const result = await bookingModel.getBookingSection(id);

      // console.log(result.data);
      const resultSection = groupingSection(result);

      return wrapper.response(
        response,
        result.status,
        "Success Get Booking Section",
        resultSection
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
