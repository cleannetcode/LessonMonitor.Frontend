
class Animal {
	constructor(name) {
		if (!name || name.length == 0) {
			throw new Error('name cannot be null or empty!');
		}

		this.#name = name;
	}

	#name = '';

	get name() {
		console.log('get name');
		return this.#name;
	};
	set name(value) {
		console.log('set name');
		this.#name = value;
	};

	print() {
		throw new Error('not implemented');
	}
}

class Dog extends Animal {
	constructor(name, favoriteFood = []) {
		super(name);
		if (!favoriteFood || !Array.isArray(favoriteFood)) {
			throw new Error('favoriteFood cannot be null!');
		}

		this.#favoriteFood = favoriteFood;
	}

	#favoriteFood = [];

	get name() {
		console.log('(Dog): get name');
		return super.name;
	};
	set name(value) {
		console.log('(Dog): set name');
		super.name = value;
	};

	print() {
		console.log(`(Dog): I am ${this.name}`);
		console.log(this.#favoriteFood);
	}
}

class Cat extends Animal {
	get name() {
		console.log('(Cat): get name');
		return super.name;
	};
	set name(value) {
		console.log('(Cat): set name');
		super.name = value;
	};

	print() {
		console.log(`(Cat): I am ${this.name}`);
	}
}


class Scene {
	constructor(animals) {
		const errorMessage = 'animals should be an array of type Animal';
		if (!animals || !Array.isArray(animals)) {
			throw new Error(errorMessage);
		}

		for (const animal of animals) {
			if (animal instanceof Animal == false) {
				throw new Error(errorMessage);
			}
		}

		this.animals = animals;
	}

	animals = [];

	printAnimals() {
		for (const animal of this.animals) {
			console.log(`(Cat): I am ${animal.name}`);
		}

		this._myStrangeProperty = 'AAAAAAAAAAAAAAAAAAAAAAAAA!';
	}
}
