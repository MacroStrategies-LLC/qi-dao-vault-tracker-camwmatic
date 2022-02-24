import addresses from '#src/addresses/addresses.js';
describe('src/addresses', function() {
  describe('addresses', function() {
    describe('vaults', function() {
      it('camwmatic', async function() {
        expect(addresses.vaults.camwmatic)
            .to.eql('0x88d84a85A87ED12B8f098e8953B322fF789fCD1a');
      });
    });
  });
});

