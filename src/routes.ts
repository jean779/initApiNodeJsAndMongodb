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
import PhysicalAnalysisController from "./controller/PhysicalAnalysisController";
import PermissionsController from "./controller/PermissionsController";
import RoleController from "./controller/RoleController";
import { authorizeMiddleware } from "./middlewares/authRolesMiddleware";
import PermissionEnum from "./utils/enums/PermissionEnum";

const routes = Router();

routes.get("/users", UserController.find);
routes.get("/users/actives", UserController.findUserActives);
routes.post("/user", UserController.create);
routes.post("/login", UserController.login);
routes.put("/user_update", UserController.update);
routes.put("/user_delete/:id", UserController.softDelete);
routes.get("/user_name", UserController.getUserByName);


//analysisRequest
routes.post("/analysisRequest", AnalysisRequestController.create);
routes.get("/analysisRequest", AnalysisRequestController.find);
routes.get("/analysisRequest/identification/:identification", AnalysisRequestController.findbyIdentification);
routes.get("/analysisRequest/actives", AnalysisRequestController.findActives);
routes.delete("/analysisRequest", AnalysisRequestController.deleteAll);
routes.put("/analysisRequest/:id", AnalysisRequestController.update);
routes.put("/analysisRequest/start/:id", AnalysisRequestController.startAnalysisRequest);
routes.put("/analysisRequest/delete/:id", AnalysisRequestController.deleteAnalysisRequest);
routes.put("/analysisRequest/samplingDate/:id", AnalysisRequestController.setSamplingDateAnalysisRequest);

//company
routes.post("/company", CompanyController.create);
routes.get("/companys", CompanyController.find);
routes.get("/companys/user/:id", CompanyController.findByReponsible);

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

//PhysicalAnalysis
routes.post("/physicalAnalysis", PhysicalAnalysisController.create);
routes.get("/physicalAnalysis", PhysicalAnalysisController.find);

//Permissions
routes.post("/permissions", PermissionsController.create);
routes.get("/permissions", PermissionsController.find);
routes.get("/permissions/existing", PermissionsController.index);
routes.put("/permissions/:id", PermissionsController.update);
routes.delete("/permissions/:id", PermissionsController.delete);

//Roles
routes.post("/roles", RoleController.create);
routes.get("/roles",   RoleController.find, );
routes.delete("/roles/:id", RoleController.delete);

//autentication routes
routes.use(authMiddleware)

routes.get("/profile",  authorizeMiddleware("VIEW_PROFILE"), UserController.getProfile);


export default routes;