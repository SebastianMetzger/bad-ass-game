(function() {
	var VILLAIN_VELOCITY = 1;
	var HERO_VELOCITY = 2;

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
	var stream = Rx.Observable.interval(33);

	//handle keyboard input
	var keyDowns = Rx.Observable.fromEvent(document, 'keydown');
	var keyUps = Rx.Observable.fromEvent(document, 'keyup');

	keyDowns.select(function(x) {
		return x.keyCode;
	}).subscribe(function(kc) {
		console.log(kc);
		//left
		if (kc === 37) {
			hero.vx = Math.max(hero.vx - HERO_VELOCITY, -20);
			//up
		}
		if (kc === 38) {
			hero.vy = Math.max(hero.vy - HERO_VELOCITY, -20);
			//right
		}
		if (kc === 39) {
			hero.vx = Math.min(hero.vx + HERO_VELOCITY, 20);
			//down
		}
		if (kc === 40) {
			hero.vy = Math.min(hero.vy + HERO_VELOCITY, 20);
		}
	});

	stream.subscribe(function(){
		render();
	});

	function handleVillainMovement() {
		villains.forEach(function(villain) {
			var direction = getRandomInt(0, 3);
			if (direction === 0) {
				villain.vx = -VILLAIN_VELOCITY;
				//up
			} else if (direction === 1) {
				villain.vy = -VILLAIN_VELOCITY;
				//right
			} else if (direction === 2) {
				villain.vx = VILLAIN_VELOCITY
				//down
			} else if (direction === 3) {
				villain.vy = VILLAIN_VELOCITY;
			}
		});
		render();
	}

	stream.subscribe(handleVillainMovement);

	function render() {
		actors.forEach(function(actor) {
			actor.x = Math.min(Math.max(actor.x + actor.vx, 0), document.body.clientWidth - 40);
			actor.y = Math.min(Math.max(actor.y + actor.vy, 0), document.body.clientHeight - 40);

			actor.domElement.style.left = (actor.x) + "px";
			actor.domElement.style.top = (actor.y) + "px";
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