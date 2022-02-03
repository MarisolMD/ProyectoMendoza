var sql= require("./db");
class Proveedor {
    constructor(proveedor) {
      this.nit = proveedor.nit;
      this.razon_social = proveedor.razon_social;
      this.direccion = proveedor.direccion;
      this.telefono = proveedor.telefono;
      this.representante = proveedor.representante;
    }
    static create = (newProveedor, result) =>{
        sql.query("INSERT INTO proveedor SET?", newProveedor, (err, res) => {
          if (err) {
             console.log("error",err);
             result (err, null);
             return;
          }
          console.log("Proveedor creado",{ id: res.insertId});
          result(null, {id: res.insertId, ...newProveedor});
     });
     };
     static findById =(id,result)=>{
       sql.query(`SELECT * FROM proveedor WHERE id = ${id}`,(err,res) =>{
         if (err){
           console.log("error",err);
           result(err, null);
           return;
         }
         if (res.length){
           console.log("Proveedor encontrado", res[0]);
           result (null,res[0]);
           return;
         }

         result ({kind: "not_found"},null);

       });

     } ;

     static getAll = (result)=>{
       sql.query("SELECT * FROM proveedor",(err,res)=>{
        if (err){
          console.log("error",err);
          result(err, null);
          return;
        }

        console.log("Lista de proveedores");
        result(null,res);
      
       });

     };
     
     static updateById = (id, proveedor,result) => {
       sql.query("UPDATE proveedor SET nit = ?, razon_social = ?, direccion =?, telefono =?,representante=? WHERE id =?", 
       [proveedor.nit,proveedor.razon_social,proveedor.direccion,proveedor.telefono,proveedor.representante,id],(err, res) =>{
        if (err){
          console.log("error",err);
          result(err, null);
          return;
        }
        if (res.affetedRows == 0){
          result({ kind:"not_found"}, null);
          return;
        }
        
        console.log("Proveedor actualizado actualizado",{id, ...proveedor });
        result(null,{id, ...proveedor });
      }
      
      );
     };
     static remove = (id, result)=>{
       sql.query("DELETE FROM proveedor WHERE id = ?",id, (err, res)=> {
        if (err){
          console.log("error",err);
          result(err, null);
          return;
        }

        if (res.affetedRows == 0){
          result({ kind:"not_found"}, null);
          return;
        }

        console.log("Proveedor eliminado con id: ",id);
        result(null,res);

       });
     };

     static removeAll = (result)=>{
      sql.query("DELETE FROM proveedor", (err, res)=> {
       if (err){
         console.log("error",err);
         result(err, null);
         return;
       }

       console.log( `${res.affetedRows} Proveedor eliminado`);
       result(null,res);

      });
    };
   }
   module.exports = Proveedor;