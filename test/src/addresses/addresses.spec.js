import addresses from '#src/addresses/addresses.js';
describe('src/addresses', function() {
  describe('addresses', function() {
    it('mai address', async function() {
      expect(addresses.mai)
          .to.eql('0xa3fa99a148fa48d14ed51d610c367c61876997f1');
    });
    it('qi address', async function() {
      expect(addresses.qi)
          .to.eql('0x580A84C73811E1839F75d86d75d88cCa0c241fF4');
    });
    describe('vaults', function() {
      it('camwmatic', async function() {
        expect(addresses.vaults.camwmatic)
            .to.eql('0x88d84a85A87ED12B8f098e8953B322fF789fCD1a');
      });
    });
    describe('tokens', function() {
      it('camwmatic', async function() {
        expect(addresses.tokens.camwmatic)
            .to.eql('0x7068Ea5255cb05931EFa8026Bd04b18F3DeB8b0B');
      });
    });
  });
});

