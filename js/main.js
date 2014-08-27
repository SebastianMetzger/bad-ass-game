(function(){
	var actors = [];

	var hero = {
		domElement: document.querySelector('#hero'),
		x: 40,
		y: 40
	};
	actors.push(hero);

	function generateVillain(){
		var element = document.createElement('div');
		element.className = 'villain';
		element.innerText = '>:(';
		document.body.appendChild(element);
		return {
			domElement: element,
			x: getRandomInt(0, 800),
			y: getRandomInt(0, 600)
		};
	}

	var villains = [];
	for(var i = 0; i < 10; i++){
		var villain = generateVillain();
		actors.push(villain);
		villains.push(villain);
	}

	//main game loop
	var stream = Rx.Observable.interval(100);

	//handle keyboard input
	var input = Rx.Observable.fromEvent(document, 'keydown');

	input.subscribe(function(x){
		var kc = x.keyCode;
		//left
		if(kc === 37){
			hero.x = Math.max(hero.x - 10,0);
		//up
		} 
		if(kc === 38){
			hero.y = Math.max(hero.y - 10,0);
		//right
		} 
		if(kc === 39){
			hero.x = Math.min(hero.x + 10,document.body.clientWidth);
		//down
		} 
		if(kc === 40){
			hero.y = Math.min(hero.y + 10,document.body.clientHeight);
		}
		render();
	});

	function handleVillainMovement(){
		villains.forEach(function(villain){
			var direction = getRandomInt(0,3);
			if(direction === 0){
			villain.x = Math.max(villain.x - 10,0);
			//up
			} else if(direction === 1){
				villain.y = Math.max(villain.y - 10,0);
			//right
			} else if(direction === 2){
				villain.x = Math.min(villain.x + 10,document.body.clientWidth);
			//down
			} else if(direction === 3){
				villain.y = Math.min(villain.y + 10,document.body.clientHeight);
			}
		});
		render();
	}

	stream.subscribe(handleVillainMovement);

	function render(){
		actors.forEach(function(actor){
			actor.domElement.style.left = actor.x + "px";
			actor.domElement.style.top = actor.y + "px";
		});
	}

	render();

	//Util
	function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
})();