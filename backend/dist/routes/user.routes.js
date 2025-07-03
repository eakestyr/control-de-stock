"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const userRoutes = (0, express_1.Router)();
const userController = new UserController_1.UserController();
userRoutes.post("/api/v1/signup", (req, res) => userController.create(req, res));
userRoutes.post("/api/v1/signin", (req, res) => userController.login(req, res));
exports.default = userRoutes;
