//Obtener elementos principales del html
var containerCell = document.getElementById("container-cell");
var containerPiece = document.getElementById("container-piece");
var selectedPiece = null;

createBoard();
createPieces();


function createCell(width,height){
	

	var cellElement = document.createElement("div");
	cellElement.style.width = width;
	cellElement.style.height = height;
	cellElement.style.border = "1px solid black";
	//cellElement.style.backgroundColor="yellow";
	cellElement.onclick=clickCell;		

	return cellElement;
}

function createPiece(width, height, piece){
	var cellElement = document.createElement("div");
	var pieceElement=document.createElement("img");

	//CONFIGURANDO LA CELDA QUE PORTARÁ LA PIEZA DENTRO DEL CONTENEDOR DE PIEZAS.
	//ESTO EVITARÁ QUE LAS PIEZAS SE DESACOMODEN AL MOVER UNA (NO ESTARÁN EN STACK).
	//cellElement es el nombre de una nueva variable, no se confunda con la funcion.
	cellElement.style.width = width;
	cellElement.style.height = height;

	//Configurando la pieza dentro del contenedor pieza.
	pieceElement.width=width;
	pieceElement.height=height;
	pieceElement.style.border="1px solid black";
	pieceElement.src=piece.image;
	pieceElement.onclick=clickPiece;
	
	cellElement.appendChild(pieceElement);
	
	return cellElement;
}

function createBoard(){
	var width = containerCell.offsetWidth;
	var height = containerCell.offsetHeight;

	width /=4;
	height /=4;

	for(var i=0; i<16; i++){
		let cellElement = createCell(width, height);
		addCell(cellElement);
	}
}

function createPieces(){
	var width = containerPiece.offsetWidth;
	var height = containerPiece.offsetHeight;
	width/=4;
	height/=4;
	var pieces=generatePieceData();
	for(let i=0; i<16; i++){
		let pieceElement = createPiece(width, height, pieces[i]);
		addPiece(pieceElement);
	}
}
function addCell(element){
	containerCell.appendChild(element);
}

function addPiece(element){
	containerPiece.appendChild(element);
}

function generatePieceData(){
	//Generamos una lista de piezas
	var pieces=[];
	for(let i=0; i<16; i++){
		let piece={
			image: "img/"+(i+1)+".jpg",
			position: i
		};
		pieces.push(piece);
	}
	return pieces;
}

function clickPiece(e){
	var piece = e.target;
	selectedPiece = piece; 
}

function clickCell(e){
	if(selectedPiece){
		let cell=e.target;
		cell.appendChild(selectedPiece);
	}else{
		console.log("Seleccione una pieza.");
	}
}