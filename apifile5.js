
function inicar() {
    zonadatos=document.getElementById('zonadatos');
    var boton=document.getElementById('boton');
    boton.addEventListener('click',leer_archivo, false);
    navigator.webkitPersistentStorage.requestQuota(5*1024*1024, acceso);    
}

function acceso() {
    window.webkitRequestFileSystem(PERSISTENT, 5*1024*1024, crearsis, errores);

}
function crearsis(sistema) {
    espacio=sistema.root;
}

function leer_archivo(){
    var nombre=document.getElementById("archivo_origen");
    espacio.getFile(nombre, {create: true, exclusive: false}, function(entrada){
        entrada=file(leer_contenido, errores); 
    }, errores);
}

function leer_contenido(archivo){
    zonadatos = innerHTML+="Nombre: "+ archivo.nombre + "<br>";
    zonadatos = innerHTML+="Tamaño: " + archivo.tamaño + "<br>";
    var lector=new FileReader();
    lector.onload=exito();
    lector.readAsText(archivo);

}

function exito(){
    var resultado=e.target.result;
    document.getElementById("archivo_origen")="";
    zonadatos.innerHTML+="Contenido: " + resultado;
}

function errores(e) {
   
    alert("Ha habido un error: " + e.code);
}

window.addEventListener("load", inicar,  false);