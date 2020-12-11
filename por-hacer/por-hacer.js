const fs = require('fs');

let listadoPorHacer = [];
const guardarDB = () => {
	let data = JSON.stringify(listadoPorHacer);

	fs.writeFile('db/data.json', data, (err) => {

	  if (err) throw new Error('No se pudo grabar', err);
		  	
	});
}

const cargarDB = () => {
	try {

		listadoPorHacer = require('../db/data.json');

	} catch (error) {
		listadoPorHacer =[];
	}


	
	
}


const crear = (descripcion) => {
	cargarDB();

	let porHacer = {
		descripcion,
		completado: false
	};

	listadoPorHacer.push(porHacer);
	guardarDB();

	return porHacer;

}


const getListado = () => {
	cargarDB();
	return listadoPorHacer;
}


const actualizar = (descripcion, completado=true) => {
	//cargar el arreglo
	cargarDB();

	// let index = listadoPorHacer.findIndex( tarea => {
	// 	return tarea.descripcion === descripcion;
	// })

	//esto es lo mismo que la notacion anterior
	//retorna el indice del elemento en caso lo encuentre, si es igual al valor ingresado
	let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

	//si es mayor o igual a cero. En caso sea cero, está en la primera posisicon del arreglo
	if(index >= 0){
		listadoPorHacer[index].completado=completado;
		guardarDB();
		return true;
	}else{
		return false;
	}

}


const borrar = (descripcion) =>{
	cargarDB();
	
	let nuevoListado = listadoPorHacer.filter( tarea => {
		//regresa el que no es igual a lo que ingresa el usuario, para tener un nuevo listado
		return tarea.descripcion !== descripcion;
	});

	if( listadoPorHacer.length === nuevoListado.length) {
		return false;
	}else{
		listadoPorHacer=nuevoListado;
		guardarDB();
		return true;
	}

}

module.exports = {
	crear,
	getListado,
	actualizar,
	borrar
}