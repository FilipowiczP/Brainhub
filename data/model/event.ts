import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    eventDate: Date,
  },
  {
    collection: "Event",
  }
);

const Event = mongoose.model("Event", schema);

//    === FIND EVENT IN DATABASE ===
function allEvents(cb: Function) {
  Event.find({}).exec(function (err, event) {
    if (err) {
      cb(err);
    } else {
      cb(null, event);
    }
  });
}

//    === CREATE NEW USER IN DATABASE ===
function addNewEvent(event: Object, cb: Function) {
  let newEvent = new Event(event);
  newEvent.save(function (err, newEvent) {
    if (err) {
      cb(err);
    } else {
      cb(null, newEvent);
    }
  });
}

module.exports = {
  newEvent: addNewEvent,
  allEvent: allEvents,
};
