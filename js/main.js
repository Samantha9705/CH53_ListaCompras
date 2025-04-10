//definir dos variables para cada elemento a validar
//id=variable
//si en un imput pido valor. trim es para quitar los espacios

const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //tagName contiene varios elementos, por eso se usa item; para especificar el elemento
const contadorProductos = document.getElementById("contadorProductos");
const totalProductos = document.getElementById("totalProductos");
const productosTotal = document.getElementById("productosTotal");

// Numeracion de la primera columna de la tabla 
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = []; //new Array();


function validarCantidad(){
    if(txtNumber.value.trim().length<=0){ //la longitud es mayor a 0 
        return false;
    }
    if(isNaN(txtNumber.value)){
        return false;
    }
   
    if(Number(txtNumber.value)<=0){ //lo convierte en numero y tiene que ser mayor o igual a 0
        return false;

    }
    return true;
};// validar cantidad 

//precio por producto al azar

function getPrecio(){
    return Math.round((Math.random() *10000)) / 100;
    
};
console.log(getPrecio);

// Validamos el nombre
btnAgregar.addEventListener("click", function (event){

    event.preventDefault();

    let isValid = true; // benadera para verificar que las validaciones se cumplen 

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none"
    
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<strong> El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display="block"
        isValid=false; // es falso cuando no cumple las validaciones 
    };

    if (! validarCantidad()){ //si no es valida la cantidad
        console.log("Cantidad inválida:", txtNumber.value);
            txtNumber.style.border = "solid medium red";
            alertValidacionesTexto.innerHTML += "<br><strong> La cantidad no es correcta</strong>"; //+= trae los dos textos si ambos estan mal 
            alertValidaciones.style.display="block"
            isValid=false;
    };

    if (isValid){
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                    <td>${cont}</td>
                    <td> ${txtName.value}</td>
                    <td> ${txtNumber.value}</td>
                    <td> ${precio} </td>
                    </tr>`;

            let elemento = { // Aqui creamos un objeto  "nombre de" : valor. Es formato json
                "cont" : cont,
                "nombre" : txtName.value,
                "cantidad" : txtNumber.value,
                "precio" : precio
            };
            datos.push(elemento); // lo guardamos (el objeto) en el array

            localStorage.setItem("datos", JSON.stringify(datos)); // guardamos el array en el local storage en string

         
        cuerpoTabla.insertAdjacentHTML("beforeend", row); //anade celddas nuevas hacia abajo
        
        contadorProductos.innerText = cont;
       costoTotal+= precio * Number (txtNumber.value);
       precioTotal.innerText = "$" + costoTotal.toFixed(2);
       totalEnProductos+= Number (txtNumber.value);
       productosTotal.innerText = totalEnProductos;
       
        txtName.value = "";
        txtNumber.value = ""; 
        txtName.focus(); // el puntero parpade en el name 
    };

});


window.addEventListener("load", function(event){
    event.preventDefault();
    
    if(localStorage.getItem("datos")!=null){
        datos = JSON.parse(localStorage.getItem("datos"));
    }

    datos.forEach((d) =>{
        let row = `<tr>
                     <td>${d.cont}</td>
                     <td>${d.nombre}</td>
                     <td>${d.cantidad}</td>
                     <td>${d.precio}</td>
                     </tr>`
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));

        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
    
});

// Validamos la cantidad. - que sea numerico, que sea mayo a 0 

