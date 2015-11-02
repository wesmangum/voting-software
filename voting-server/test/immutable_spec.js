import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

	describe('A List', () => {

		function addMovie (currentState, movie) {
			return currentState.push(movie);
		}

		it( 'is immutable', () => {
			let state = List.of('Trainspotting', '28 Days Later');
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState.size).to.equal(3);
			expect(state.size).to.equal(2);
		});

	});

	describe('a tree', () => {

		function addMovie (currentState, movie) {
			return currentState.update('movies', movies => movies.push(movie));
		}

		it('is immutable', () => {
			let state = Map({
				movies: List.of('Trainspotting', '28 Days Later')
			});
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState.get('movies').size).to.equal(3);
			expect(state.get('movies').size).to.equal(2);
		});

	});

});