const chai = require('chai');
const assert = chai.assert;

import { fetchBlockData } from '../src/utils';

describe('#fetchBlockData', function() {
    it('should get 15 most latest block', async function() {
        const length = 15;
        const data = await fetchBlockData(length);
        assert.equal(length, data.length);
    })
});
