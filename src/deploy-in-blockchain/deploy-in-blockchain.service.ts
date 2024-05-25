import { Injectable, Res } from '@nestjs/common';
import { CreateDeployInBlockchainDto } from './dto/create-deploy-in-blockchain.dto';
import { UpdateDeployInBlockchainDto } from './dto/update-deploy-in-blockchain.dto';
import * as solc from 'solc';
import { ethers } from 'ethers';
import { contractCode } from './contracts/smartContract';

// const rpcURL = 'https://1rpc.io/sepolia';
// const mywalletPrivateKey =
//   'df47db66519996bdf4eb9efbda1fe71ce914b05836e25216a4824e6459892215';
// console.log('rpcURl: ' + rpcURL);
// console.log('Walletprivatekey: ' + mywalletPrivateKey);
// console.log(process.env.DATABASE_URL);
const rpcURL = 'http://127.0.0.1:7545';
const mywalletPrivateKey =
  '0xc391e67f17f3342d5875d35cb8d93f30737054994fa013caf28d66721e1a3536';

function compileContract() {
  const input = {
    language: 'Solidity',
    sources: {
      'MainContract.sol': {
        content: contractCode,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  return output.contracts['MainContract.sol']['MainContract'];
}

async function deployContract(
  abi: string,
  bytecode: string,
  vendor: string,
  supplier: string,
  vendorSharePercentage: number,
  supplierSharePercentage: number,
  productPrice: number,
  productName: string,
  numberOfProduct: number,
  contractDays: number,
) {
  const provider = new ethers.JsonRpcProvider(rpcURL);

  const signer = new ethers.Wallet(mywalletPrivateKey, provider);

  const factory = new ethers.ContractFactory(abi, bytecode, signer);

  const contract = factory.deploy(
    vendor,
    supplier,
    vendorSharePercentage,
    supplierSharePercentage,
    productPrice,
    productName,
    numberOfProduct,
    contractDays,
  );

  return (await contract).getAddress();
}

@Injectable()
export class DeployInBlockchainService {
  async create(createDeployInBlockchainDto: CreateDeployInBlockchainDto) {
    const output = compileContract();
    const address = await deployContract(
      output.abi,
      output.evm.bytecode,
      createDeployInBlockchainDto.vendor,
      createDeployInBlockchainDto.supplier,
      createDeployInBlockchainDto.vendorsharepercentage,
      createDeployInBlockchainDto.suppliersharepercentage,
      createDeployInBlockchainDto.productprice,
      createDeployInBlockchainDto.productname,
      createDeployInBlockchainDto.numberofproducts,
      createDeployInBlockchainDto.contractdays,
    );

    return { address: address, abi: output.abi };
  }

  findAll() {
    // const output = compileContract();
    // const res = deployContract(output.abi, output.evm.bytecode);
    // // console.log(output.evm.bytecode);
    // //console.log(output);
    // return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} deployInBlockchain`;
  }

  update(id: number, updateDeployInBlockchainDto: UpdateDeployInBlockchainDto) {
    return `This action updates a #${id} deployInBlockchain`;
  }

  remove(id: number) {
    return `This action removes a #${id} deployInBlockchain`;
  }
}
