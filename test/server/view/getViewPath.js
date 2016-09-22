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

        assert.match(path, /views\/test.html$/);
    }); 
    it('path should always be in views directory', () => {
        var appMock = {get:function(name) {
            switch(name){
                case 'views':
                    return 'views/'
                case 'view engine':
                    return 'html';
            }
        }};

        assert.throws(function() {
            getViewPath(appMock, '../../test')
        }, Error);
    }); 
});
