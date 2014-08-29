(function() {
	var actors = [];

	var hero = {
		domElement: document.querySelector('#hero'),
		x: 40,
		y: 40,
		vx: 0,
		vy: 0
	};
	actors.push(hero);

	function generateVillain() {
		var element = document.createElement('div');
		element.className = 'villain';
		element.innerText = '>:(';
		document.body.appendChild(element);
		return {
			domElement: element,
			x: getRandomInt(0, 800),
			y: getRandomInt(0, 600),
			vx: 0,
			vy: 0
		};
	}

	var villains = [];
	for (var i = 0; i < 10; i++) {
		var villain = generateVillain();
		actors.push(villain);
		villains.push(villain);
	}

	//main game loop
	var stream = Rx.Observable.interval(100);

	//handle keyboard input
	var keyDowns = Rx.Observable.fromEvent(document, 'keydown');
	var keyUps = Rx.Observable.fromEvent(document, 'keyup');

	keyDowns.merge(keyUps).select(function(x) {
		return x.keyCode;
	}).distinctUntilChanged().subscribe(function(kc) {
		console.log(kc);
		//left
		if (kc === 37) {
			hero.vx = Math.max(hero.x - 10, 0);
			//up
		}
		if (kc === 38) {
			hero.vy = Math.max(hero.y - 10, 0);
			//right
		}
		if (kc === 39) {
			hero.vx = Math.min(hero.x + 10, document.body.clientWidth);
			//down
		}
		if (kc === 40) {
			hero.vy = Math.min(hero.y + 10, document.body.clientHeight);
		}
		render();
	});

	function handleVillainMovement() {
		villains.forEach(function(villain) {
			var direction = getRandomInt(0, 3);
			if (direction === 0) {
				villain.vx = -10;
				//up
			} else if (direction === 1) {
				villain.vy = -10;
				//right
			} else if (direction === 2) {
				villain.vx = 10
				//down
			} else if (direction === 3) {
				villain.vy = 10;
			}
		});
		render();
	}

	stream.subscribe(handleVillainMovement);

	function render() {
		actors.forEach(function(actor) {
			actor.domElement.style.left = (actor.x + actor.vx) + "px";
			actor.domElement.style.top = (actor.y + actor.yx) + "px";
		});
	}

	render();

	//Util
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function always(value) {
		return function() {
			return value;
		};
	}
})();