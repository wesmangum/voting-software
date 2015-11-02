import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const initalState = Map();
		const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
		const nextState = reducer(initalState, action);

		expect(nextState.get('entries')).to.include('Trainspotting');
	});

	it('handles NEXT', () => {
		const initalState = fromJS({
			entries: ['Trainspotting', '28 Days Later']
		});
		const action = {type: 'NEXT'};
		const nextState = reducer(initalState, action);

		expect(nextState.getIn(['vote', 'pair']).size).to.equal(2);
	});

	it('handles VOTE', () => {
		const initalState = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later']
			},
			entries: []
		});
		const action = {type: 'VOTE', entry: 'Trainspotting'};
		const nextState = reducer(initalState, action);

		expect(nextState.getIn(['vote', 'pair']).size).to.equal(2);
		expect(nextState.getIn(['vote', 'tally', 'Trainspotting'])).to.equal(1);
		expect(nextState.get('entries').size).to.equal(0);
	});

	it('has an initial state', () => {
		const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
		const nextState = reducer(undefined, action);
		expect(nextState.get('entries')).to.include('Trainspotting');
	});

	it('can be used with reduce', () => {
		const actions = [
			{type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
			{type: 'NEXT'},
			{type: 'VOTE', entry: 'Trainspotting'},
			{type: 'VOTE', entry: '28 Days Later'},
			{type: 'VOTE', entry: 'Trainspotting'},
			{type: 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());

		expect(finalState.get('winner')).to.equal('Trainspotting');
	});

});