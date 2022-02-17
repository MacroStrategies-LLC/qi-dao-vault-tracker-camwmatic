import providers from '#src/providers/providers.js';
describe('src/providers', function() {
  describe('providers', function() {
    it('infura should be a provider', async function() {
      expect(providers.infura._isProvider).to.be.true;
    });
    it('alchemy should be a provider', async function() {
      expect(providers.alchemy._isProvider).to.be.true;
    });
  });
});

