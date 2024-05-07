import { Injectable } from '@nestjs/common';
import { CreateDeployPackageTrackerDto } from './dto/create-deploy-package-tracker.dto';
import { UpdateDeployPackageTrackerDto } from './dto/update-deploy-package-tracker.dto';
import * as solc from 'solc';
import { ethers } from 'ethers';
import { contractCode } from './contracts/smartContract';

const rpcURL = 'https://1rpc.io/sepolia';
const mywalletPrivateKey =
  'df47db66519996bdf4eb9efbda1fe71ce914b05836e25216a4824e6459892215';

function compileContract() {
  const input = {
    language: 'Solidity',
    sources: {
      'PlaceStorage.sol': {
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
  return output.contracts['PlaceStorage.sol']['PlaceStorage'];
}

async function deployContract(
  abi: string,
  bytecode: string,
  contractAddress: string,
  productName: string,
) {
  const provider = new ethers.JsonRpcProvider(rpcURL);

  const signer = new ethers.Wallet(mywalletPrivateKey, provider);

  const factory = new ethers.ContractFactory(abi, bytecode, signer);

  const contract = factory.deploy(contractAddress, productName);

  return (await contract).getAddress();
}

@Injectable()
export class DeployPackageTrackerService {
  async create(createDeployPackageTrackerDto: CreateDeployPackageTrackerDto) {
    const output = compileContract();
    const address = await deployContract(
      output.abi,
      output.evm.bytecode,
      createDeployPackageTrackerDto.contractAddress,
      createDeployPackageTrackerDto.productName,
    );

    return { address: address };
  }

  findAll() {
    return `This action returns all deployPackageTracker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deployPackageTracker`;
  }

  update(
    id: number,
    updateDeployPackageTrackerDto: UpdateDeployPackageTrackerDto,
  ) {
    return `This action updates a #${id} deployPackageTracker`;
  }

  remove(id: number) {
    return `This action removes a #${id} deployPackageTracker`;
  }
}
