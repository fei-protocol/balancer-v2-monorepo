import 'dotenv/config';
import '@tenderly/hardhat-tenderly';
import 'hardhat-deploy';
import 'hardhat-local-networks-config-plugin';
import '@nomiclabs/hardhat-ethers';

import { hardhatBaseConfig } from '@balancer-labs/v2-common';
import { name } from './package.json';

const CHAIN_IDS = {
  hardhat: 31337,
  kovan: 42,
  goerli: 5,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  dockerParity: 17,
};

const INFURA_KEY = process.env.INFURA_KEY || '';
const DEPLOYER_PRIVATE_KEY =
  process.env.DEPLOYER_PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000000';

const CONTROLLER_PRIVATE_KEY =
  process.env.CONTROLLER_PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000000';

export default {
  networks: {
    hardhat: {
      chainId: CHAIN_IDS.hardhat,
      saveDeployments: true,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      saveDeployments: true,
    },
    mainnet: {
      chainId: CHAIN_IDS.mainnet,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`, `0x${CONTROLLER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    ropsten: {
      chainId: CHAIN_IDS.ropsten,
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`, `0x${CONTROLLER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    kovan: {
      chainId: CHAIN_IDS.kovan,
      url: `https://kovan.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`, `0x${CONTROLLER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    rinkeby: {
      chainId: CHAIN_IDS.rinkeby,
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`, `0x${CONTROLLER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    goerli: {
      chainId: CHAIN_IDS.goerli,
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`, `0x${CONTROLLER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      [CHAIN_IDS.mainnet]: 0,
      [CHAIN_IDS.kovan]: 0,
      [CHAIN_IDS.ropsten]: 0,
      [CHAIN_IDS.goerli]: 0,
      [CHAIN_IDS.rinkeby]: 0,
      [CHAIN_IDS.dockerParity]: 0,
    },
    admin: {
      default: 1, // here this will by default take the first account as deployer
      // We use explicit chain IDs so that export-all works correctly: https://github.com/wighawag/hardhat-deploy#options-2
      [CHAIN_IDS.mainnet]: '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f',
      [CHAIN_IDS.kovan]: 1,
      [CHAIN_IDS.ropsten]: 1,
      [CHAIN_IDS.goerli]: 1,
      [CHAIN_IDS.rinkeby]: '0x44DDF1D6292F36B25230a72aBdc7159D37d317Cf',
      [CHAIN_IDS.dockerParity]: 1,
    },
  },
  solidity: {
    compilers: hardhatBaseConfig.compilers,
    overrides: { ...hardhatBaseConfig.overrides(name) },
  },
  tenderly: {
    username: 'balancer',
    project: 'v2',
  },

  // Hardhat deploy config
  paths: {
    deploy: 'migrations',
    deployments: 'output',
  },
  external: {
    contracts: [
      {
        artifacts: '../../node_modules/@balancer-labs/v2-core/artifacts',
      },
    ],
  },
};