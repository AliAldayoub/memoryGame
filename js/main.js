const LetsGetStarted = document.querySelector('.overlay button'),
	overlay = document.querySelector('.overlay'),
	nameInput = document.querySelector('.overlay input'),
	name = document.querySelector('.name'),
	treis = document.querySelector('.tries'),
	imgBlocks = document.querySelector('.img-blocks'),
	blocks = Array.from(imgBlocks.children),
	startGameButton = document.querySelector('.start'),
	resetGameButton = document.querySelector('.Reset'),
	timerSecOne = document.querySelector('.timer p span.secOne'),
	timerSecTwo = document.querySelector('.timer p span.secTwo'),
	timerMinOne = document.querySelector('.timer p span.minOne'),
	timerMinTwo = document.querySelector('.timer p span.minTwo'),
	bgSound = document.getElementById('bgSound'),
	newPlayer = document.querySelector('.newPlayer'),
	overlayImage = document.querySelector('.overlayImage'),
	pImagesChoose = document.querySelectorAll('.overlayImage p'),
	difrrentImg = document.querySelector('.difrrentImg'),
	imgGallery = document.querySelector('.imgGallery');

let triesCounter = 0,
	orderRange = [ ...Array(blocks.length).keys() ],
	playerCounter = 0;

const Fruits = [
		'apple.png',
		'apple.png',
		'banana.png',
		'banana.png',
		'grapes.png',
		'grapes.png',
		'kiwi.png',
		'kiwi.png',
		'mango.png',
		'mango.png',
		'orange.png',
		'orange.png',
		'pear.png',
		'pear.png',
		'pineapple.png',
		'pineapple.png',
		'strawberry.png',
		'strawberry.png',
		'watermelon.png',
		'watermelon.png'
	],
	webDev = [
		'angular-min.png',
		'angular-min.png',
		'css-min.png',
		'css-min.png',
		'html-min.png',
		'html-min.png',
		'jquery-min.png',
		'jquery-min.png',
		'js-min.png',
		'js-min.png',
		'php-min.png',
		'php-min.png',
		'react-min.png',
		'react-min.png',
		'sass-min.png',
		'sass-min.png',
		'vue-min.png',
		'vue-min.png',
		'wordpress-min.png',
		'wordpress-min.png'
	],
	CardNumber = [
		'cardclub5.svg',
		'cardclub5.svg',
		'cardclub6.svg',
		'cardclub6.svg',
		'cardclub10.svg',
		'cardclub10.svg',
		'cardclubA.svg',
		'cardclubA.svg',
		'cardclubQ.svg',
		'cardclubQ.svg',
		'carddiamondA.svg',
		'carddiamondA.svg',
		'cardheart5.svg',
		'cardheart5.svg',
		'cardheart6.svg',
		'cardheart6.svg',
		'cardheart10.svg',
		'cardheart10.svg',
		'cardheartQ.svg',
		'cardheartQ.svg'
	],
	players = [
		'benzema.png',
		'benzema.png',
		'cristiano.png',
		'cristiano.png',
		'grizman.png',
		'grizman.png',
		'hazard.png',
		'hazard.png',
		'iniesta.png',
		'iniesta.png',
		'marcelo.png',
		'marcelo.png',
		'messi.png',
		'messi.png',
		'ramos.png',
		'ramos.png',
		'suarez.png',
		'suarez.png',
		'zlatan.png',
		'zlatan.png'
	];

LetsGetStarted.addEventListener('click', clearOverlay);

startGameButton.addEventListener('click', startGame);

resetGameButton.addEventListener('click', resetGame);

resetGameButton.classList.add('no-clicking');

newPlayer.addEventListener('click', function() {
	checkPlayerAllow();
	document.querySelector('.note').style.display = 'block';

	overlay.style.display = 'flex';

	nameInput.value = '';

	nameInput.placeholder = 'Enter Your Name And Press Reset please';

	clearInterval(interval);
});
document.querySelector('.overlayImage .close').addEventListener('click', function() {
	overlayImage.style.display = 'none';
});
document.querySelector('.overlay .close').addEventListener('click', function() {
	if (document.querySelector('.note').style.display == 'block') overlay.style.display = 'none';
});

pImagesChoose.forEach((p) => {
	p.addEventListener('click', function(e) {
		blocks.forEach((block, index) => {
			let id = e.target.id;

			if (id == 'Fruits') {
				block.children[1].firstElementChild.src = `images/fruits/${Fruits[index]}`;
				if (block.children[1].firstElementChild.classList.contains('players')) {
					block.children[1].firstElementChild.classList.remove('players');
				}
			} else if (id == 'webDev') {
				block.children[1].firstElementChild.src = `images/webDev/${webDev[index]}`;
				if (block.children[1].firstElementChild.classList.contains('players')) {
					block.children[1].firstElementChild.classList.remove('players');
				}
			} else if (id == 'CardNumber') {
				block.children[1].firstElementChild.src = `images/card/${CardNumber[index]}`;
				if (block.children[1].firstElementChild.classList.contains('players')) {
					block.children[1].firstElementChild.classList.remove('players');
				}
			} else if (id == 'players') {
				block.children[1].firstElementChild.src = `images/players/${players[index]}`;
				block.children[1].firstElementChild.classList.add('players');
			}

			overlayImage.style.display = 'none';
			imgBlocks.classList.add('no-clicking');
			blocks.forEach((block) => {
				if (block.classList.contains('has-matched')) block.classList.remove('has-matched');
				if (block.classList.contains('rotate')) block.classList.remove('rotate');
			});
		});
	});
});

difrrentImg.addEventListener('click', function() {
	overlayImage.style.display = 'flex';
});

function clearOverlay() {
	if (nameInput.value == '') name.innerHTML = 'Default User';
	else name.innerHTML = nameInput.value;

	treis.innerHTML = 0;

	overlay.style.display = 'none';

	bgSound.play();

	bgSound.volume = 0.6;
}

function startGame() {
	shuffle(orderRange);

	flipCardStart();

	blocks.forEach((block, index) => {
		block.style.order = orderRange[index];

		block.addEventListener('click', function() {
			flipBlock(block);
		});
	});

	startGameButton.classList.add('no-clicking');

	treis.innerHTML = 0;

	timer();

	resetGameButton.classList.remove('no-clicking');
}

function flipCardStart() {
	for (let i = 0; i < blocks.length; i++) blocks[i].classList.add('rotate');

	setTimeout(() => {
		for (let i = 0; i < blocks.length; i++) blocks[i].classList.remove('rotate');
	}, 2000);
}

function shuffle(array) {
	let current = array.length,
		temp,
		random;
	while (current > 0) {
		random = Math.floor(Math.random() * current);

		current--;

		temp = array[current];

		array[current] = array[random];

		array[random] = temp;
	}
	return array;
}
function flipBlock(selectedBlock) {
	selectedBlock.classList.add('rotate');

	let allFlippedBlocks = blocks.filter((flippedBlock) => flippedBlock.classList.contains('rotate'));

	if (allFlippedBlocks.length === 2) {
		stopClicking();

		checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
	}
	winner();
}
function stopClicking() {
	imgBlocks.classList.add('no-clicking');

	setTimeout(() => {
		imgBlocks.classList.remove('no-clicking');
	}, 1200);
}
function checkMatchedBlock(firstBlock, secondBlock) {
	if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
		// console.log('Yes checked is same');
		firstBlock.classList.remove('rotate');
		secondBlock.classList.remove('rotate');

		firstBlock.classList.add('has-matched');
		secondBlock.classList.add('has-matched');

		document.getElementById('success').play();
	} else {
		setTimeout(() => {
			firstBlock.classList.remove('rotate');
			secondBlock.classList.remove('rotate');
		}, 1000);
		triesCounter++;

		treis.innerHTML = triesCounter;

		document.getElementById('wrong').play();
	}
}
// function resetGame() {
// 	triesCounter = 0;
// 	treis.innerHTML = triesCounter;
// 	blocks.forEach((block) => {
// 		if (block.classList.contains('has-matched')) block.classList.remove('has-matched');
// 		if (block.classList.contains('rotate')) block.classList.remove('rotate');
// 	});

// 	startGameButton.classList.remove('no-clicking');
// }
function resetGame() {
	checkPlayerAllow();
	triesCounter = 0;

	treis.innerHTML = triesCounter;

	blocks.forEach((block) => {
		if (block.classList.contains('has-matched')) block.classList.remove('has-matched');
		if (block.classList.contains('rotate')) block.classList.remove('rotate');
	});

	shuffle(orderRange);

	setTimeout(() => {
		blocks.forEach((block, index) => {
			block.style.order = orderRange[index];
		});
		flipCardStart();
	}, 1000);

	clearInterval(interval);

	timer();
	if (imgBlocks.classList.contains('no-clicking')) imgBlocks.classList.remove('no-clicking');
	if (imgBlocks.classList.contains('animation')) imgBlocks.classList.remove('animation');
}
function timer() {
	let secOne = 0,
		secTwo = 0,
		minOne = 0,
		minTwo = 0;
	interval = setInterval(() => {
		timerSecOne.innerHTML = secOne;
		timerSecTwo.innerHTML = secTwo;
		timerMinOne.innerHTML = minOne;
		timerMinTwo.innerHTML = minTwo;

		secOne++;
		if (secOne > 9) {
			secOne = 0;
			secTwo++;
			if (secTwo > 5) {
				secOne = 0;
				secTwo = 0;
				minOne++;
			}
			if (minOne > 9) {
				minOne = 0;
				minTwo++;
			}
		}
	}, 1000);
}

function winner() {
	let wonStatues = blocks.filter((flippedBlock) => flippedBlock.classList.contains('has-matched'));

	if (wonStatues.length == blocks.length) {
		setTimeout(() => {
			imgBlocks.classList.add('animation');

			clearInterval(interval);
		}, 900);
		setTimeout(() => {
			blocks.forEach((block) => block.classList.remove('has-matched'));

			createWinnerElement();
		}, 1000);
	}
}

function createWinnerElement() {
	let winner = document.createElement('div');
	winner.classList.add('winner');

	let winnerName = document.createElement('p');
	winnerName.classList.add('winnerName');
	winner.appendChild(winnerName);

	winnerName.innerHTML = name.innerHTML;

	let winnerTime = document.createElement('p');
	winnerTime.classList.add('winnerTime');
	winner.appendChild(winnerTime);

	winnerTime.innerHTML = document.querySelector('.timer p').innerHTML;

	let winnerTries = document.createElement('p');
	winnerTries.classList.add('winnerTries');
	winner.appendChild(winnerTries);

	winnerTries.innerHTML = treis.innerHTML;

	document.querySelector('.storge').appendChild(winner);

	playerCounter++;
}

function checkPlayerAllow() {
	if (playerCounter > 5) {
		let con = confirm('We Are Sorry Maximmum Player Is 5 Do You Want To Reload The Page');
		if (con) location.reload();
		else return;
	}
}
