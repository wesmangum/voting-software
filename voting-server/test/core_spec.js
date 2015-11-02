import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {

		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 Days Later');
			const nextState = setEntries(state, entries);

			expect(nextState.get('entries').size).to.eq(2);
		});

		it('converts to immutable', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);

			expect(nextState.get('entries').size).to.eq(2);
		});

	});

	describe('next', () => {

		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			});
			const nextState = next(state);
			expect(nextState.get('vote').get('pair').size).to.equal(2);
			expect(nextState.get('entries').size).to.equal(1);
		});

		it('puts winner of current vote back to entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			});
			const nextState = next(state);
			expect(nextState.getIn(['vote', 'pair']).size).to.equal(2);
			expect(nextState.get('entries').size).to.equal(2);
		});

		it('puts both from tied vote back to entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
						'28 Days Later': 3
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			});
			const nextState = next(state);
			expect(nextState.getIn(['vote', 'pair']).size).to.equal(2);
			expect(nextState.get('entries').size).to.equal(3);
		});

		it('marks the winner when just one entry left', () => {
			const state =  Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			});
			const nextState = next(state);
			expect(nextState.get('winner')).to.equal('Trainspotting');
		});

	});

	describe('vote', () => {

		it('creates a tally for the voted entry', () => {
			const state = Map({
				pair: List.of('Trainspotting', '28 Days Later')
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState.getIn(['tally', 'Trainspotting'])).to.equal(1);
		});

		it('adds to existing tally for the voted entry', () => {
			const state = Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 3,
					'28 Days Later': 2
				})
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState.getIn(['tally', 'Trainspotting'])).to.equal(4);
		});

	});

});