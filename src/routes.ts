import { Router } from "express"
import AnalysisRequestController from "./controller/AnalysisRequestController";
import UserController from "./controller/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";
import CompanyController from "./controller/CompanyController";
import SampleController from "./controller/SampleController";
import TypesOfAnalysisController from "./controller/TypesOfAnalysisController";
import AnalysisResultsController from "./controller/AnalysisResultsController";
import AnalysisRequisicaoController from "./controller/AnalysisRequestRelationController";
import AnalysisRequestRelationController from "./controller/AnalysisRequestRelationController";

const routes = Router();

routes.get("/users", UserController.find);
routes.get("/actives", UserController.findUserActives);
routes.post("/user", UserController.create);
routes.post("/login", UserController.login);
routes.put("/user_update", UserController.update);
routes.put("/user_delete", UserController.update);

//analysisRequest
routes.post("/analysisRequest", AnalysisRequestController.create);
routes.get("/analysisRequest", AnalysisRequestController.find);

//company
routes.post("/company", CompanyController.create);
routes.get("/companys", CompanyController.find);

//analysisResult
routes.post("/analysisResults", AnalysisResultsController.create);
routes.get("/analysisResults",  AnalysisResultsController.find);

//analysisResult
routes.post("/analysisRequestRelation", AnalysisRequestRelationController.create);
routes.get("/analysisRequestRelation",  AnalysisRequestRelationController.find);

//sample
routes.post("/sample", SampleController.create);
routes.get("/samples", SampleController.find);

//TypesOfAnalysis
routes.post("/typesAnalysis", TypesOfAnalysisController.create);
routes.get("/typesAnalysis",TypesOfAnalysisController.find);

//autentication routes
routes.use(authMiddleware)
routes.get("/profile",  UserController.getProfile);


export default routes;