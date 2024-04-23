import { Injectable } from '@nestjs/common';
import { CreateDeployInBlockchainDto } from './dto/create-deploy-in-blockchain.dto';
import { UpdateDeployInBlockchainDto } from './dto/update-deploy-in-blockchain.dto';
import * as solc from 'solc';
import { ethers } from 'ethers';

function compileContract() {
  const contractCode = `
  // SPDX-License-Identifier: GPL-3.0

  //deployed address 0xfA7b8b5d23eC137f6520A467a7ADF0100DA580b0
  
  pragma solidity ^0.8.0;
  
  
  contract MainContract {
      address public user1;
      address public user2;
      uint256 public user1Percentage;
      uint256 public user2Percentage;
      uint256 public productPrice;
      string public prdouctName;
      uint256 public numberOfProduct;
      address private owner;
      uint private ownershipTransferTime;
  
      event OwnerSet(address indexed oldOwner, address indexed newOwner);
  
      event Transfer(address indexed _from, address indexed _to, uint256 _amount);
  
      modifier isOwner() {
          require(msg.sender == owner, "Caller is not owner");
          _;
      }
  
  
      constructor(address _user1, address _user2, uint256 _user1Percentage, uint256 _user2Percentage,uint256 _productPrice,string memory _productName,uint256 _numberOfProduct,uint256 _transferDays){
          require(_user1 != address(0) && _user2 != address(0), "Invalid address");
          require(_user1Percentage + _user2Percentage == 100, "Percentages should add up to 100");
          require(_productPrice > 0,"Product price must be greater than 0");
          require(_numberOfProduct > 0,"Number of product should be greater than 0");
          
          user1 = _user1;
          user2 = _user2;
          user1Percentage = _user1Percentage;
          user2Percentage = _user2Percentage;
          productPrice = _productPrice;
          prdouctName = _productName;
          numberOfProduct = _numberOfProduct;
          owner = _user1;
          emit OwnerSet(address(0), owner);
          ownershipTransferTime = block.timestamp +(_transferDays * 1 minutes);
      }
  
      function sendAndSplitEther() public payable {
          require(numberOfProduct > 0,"Product is outofstock");
          uint256 amount = address(this).balance;
          require(amount > 0, "Invalid amount");
  
          if(block.timestamp >= ownershipTransferTime){
              changeOwner(user2);
          }
  
          uint256 amountToUser1 = (amount * user1Percentage) / 100;
          uint256 amountToUser2 = (amount * user2Percentage) / 100;
  
          payable(user1).transfer(amountToUser1);
          emit Transfer(address(this), user1, amountToUser1);
  
          payable(user2).transfer(amountToUser2);
          emit Transfer(address(this), user2, amountToUser2);
  
          numberOfProduct--;
      }
  
      function changeOwner(address newOwner) private {
          emit OwnerSet(owner, newOwner);
          owner = newOwner;
      }
  
      function getOwner() external view returns (address) {
          return owner;
      }
  }
`;

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
    return { address: await address, abi: output.abi };
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
