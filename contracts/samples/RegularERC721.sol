// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "../../node_modules/@openzeppelin/contracts-3/presets/ERC721PresetMinterPauserAutoId.sol";

/**
 * @author Sangmoon Oh
 */
contract RegularERC721 is ERC721PresetMinterPauserAutoId{

    /**
     * @dev URI for contract-level (a.k.a. storefront-level) metadata
     */
    string private _contractURI;

    constructor(string memory name, string memory symbol) ERC721PresetMinterPauserAutoId(name, symbol, ""){
    }

    function setTokenURI(uint256 tokenId, string memory uri) public {
        _setTokenURI(tokenId, uri);
    }

    /**
     * Query URI for contract-level (a.k.a. storefront-level) metadata.
     * This function is defined ans consumed by OpenSea.
     * For more details, refer https://docs.opensea.io/docs/contract-level-metadata
     *
     * @return URI for contract-level metadata
     */
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    /**
     * Set URI for contract-level metadata
     */
    function setContractURI(string memory uri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "RegularERC721: only default admin can set contract URI.");

        _contractURI = uri;
    }

}