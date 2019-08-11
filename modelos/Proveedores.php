<?php

   //conexión a la base de datos

   require_once("../config/conexion.php");

   class Proveedor extends Conectar{

          //método para seleccionar registros

   	   public function get_proveedores(){

   	   	  $conectar=parent::conexion();
   	   	  parent::set_names();

   	   	  $sql="SELECT * FROM proveedor";

   	   	  $sql=$conectar->prepare($sql);
   	   	  $sql->execute();

   	   	  return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
   	   }

   	    //método para insertar registros

        public function registrar_proveedor($cedula,$proveedor,$telefono,$correo,$direccion,$estado,$id_usuario){


           $conectar= parent::conexion();
           parent::set_names();

           $sql="insert into proveedor
           values(null,?,?,?,?,?,now(),?,?);";

          
            $sql=$conectar->prepare($sql);

            $sql->bindValue(1, $_POST["cedula"]);
            $sql->bindValue(2, $_POST["razon"]);
            $sql->bindValue(3, $_POST["telefono"]);
            $sql->bindValue(4, $_POST["email"]);
            $sql->bindValue(5, $_POST["direccion"]);
            $sql->bindValue(6, $_POST["estado"]);
            $sql->bindValue(7, $_POST["id_usuario"]);
            $sql->execute();
      
           
            
        }

        //método para mostrar los datos de un registro a modificar
        public function get_proveedor_por_cedula($cedula){

            
            $conectar= parent::conexion();
            parent::set_names();

            $sql="select * from proveedor where cedula=?";

            $sql=$conectar->prepare($sql);

            $sql->bindValue(1, $cedula);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }

         //este metodo es para validar el id del proveedor(luego llamamos el metodo de editar_estado()) 
        //el id_proveedor se envia por ajax cuando se editar el boton cambiar estado y que se ejecuta el evento onclick y llama la funcion de javascript
        public function get_proveedor_por_id($id_proveedor){

          $conectar= parent::conexion();

          //$output = array();

          $sql="select * from proveedor where id_proveedor=?";

                $sql=$conectar->prepare($sql);

                $sql->bindValue(1, $id_proveedor);
                $sql->execute();

                return $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);


        } 


        
        /*metodo que valida si hay registros activos*/
        public function get_proveedor_por_id_estado($id_proveedor,$estado){

         $conectar= parent::conexion();

         //declaramos que el estado esté activo, igual a 1

         $estado=1;

          
        $sql="select * from proveedor where id_proveedor=? and estado=?";

              $sql=$conectar->prepare($sql);

              $sql->bindValue(1, $id_proveedor);
               $sql->bindValue(2, $estado);
              $sql->execute();

              return $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);


         }


         public function editar_proveedor($cedula,$proveedor,$telefono,$correo,$direccion,$estado,$id_usuario){

        	$conectar=parent::conexion();
        	parent::set_names();

        	$sql="update proveedor set 

             cedula=?,
             razon_social=?,
             telefono=?,
             correo=?,
             direccion=?,
             estado=?,
             id_usuario=?
             where 
             cedula=?

        	";
            
           //echo $sql; exit();

        	  $sql=$conectar->prepare($sql);

		      $sql->bindValue(1, $_POST["cedula"]);
              $sql->bindValue(2, $_POST["razon"]);
              $sql->bindValue(3, $_POST["telefono"]);
              $sql->bindValue(4, $_POST["email"]);
              $sql->bindValue(5, $_POST["direccion"]);
              $sql->bindValue(6, $_POST["estado"]);
              $sql->bindValue(7, $_POST["id_usuario"]);
              $sql->bindValue(8, $_POST["cedula_proveedor"]);
              $sql->execute();
 

        }


         //método si el proveedor existe en la base de datos
        //valida si existe la cedula, proveedor o correo, si existe entonces se hace el registro del proveedor
        public function get_datos_proveedor($cedula,$proveedor, $correo){

           $conectar=parent::conexion();

          $sql="select * from proveedor where cedula=? or razon_social=? or correo=?";

           //echo $sql; exit();

           $sql=$conectar->prepare($sql);

            $sql->bindValue(1, $cedula);
            $sql->bindValue(2, $proveedor);
            $sql->bindValue(3, $correo);
            $sql->execute();

           //print_r($email); exit();

           return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }


          //método para activar Y/0 desactivar el estado del proveedor

        public function editar_estado($id_proveedor,$estado){

        	 $conectar=parent::conexion();

        	 //si el estado es igual a 0 entonces el estado cambia a 1
        	 //el parametro est se envia por via ajax
        	 if($_POST["est"]=="0"){

        	   $estado=1;

        	 } else {

        	 	 $estado=0;
        	 }

        	 $sql="update proveedor set 
              
              estado=?
              where 
              id_proveedor=?

        	 ";

        	 $sql=$conectar->prepare($sql);

        	 $sql->bindValue(1,$estado);
        	 $sql->bindValue(2,$id_proveedor);
        	 $sql->execute();
        }


   
}


?>