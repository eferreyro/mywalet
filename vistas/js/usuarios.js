var tabla;
//sta es la funcion que se ejecuta al inicio
function init(){
    listar(); //MOstrar todos los registros de usuario desde el inicio de la pagina
    //Cuando se da Click al boton submit entonces se ejecuta la funcion guardaryeditar(e).
    $('#usuario_form').on("submit", function(e){
        guardaryeditar(e);
    })
    //Cambia el titulo de la ventama modal cuando se fa click al boton agregar usuario
    $('#add_button').click(function(){
        $(".modal-title").text("Agregar Usuario");
    });
}

//Funcion que permite limpiar las ventanas de los campos.
function limpiar(){
    $('#cedula').val('');
    $('#nombre').val('');
    $('#apellido').val('');
    $('#cargo').val('');
    $('#usuario').val('');
    $('#password1').val('');
    $('#password2').val('');
    $('#telefono').val('');
    $('#email').val('');
    $('#direccion').val('');
    $('#estado').val('');
    $('#id_usuariola').val('');
}
//Funcion listar
function listar(){
    tabla=$('#usuario_data').dataTable({
    "aProcessing": true, //Activamos el procesamiento de datos por medio de Datatables
    "aServerSide": true, //Paginacion y filtrado realizados del lado del servidor
    dom: "Bfrtip", //Definimos los elementos del control de tabla
    buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdf'
            ],
    "ajax":
          {
              url: '../ajax/usuario.php?op=listar',
              type: "get",
              dataType: 'json',
              error: function(e){
                  console.log(e.responseText);
              }
          },  
    "bDestroy": true, //Reemplaza el selector dado en la DataTable mientras coincida con las propiedades del objeto a mostrar
    "responsive": true, //Hace las DataTables responsivas para Celular y Tablets.
    "bInfo": true, //Activamos la visualizacion de informacion de la tabla.
    "iDisplayLength": 10, //Cada 10 registros hace una paginacion
    "order": [[0, "desc"]], //Ordenar (Columa = 0, orden = Descendiente)
    "language":{
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    } //Fin language

    }).DataTable();
}

//Mostrar los datos del usuario en una ventana modal del formulario.
function mostrar(id_usuario){
   $.post("..ajax/usuario.php?op=mostrar",{id_usuario : id_usuario}, function(data, status)
   {
    //Los valores vienen como texto, entonces los parseamos como JSON
    data = JSON.parse(data);
        $("#usuarioModal").modal("show");// Mostramos el modal Usuario.
        $('#cedula').val(data.cedula);//Mostramos los datos de la cedula. Viene del arreglo usuario.php
        $('#nombre').val(data.nombre);
        $('#apellido').val(data.apellido);
        $('#cargo').val(data.cargo);
        $('#usuario').val(data.usuario);
        $('#password1').val(data.password1);
        $('#password2').val(data.password2);
        $('#telefono').val(data.telefono);
        $('#email').val(data.email);
        $('#direccion').val(data.direccion);
        $('#estado').val(data.estado);
        $('.modal-title').text("Editar Usuario");
        $('#id_usuario').val(id_usuario);
        $('#action').val("Edit");


   }); 
}
//Funcion guardaryeditar(e); se llama cuando se da click al boton submit
function guardaryeditar(e){
    e.preventDefault(); //No se activara´la accion predeterminada del evento, solo cuando se haga click al boton Submit
    var formData = new FormData($("#usuario_form")[0]);
    var password1 = $("#password1").val();
    var password2= $("#password2").val();
        //Si el password coincide con el password2 enviamos el formulario
        if(password1 == password2){
            $.ajax({
                url:"../ajax/usuario.php?op=guardaryeditar",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,

                success: function(datos){
                    $('#usuario_form')[0].reset(); //Limpiamos los campos
                    $('#usuarioModal').modal('hide'); //Escondemos el modal con HIDE

                    $('#resultados_ajax').html(datos); //Mostramos un div para el success con los datos.
                    $('#usuario_data').DataTable().ajax.reload();// Recargamos automaticamente la tabla

                    limpiar();  //Limpiamos los campos
                }

                });
        }else{
            bootbox.alert("No coinciden las claves");
        }
}
//EDITAR EL ESTADO DEL USUARIO
//Important: id_usuario, est envia por POST via AJAX
    function cambiarEstado(id_usuario, est){
        bootbox.confirm("¿esta´seguro de cambiar el estado del usuario?", function(result){
            if(result){
                $.ajax({
                    url:"../ajax/usuario.php?op=activarydesactivar",
                    method: "POST",
                    //Tomamos el valor id y el estado.
                    data:{id_usuario:id_usuario, est:est},
                    success: function(data){
                        $('#usuario_data').DataTable().ajax.reload();
                    }
                });
            }
        });//bootbox
    }
init();
