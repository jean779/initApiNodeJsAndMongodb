import { Router } from "express"
import UserController from "./controller/UserController";

const routes = Router();

routes.get("/users", UserController.find);
routes.post("/user", UserController.create);
routes.post("/login", UserController.login);
routes.get("/profile", UserController.getProfile);

export default routes;