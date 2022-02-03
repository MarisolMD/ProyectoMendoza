const Proveedor= require("../models/proveedor.model");

exports.create =(req, res)=> {
  if (!req.body){
    res.status(400).send({
      message:"El contenido no debe ser vacio"
    });
  }

  const proveedor = new Proveedor({
    nit: req.body.nit,
    razon_social: req.body.razon_social,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    representante: req.body.representante,

  });
  Proveedor.create(proveedor, (err, data) => {
    if(err){
      res.status(500).send({
        message:err.message
      });
    }
    else res.send(data);
  });
};

exports.findOne =(req, res)=> {
  Proveedor.findById(req.params.proveedorId,(err,data)=>{
    if (err){
      if(err.kind ==="not_found"){
        res.status(404).send({
          message:`¨Proveedor no encontrado con id ${req.params.proveedorId}`
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el proveedor con id ${req.params.proveedorId}`,
        });
      }
    } else res.send(data);

  });
};
exports.findAll = (req, res) => {
  Proveedor.getAll((err, data) => {
    if(err){
      res.status(500).send({
        message: err.message,
     });
    } else res.send(data);

  });

};

exports.update = (req, res) => {
  if (!req.body){
    res.status(400).send({
      message:"El contenido no debe ser vacio"
    });
  }
  Proveedor.updateById(req.params.proveedorId, new Proveedor(req.body), (err, data) =>{
    if (err) {
    if(err.kind ==="not_found"){
      res.status(404).send({
        message:`¨Proveedor no encontrado con id ${req.params.proveedorId}`
      });
    } else {
      res.status(500).send({
        message: `Error al requerir el proveedor con id ${req.params.proveedorId}`,
      });
    }   
  } else res.send (data);
 }
 );
};
exports.delete = (req, res) =>{
  Proveedor.remove(req.params.proveedorId, (err, data) => {
    if (err) {
    if(err.kind ==="not_found"){
      res.status(404).send({
        message:`¨Proveedor no encontrado con id ${req.params.proveedorId}`
      });
    } else {
      res.status(500).send({
        message: `Error al requerir el proveedor con id ${req.params.proveedorId}`,
      });
    }   
  } else res.send ({ message: "proveedor eliminado"});
 });
};

exports.deleteAll = (req, res) =>{
  Proveedor.removeAll ( (err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir el proveedor con id ${req.params.proveedorId}`,
      });   
  } else res.send ({ message: "Todos los Proveedores eliminados"});
 });
};
           