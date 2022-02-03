const express = require("express");
const router = express.Router();
const proveedor = require ("../controllers/proveedor.controller");

router.post("/", proveedor.create);

router.get("/",proveedor.findAll);

router.get("/:proveedorId",proveedor.findOne);

router.put("/:proveedorId",proveedor.update);

router.delete("/:proveedorId",proveedor.delete);

router.delete("/",proveedor.deleteAll);

module.exports = router;
