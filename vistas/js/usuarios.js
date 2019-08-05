var tabla;
//sta es la funcion que se ejecuta al inicio
function init(){
    
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
init();
