import { Router } from "express"
import UserController from "./controller/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.get("/users", UserController.find);
routes.post("/user", UserController.create);
routes.post("/login", UserController.login);

//autentication routes
routes.use(authMiddleware)
routes.get("/profile",  UserController.getProfile);

export default routes;