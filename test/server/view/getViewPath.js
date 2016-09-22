import {assert} from 'chai';

import getViewPath from '../../../src/server/view/getViewPath'

describe('getViewPath', () => {
    it('should return path to specified view', () => {
        var appMock = {get:function(name) {
            switch(name){
                case 'views':
                    return 'views/'
                case 'view engine':
                    return 'html';
            }
        }};

        var path = getViewPath(appMock, 'test');

        assert.equal(path, 'views/test.html');
    }); 
});
