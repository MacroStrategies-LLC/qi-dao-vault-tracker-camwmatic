import wallet from '#src/wallet/wallet.js';
describe('src/wallet', function() {
  describe('wallet', function() {
    it('wallet should be a signer', async function() {
      expect(wallet._isSigner).to.be.true;
    });
  });
});

