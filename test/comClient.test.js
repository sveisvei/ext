/* jshint expr: true */
var comClient   = require('../lib/comClient.js');

describe('comClient', function () {
    var id = 'pos_id', win = window.top, origin = 'http://www.someorigin.com';
    var xde;

    beforeEach(function() {
        xde = { sendTo : sinon.spy() };
        comClient._setXde(xde);
    });

    it('should throw if comClient is called with wrong parameters', function () {
        expect(comClient).to.throw();
        expect(function () {
            comClient(id, 'http://www.someOrigin.com', win);
        }).to.throw();
    });

    it('should return a handler if called with proper parameters', function() {
        var com = comClient(id, win, origin);
        expect(com).to.exist;
    });

    describe('rendered', function () {
        it('should call xde.sendTo once', function() {
            var com = comClient(id, win, origin);
            com.rendered();
            expect(xde.sendTo).to.have.been.calledOnce;
        });

        it('should call xde.sendTo with window, origin and ‘rendered’ as arguments', function() {
            var com = comClient(id, win, origin);
            com.rendered();
            expect(xde.sendTo).to.have.been.calledWith(win, 'rendered', {id: id});
            expect(xde.targetOrigin).to.equal(origin);
        });

        it('should call xde.sendTo with the opts object', function() {
            var com = comClient(id, win, origin);
            com.rendered({width: 20, height: 10});
            expect(xde.sendTo).to.have.been.calledWith(win, 'rendered', {id: id, width: 20, height: 10});
        });
    });
});
