import { Router } from "express";

//From controller
import { register, login, currentuser, allUsers, changeRole } from "../controllers/UserController.js";

//helpers
import { userRegisterValidation, userLoginValidation } from "../helpers/auth-validations.js";
import { validate } from "../helpers/handle-validations.js";
import { checkToken } from "../helpers/jwt-helper.js";
import { changeRoleValidation, checkAuthorization } from "../helpers/user-validations.js";

const router = Router()

router.post('/api/auth/register', userRegisterValidation, validate, register)
router.post('/api/auth/login', userLoginValidation, validate, login)
router.get('/api/users/currentuser', checkToken, currentuser)
router.get('/api/users/allusers', checkToken, allUsers)
router.put('/api/users/changerole', checkToken, checkAuthorization, changeRoleValidation, validate, changeRole)

export default router