import { Router } from "express";
import { GroupController } from "./App/controllers/GroupController";

//controllers
const groupController = new GroupController


//router
const route = Router()


//available routes

route.get("/groups", groupController.index)
route.post("/groups", groupController.create)
route.get("/groups/:id", groupController.show)
route.patch("/groups/:id", groupController.update)
route.delete("/groups/:id", groupController.destroy)


export {route as routes}