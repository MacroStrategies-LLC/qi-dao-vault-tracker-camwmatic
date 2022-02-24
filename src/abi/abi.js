/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
/**
 * @module abi
 */
import {ethers} from 'ethers';

const abi = {
  formatABI: (json) => {
    const FormatTypes = ethers.utils.FormatTypes;
    const iface = new ethers.utils.Interface(json);
    return iface.format(FormatTypes.full);
  },
  mai: [
    'function setTokenPeg(uint256 _tokenPeg)',
    'function stabilityPool() view returns (address)',
    'function name() view returns (string)',
    'function changeEthPriceSource(address ethPriceSourceAddress)',
    'function borrowToken(uint256 vaultID, uint256 amount)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function totalSupply() view returns (uint256)',
    'function closingFee() view returns (uint256)',
    'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
    'function decimals() view returns (uint8)',
    'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
    'function vaultOwner(uint256) view returns (address)',
    'function setClosingFee(uint256 amount)',
    'function transferVault(uint256 vaultID, address to)',
    'function mint(address account, uint256 amount)',
    'function ethPriceSource() view returns (address)',
    'function createVault() returns (uint256)',
    'function treasury() view returns (uint256)',
    'function balanceOf(address account) view returns (uint256)',
    'function setTreasury(uint256 _treasury)',
    'function renounceOwnership()',
    'function openingFee() view returns (uint256)',
    'function withdrawCollateral(uint256 vaultID, uint256 amount)',
    'function payBackToken(uint256 vaultID, uint256 amount)',
    'function destroyVault(uint256 vaultID)',
    'function setOpeningFee(uint256 amount)',
    'function owner() view returns (address)',
    'function isOwner() view returns (bool)',
    'function getDebtCeiling() view returns (uint256)',
    'function symbol() view returns (string)',
    'function getEthPriceSource() view returns (uint256)',
    'function setStabilityPool(address _pool)',
    'function burn(address account, uint256 amount)',
    'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
    'function vaultExistence(uint256) view returns (bool)',
    'function getClosingFee() view returns (uint256)',
    'function vaultCount() view returns (uint256)',
    'function transfer(address recipient, uint256 amount) returns (bool)',
    'function getOpeningFee() view returns (uint256)',
    'function setDebtCeiling(uint256 amount)',
    'function depositCollateral(uint256 vaultID) payable',
    'function erc721() view returns (address)',
    'function getTokenPriceSource() view returns (uint256)',
    'function tokenPeg() view returns (uint256)',
    'function buyRiskyVault(uint256 vaultID)',
    'function vaultDebt(uint256) view returns (uint256)',
    'function vaultCollateral(uint256) view returns (uint256)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function debtCeiling() view returns (uint256)',
    'function transferOwnership(address newOwner)',
    'constructor(address ethPriceSourceAddress, uint256 minimumCollateralPercentage, string name, string symbol, address vaultAddress)',
    'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
    'event CreateVault(uint256 vaultID, address creator)',
    'event DestroyVault(uint256 vaultID)',
    'event TransferVault(uint256 vaultID, address from, address to)',
    'event DepositCollateral(uint256 vaultID, uint256 amount)',
    'event WithdrawCollateral(uint256 vaultID, uint256 amount)',
    'event BorrowToken(uint256 vaultID, uint256 amount)',
    'event PayBackToken(uint256 vaultID, uint256 amount, uint256 closingFee)',
    'event BuyRiskyVault(uint256 vaultID, address owner, address buyer, uint256 amountPaid)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
  ],
  usdc: [
    'constructor(address _proxyTo)',
    'event ProxyOwnerUpdate(address _new, address _old)',
    'event ProxyUpdated(address indexed _new, address indexed _old)',
    'function IMPLEMENTATION_SLOT() view returns (bytes32)',
    'function OWNER_SLOT() view returns (bytes32)',
    'function implementation() view returns (address)',
    'function proxyOwner() view returns (address)',
    'function proxyType() pure returns (uint256 proxyTypeId)',
    'function transferProxyOwnership(address newOwner)',
    'function updateAndCall(address _newProxyTo, bytes data) payable',
    'function updateImplementation(address _newProxyTo)',
  ],
  qi: [
    'constructor()',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function balanceOf(address account) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
    'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function transfer(address recipient, uint256 amount) returns (bool)',
    'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  ],
  vaults: {
    camwmatic: [
      'constructor(address ethPriceSourceAddress, uint256 minimumCollateralPercentage, string name, string symbol, address _mai, address _collateral, address meta, string baseURI)',
      'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
      'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
      'event BorrowToken(uint256 vaultID, uint256 amount)',
      'event CreateVault(uint256 vaultID, address creator)',
      'event DepositCollateral(uint256 vaultID, uint256 amount)',
      'event DestroyVault(uint256 vaultID)',
      'event LiquidateVault(uint256 vaultID, address owner, address buyer, uint256 debtRepaid, uint256 collateralLiquidated, uint256 closingFee)',
      'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
      'event PayBackToken(uint256 vaultID, uint256 amount, uint256 closingFee)',
      'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
      'event WithdrawCollateral(uint256 vaultID, uint256 amount)',
      'function _meta() view returns (address)',
      'function _minimumCollateralPercentage() view returns (uint256)',
      'function approve(address to, uint256 tokenId)',
      'function balanceOf(address owner) view returns (uint256)',
      'function base() view returns (string)',
      'function baseURI() view returns (string)',
      'function borrowToken(uint256 vaultID, uint256 amount)',
      'function changeEthPriceSource(address ethPriceSourceAddress)',
      'function checkCollateralPercentage(uint256 vaultID) view returns (uint256)',
      'function checkCost(uint256 vaultID) view returns (uint256)',
      'function checkExtract(uint256 vaultID) view returns (uint256)',
      'function checkLiquidation(uint256 vaultID) view returns (bool)',
      'function closingFee() view returns (uint256)',
      'function collateral() view returns (address)',
      'function createVault() returns (uint256)',
      'function debtRatio() view returns (uint256)',
      'function depositCollateral(uint256 vaultID, uint256 amount)',
      'function destroyVault(uint256 vaultID)',
      'function ethPriceSource() view returns (address)',
      'function exists(uint256 vaultID) view returns (bool)',
      'function gainRatio() view returns (uint256)',
      'function getApproved(uint256 tokenId) view returns (address)',
      'function getClosingFee() view returns (uint256)',
      'function getDebtCeiling() view returns (uint256)',
      'function getEthPriceSource() view returns (uint256)',
      'function getOpeningFee() view returns (uint256)',
      'function getPaid()',
      'function getTokenPriceSource() view returns (uint256)',
      'function isApprovedForAll(address owner, address operator) view returns (bool)',
      'function isOwner() view returns (bool)',
      'function liquidateVault(uint256 vaultID)',
      'function mai() view returns (address)',
      'function maticDebt(address) view returns (uint256)',
      'function name() view returns (string)',
      'function openingFee() view returns (uint256)',
      'function owner() view returns (address)',
      'function ownerOf(uint256 tokenId) view returns (address)',
      'function payBackToken(uint256 vaultID, uint256 amount)',
      'function renounceOwnership()',
      'function safeTransferFrom(address from, address to, uint256 tokenId)',
      'function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)',
      'function setApprovalForAll(address to, bool approved)',
      'function setBaseURI(string baseURI)',
      'function setClosingFee(uint256 amount)',
      'function setDebtRatio(uint256 _debtRatio)',
      'function setGainRatio(uint256 _gainRatio)',
      'function setMinCollateralRatio(uint256 minimumCollateralPercentage)',
      'function setOpeningFee(uint256 amount)',
      'function setStabilityPool(address _pool)',
      'function setTokenPeg(uint256 _tokenPeg)',
      'function setTreasury(uint256 _treasury)',
      'function stabilityPool() view returns (address)',
      'function supportsInterface(bytes4 interfaceId) view returns (bool)',
      'function symbol() view returns (string)',
      'function tokenByIndex(uint256 index) view returns (uint256)',
      'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
      'function tokenPeg() view returns (uint256)',
      'function tokenURI(uint256 tokenId) view returns (string)',
      'function totalSupply() view returns (uint256)',
      'function transferFrom(address from, address to, uint256 tokenId)',
      'function transferOwnership(address newOwner)',
      'function transferToken(uint256 amountToken)',
      'function transferToken(address to, address token, uint256 amountToken)',
      'function treasury() view returns (uint256)',
      'function vaultCollateral(uint256) view returns (uint256)',
      'function vaultCount() view returns (uint256)',
      'function vaultDebt(uint256) view returns (uint256)',
      'function withdrawCollateral(uint256 vaultID, uint256 amount)',
    ],
  },
  tokens: {
    camwmatic: [
      'constructor()',
      'event Approval(address indexed owner, address indexed spender, uint256 value)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'function AaveContract() view returns (address)',
      'function LENDING_POOL() view returns (address)',
      'function Token() view returns (address)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'function approve(address spender, uint256 amount) returns (bool)',
      'function balanceOf(address account) view returns (uint256)',
      'function claimAaveRewards()',
      'function decimals() view returns (uint8)',
      'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
      'function depositFeeBP() view returns (uint16)',
      'function enter(uint256 _amount)',
      'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
      'function leave(uint256 _share)',
      'function name() view returns (string)',
      'function operator() view returns (address)',
      'function symbol() view returns (string)',
      'function totalSupply() view returns (uint256)',
      'function transfer(address recipient, uint256 amount) returns (bool)',
      'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
      'function treasury() view returns (address)',
      'function updateDepositFee(uint16 _depositFee)',
      'function updateOperator(address _operator)',
      'function updateTreasury(address _treasury)',
      'function wMatic() view returns (address)',
    ],
  },
  factory: {
    quickswap: [
      'constructor(address _feeToSetter)',
      'event PairCreated(address indexed token0, address indexed token1, address pair, uint256)',
      'function allPairs(uint256) view returns (address)',
      'function allPairsLength() view returns (uint256)',
      'function createPair(address tokenA, address tokenB) returns (address pair)',
      'function feeTo() view returns (address)',
      'function feeToSetter() view returns (address)',
      'function getPair(address, address) view returns (address)',
      'function setFeeTo(address _feeTo)',
      'function setFeeToSetter(address _feeToSetter)',
    ],
  },
  router: {
    quickswap: [
      'function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) returns (uint256[] amounts)',
      'function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[] amounts)',
      'function factory() view returns (address)',
    ],
  },
  pairs: {
    usdcmai: [
      'constructor()',
      'event Approval(address indexed owner, address indexed spender, uint256 value)',
      'event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to)',
      'event Mint(address indexed sender, uint256 amount0, uint256 amount1)',
      'event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)',
      'event Sync(uint112 reserve0, uint112 reserve1)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'function DOMAIN_SEPARATOR() view returns (bytes32)',
      'function MINIMUM_LIQUIDITY() view returns (uint256)',
      'function PERMIT_TYPEHASH() view returns (bytes32)',
      'function allowance(address, address) view returns (uint256)',
      'function approve(address spender, uint256 value) returns (bool)',
      'function balanceOf(address) view returns (uint256)',
      'function burn(address to) returns (uint256 amount0, uint256 amount1)',
      'function decimals() view returns (uint8)',
      'function factory() view returns (address)',
      'function getReserves() view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)',
      'function initialize(address _token0, address _token1)',
      'function kLast() view returns (uint256)',
      'function mint(address to) returns (uint256 liquidity)',
      'function name() view returns (string)',
      'function nonces(address) view returns (uint256)',
      'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
      'function price0CumulativeLast() view returns (uint256)',
      'function price1CumulativeLast() view returns (uint256)',
      'function skim(address to)',
      'function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes data)',
      'function symbol() view returns (string)',
      'function sync()',
      'function token0() view returns (address)',
      'function token1() view returns (address)',
      'function totalSupply() view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
      'function transferFrom(address from, address to, uint256 value) returns (bool)',
    ],
  },
};

export default abi;
