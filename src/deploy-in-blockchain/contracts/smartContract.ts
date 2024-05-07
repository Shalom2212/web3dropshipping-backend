export const contractCode = `
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract MainContract {
    address public user1;
    address public user2;
    uint256 public user1Percentage;
    uint256 public user2Percentage;
    uint256 public productPrice;
    string public productName;
    uint256 public numberOfProducts;
    address private owner;
    uint256 public ownershipTransferTime;

    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor(
        address _user1,
        address _user2,
        uint256 _user1Percentage,
        uint256 _user2Percentage,
        uint256 _productPrice,
        string memory _productName,
        uint256 _numberOfProducts,
        uint256 _transferDays
    ) {
        require(_user1 != address(0) && _user2 != address(0), "Invalid address");
        require(_user1Percentage + _user2Percentage == 100, "Percentages should add up to 100");
        require(_productPrice > 0, "Product price must be greater than 0");
        require(_numberOfProducts > 0, "Number of products should be greater than 0");

        user1 = _user1;
        user2 = _user2;
        user1Percentage = _user1Percentage;
        user2Percentage = _user2Percentage;
        productPrice = _productPrice;
        productName = _productName;
        numberOfProducts = _numberOfProducts;
        owner = _user1;
        emit OwnerSet(address(0), owner);
        ownershipTransferTime = block.timestamp + (_transferDays * 1 minutes);
    }

    function sendAndSplitEther() public payable {
        require(numberOfProducts > 0, "Product is out of stock");
        require(msg.value >= productPrice, "Insufficient ether sent");

        if (block.timestamp >= ownershipTransferTime) {
            changeOwner(user2);
        }

        uint256 amountToUser1 = (msg.value * user1Percentage) / 100;
        uint256 amountToUser2 = (msg.value * user2Percentage) / 100;

        payable(user1).transfer(amountToUser1);
        emit Transfer(address(this), user1, amountToUser1);

        payable(user2).transfer(amountToUser2);
        emit Transfer(address(this), user2, amountToUser2);

        numberOfProducts--;
    }

    function changeOwner(address newOwner) private {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getNumberofProduct() external view returns (uint256){
        return numberOfProducts;
    }
}
`;
