// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract UpgradableMock is
    Initializable,
    ERC721Upgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    // initializer modifier which ensure that this function is only called once
    function initialize() public initializer {
        // instead of using the Ownable, ERC721() constructor, we have to manually initialize them
        __ERC721_init("Test Token", "TEST");
        __Ownable_init();
        _mint(msg.sender, 5);
    }

    // this function has to be overwritten as it gives the ability to add authorization on who can actually upgrade the given contract
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
