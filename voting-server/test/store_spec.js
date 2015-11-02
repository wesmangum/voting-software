import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';
describe('store', () => {

	it('is a Redux store congfigured with the correct reducer', () => {
		const store = makeStore();
		expect(store.getState()).to.equal(Map());

		store.dispatch({
			type: 'SET_ENTRIES',
			entries: ['Trainspotting', '28 Days Later']
		});
		expect(store.getState().get('entries').size).to.equal(2);
	});

});