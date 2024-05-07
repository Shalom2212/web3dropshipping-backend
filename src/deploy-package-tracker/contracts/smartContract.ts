export const contractCode = `// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PlaceStorage {
    struct Place {
        string name;
        string description;
    }

    mapping(uint256 => Place) public places;
    uint256 public placesCount;
    address private  contractAddress;
    string private  productName;

    event PlaceAdded(uint256 indexed id, string name, string description);

    constructor(address _contractAddress,string memory _productName){
        require(_contractAddress != address(0),"Invalid contract address");
        contractAddress=_contractAddress;
        productName = _productName;
    }

    function addPlace(string memory _name, string memory _description) public {
        places[placesCount] = Place(_name, _description);
        emit PlaceAdded(placesCount, _name, _description);
        placesCount++;
    }

    // function getPlace(uint256 _id) public view returns (string memory, string memory) {
    //     require(_id < placesCount, "Place ID does not exist");
    //     return (places[_id].name, places[_id].description);
    // }

    function getAllPlaces() public view returns (Place[] memory) {
        Place[] memory allPlaces = new Place[](placesCount);
        for (uint256 i = 0; i < placesCount; i++) {
            allPlaces[i] = places[i];
        }
        return allPlaces;
    }

    function getProductContractAddress() public  view returns (address){
        return contractAddress;
    }

    function getProductName() public  view returns (string memory){
        return productName;
    }
}
`;
