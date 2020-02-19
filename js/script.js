//Obtener elementos principales del html
var containerCell = document.getElementById("container-cell");
var containerPiece = document.getElementById("container-piece");
var selectedPiece = null;
var dialogElement = document.getElementById("dialog");

document.onkeypress = keypress;

//CREAR CASILLAS EN EL CONTENEDOR DE CELDAS
createBoard();

//CREAR PIEZAS EN EL CONTENEDOR DE LAS PIEZASE
createPieces();


function createCell(width,height, position){
	

	var cellElement = document.createElement("div");
	cellElement.style.width = width;
	cellElement.style.height = height;
	cellElement.style.border = "1px solid black";
	cellElement.style.backgroundColor="yellow";
	cellElement.dataset.position = position;
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
	pieceElement.dataset.position = piece.position;
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
		let cellElement = createCell(width, height, i);
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

	function keypress(ke){
		if(ke.keyCode == 101 || ke.keyCode == 69){
			let result = evaluateBoard();
			showDialog(result);
		}
	}

	function showDialog(result){
		var imgElement = dialogElement.children[0];
		var textContent = dialogElement.children[1];
		if(result){
			imgElement.src = "https://media1.tenor.com/images/fd78a4cbce84a5bfe6355a5b3d7989c0/tenor.gif?itemid=14829888";
			textContent.innerText = "Ganastes";
		}else{
		imgElement.src = "https://media1.tenor.com/images/0dc8c94adf3ae7a24327f276891870c9/tenor.gif?itemid=5247844";
		textContent.innerText = "Perdistes";
		returnPieces();
		}
		dialogElement.style.display = "block";
	}

	function evaluateBoard(){
		var cells = containerCell.children;
		for(cell of cells){
			let piece = cell.children[0];
			if(piece.dataset.position != cell.dataset.position){
				return false;
			}
		}
		return true;
	}

	function returnPieces(){
		let cells=containerCell.children;
		let cellPieces=container.children;

		for(cell of cells){
			let position = cell.dataset.position;
			let piece = cell.children[0];
			cellPieces[position].appendChild(piece);
		}

	}