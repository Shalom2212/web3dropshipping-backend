import { Injectable, Res } from '@nestjs/common';
import { CreateDeployInBlockchainDto } from './dto/create-deploy-in-blockchain.dto';
import { UpdateDeployInBlockchainDto } from './dto/update-deploy-in-blockchain.dto';
import * as solc from 'solc';
import { ethers } from 'ethers';
import { contractCode } from './contracts/smartContract';

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
  const provider = new ethers.JsonRpcProvider('http://localhost:7545');

  const signer = new ethers.Wallet(
    '0x7fc9aaaafd13a98fe890e43b4437c01277f0378f539f1b117e227d41934e7617',
    provider,
  );

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
