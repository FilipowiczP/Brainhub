import { Router, Request, Response } from "express";
const models = require("../data/model/event");

export const eventController: Router = Router();

//    === GET ALL EVENTS FROM DATABASE ===
eventController.get("/event", (req: Request, res: Response) => {
  models.allEvent(function (err: Error, events: any) {
    res.send(err ? [] : events);
  });
});

//    === ADD NEW EVENT IN DATABASE ===
eventController.post("/event", (req: Request, res: Response) => {
  models.newEvent(req.body, function (err: Error, event: any) {
    if (err) {
      res.status(404);
      res.json({
        error: "Event has not been added",
      });
    } else {
      res.json(event);
    }
  });
});
