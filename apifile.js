
function inicar() {
    zonadatos=document.getElementById('zonadatos');
    var boton=document.getElementById('boton');
    boton.addEventListener('click',crear, false);
    navigator.webkitPersistentStorage.requestQuota(5*1024*1024, acceso);
    
}

function acceso() {
    window.webkitRequestFileSystem(PERSISTENT, 5*1024*1024, crearsis, errores);

}
function crearsis(sistema) {
    espacio=sistema.root;
    ruta="";
    mostrar();
}

function crear(){
    var nombre_archivo=document.getElementById('entrada').value;
    
    if(nombre_archivo!=""){
        nombre_archivo=ruta+nombre_archivo;
        espacio.getFile(nombre_archivo, {create: true, exclusive: false}, mostrar, errores);
    }
}

function mostrar(){
    document.getElementById('entrada').value="";
    zonadatos.innerHTML="";
    espacio.getDirectory(ruta, null, leerdir, errores);
}

function leerdir(dir){
    lector=dir.createReader();
    leer();
}

function leer(){
    lector.readEntries(function(archivis){
        if(archivis.length){
            listar(archivis);
        }
    }, errores);
}

function listar(archivis){
    for(var i=0;i<archivis.length;i++){
        if(archivis[i].isFile){
            zonadatos.innerHTML+=archivis[i].name+"<br>";
        }else if(archivis[i].isDirectory){ 
            zonadatos.innerHTML+="<span class= ' directorio'>"+archivis[i].name+"</span";
        }
    }
}

function errores(e) {
        alert("Ha habido un error: " + e.code);
}

function volver() {
    espacio.geDirectory(ruta, null, function(dir_actual){
        dir_actual.getParent(function(dir_padre){
            ruta=dir_padre.fullPath;
            mostrar();
        }, errores);
    }, errores);        
}



/*function crear(){
    var nombre_archivo=document.getElementById('entrada').value;

    if(nombre_archivo!=""){
        espacio.getFile(nombre_archivo, {create: true, exclusive: false}, mostrar, errores);
    }
}   
function mostrar(entrada){
    document.getElementById('entrada').value="";
    zonadatos.innerHTML="Exito en la creacio de espacio y archivo";
    zonadatos.innerHTML += "Nombre: " + entrada.name + "<br>";
    zonadatos.innerHTML += "Ruta: " + entrada.fullPath + "<br>";
}
function errores(e) {
    alert("Ha habido un error: " + e.code);
}
*/




window.addEventListener("load", inicar,  false);