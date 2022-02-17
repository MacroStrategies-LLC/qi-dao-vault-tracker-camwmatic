import handler from '#src/index.js';

describe('src/index', function() {
  describe('index', function() {
    it('should take two parameters and return a status', async function() {
      const result = await handler('event', 'context');
      const {status, event, context} = JSON.parse(result);
      expect(status).to.equal(200);
      expect(event).to.equal('event');
      expect(context).to.equal('context');
    });
  });
  describe('test-inner', function() {
    it('should pass', async function() {
      expect(1).to.equal(1);
    });
  });
});
