

function inicar(){
    zonadatos=document.getElementById("zonadatos");
    var archivos=document.getElementById("archivos");
    archivos.addEventListener("change", procesar, false);  
}

function procesar(e){
    var archivos=e.target.files;
    zonadatos.innerHTML="";
    var miarchivo=archivos[0];
    //alert(miarchivo.type);
    if (!miarchivo.type.match(/image/)){
        alert("Selecciona una imagen, por favor");
    }else{
        zonadatos.innerHTML+="Nombre del archivo: " + miarchivo.name + "<br>";
        zonadatos.innerHTML+="Tamaño del archivo: " + Math.round(miarchivo.size/1024) + " kB <br>";
        var lector=new FileReader();
        lector.readAsDataURL(miarchivo);
        lector.addEventListener("load", mostrar_em_web, false);
    }

    //var lector=new FileReader();
    //lector.readAsText(miarchivo, "ISO-8859-1");
    //lector.addEventListener("load", mostrar_em_web, false);
}

function mostrar_em_web(e){
    var resultado=e.target.result;
    zonadatos.innerHTML+="<img src='" + resultado + "' width='95%' >";

}


window.addEventListener("load", inicar,  false);