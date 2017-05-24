import web3 from './web3'
import ENSconstructor from 'ethereum-ens'

function namehash(name) {
  return web3().then(({ web3 }) =>{
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
  })
}


const ensContract = web3().then(({ web3 }) => {
  return web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        }
      ],
      "name": "resolver",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        }
      ],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "label",
          "type": "bytes32"
        },
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "setSubnodeOwner",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "ttl",
          "type": "uint64"
        }
      ],
      "name": "setTTL",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        }
      ],
      "name": "ttl",
      "outputs": [
        {
          "name": "",
          "type": "uint64"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "resolver",
          "type": "address"
        }
      ],
      "name": "setResolver",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "node",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "node",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "label",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "NewOwner",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "node",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "resolver",
          "type": "address"
        }
      ],
      "name": "NewResolver",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "node",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "ttl",
          "type": "uint64"
        }
      ],
      "name": "NewTTL",
      "type": "event"
    }
  ]);
})

const ens = ensContract.then(ensContract => ensContract.at('0x112234455c3a32fd11230c42e7bccd4a84e02010'))
//
// var auctionRegistrarContract = web3.eth.contract([
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "releaseDeed",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getAllowedTime",
//     "outputs": [
//       {
//         "name": "timestamp",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "unhashedName",
//         "type": "string"
//       }
//     ],
//     "name": "invalidateName",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "name": "value",
//         "type": "uint256"
//       },
//       {
//         "name": "salt",
//         "type": "bytes32"
//       }
//     ],
//     "name": "shaBid",
//     "outputs": [
//       {
//         "name": "sealedBid",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "bidder",
//         "type": "address"
//       },
//       {
//         "name": "seal",
//         "type": "bytes32"
//       }
//     ],
//     "name": "cancelBid",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "entries",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint8"
//       },
//       {
//         "name": "",
//         "type": "address"
//       },
//       {
//         "name": "",
//         "type": "uint256"
//       },
//       {
//         "name": "",
//         "type": "uint256"
//       },
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       },
//       {
//         "name": "_salt",
//         "type": "bytes32"
//       }
//     ],
//     "name": "unsealBid",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "transferRegistrars",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "",
//         "type": "address"
//       },
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "name": "sealedBids",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "state",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       },
//       {
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       },
//       {
//         "name": "_timestamp",
//         "type": "uint256"
//       }
//     ],
//     "name": "isAllowed",
//     "outputs": [
//       {
//         "name": "allowed",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "finalizeAuction",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "registryStarted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "sealedBid",
//         "type": "bytes32"
//       }
//     ],
//     "name": "newBid",
//     "outputs": [],
//     "payable": true,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "labels",
//         "type": "bytes32[]"
//       }
//     ],
//     "name": "eraseNode",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_hashes",
//         "type": "bytes32[]"
//       }
//     ],
//     "name": "startAuctions",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "name": "deed",
//         "type": "address"
//       },
//       {
//         "name": "registrationDate",
//         "type": "uint256"
//       }
//     ],
//     "name": "acceptRegistrarTransfer",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "startAuction",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "rootNode",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "hashes",
//         "type": "bytes32[]"
//       },
//       {
//         "name": "sealedBid",
//         "type": "bytes32"
//       }
//     ],
//     "name": "startAuctionsAndBid",
//     "outputs": [],
//     "payable": true,
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "name": "_ens",
//         "type": "address"
//       },
//       {
//         "name": "_rootNode",
//         "type": "bytes32"
//       },
//       {
//         "name": "_startDate",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "indexed": false,
//         "name": "registrationDate",
//         "type": "uint256"
//       }
//     ],
//     "name": "AuctionStarted",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "indexed": true,
//         "name": "bidder",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "deposit",
//         "type": "uint256"
//       }
//     ],
//     "name": "NewBid",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "status",
//         "type": "uint8"
//       }
//     ],
//     "name": "BidRevealed",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "registrationDate",
//         "type": "uint256"
//       }
//     ],
//     "name": "HashRegistered",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "HashReleased",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "hash",
//         "type": "bytes32"
//       },
//       {
//         "indexed": true,
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "registrationDate",
//         "type": "uint256"
//       }
//     ],
//     "name": "HashInvalidated",
//     "type": "event"
//   }
// ]);
// var ethRegistrar = auctionRegistrarContract.at(ens.owner(namehash('eth')));
//
// var deedContract = web3.eth.contract([
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "creationDate",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "destroyDeed",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "setOwner",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "registrar",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "value",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "previousOwner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "owner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "newValue",
//         "type": "uint256"
//       },
//       {
//         "name": "throwOnFailure",
//         "type": "bool"
//       }
//     ],
//     "name": "setBalance",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "refundRatio",
//         "type": "uint256"
//       }
//     ],
//     "name": "closeDeed",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "newRegistrar",
//         "type": "address"
//       }
//     ],
//     "name": "setRegistrar",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "payable": true,
//     "type": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "OwnerChanged",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [],
//     "name": "DeedClosed",
//     "type": "event"
//   }
// ]);
//
// var fifsRegistrarContract = web3.eth.contract([
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "name": "expiryTimes",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "subnode",
//         "type": "bytes32"
//       },
//       {
//         "name": "owner",
//         "type": "address"
//       }
//     ],
//     "name": "register",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "rootNode",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "name": "ensAddr",
//         "type": "address"
//       },
//       {
//         "name": "node",
//         "type": "bytes32"
//       }
//     ],
//     "type": "constructor"
//   }
// ]);
// var testRegistrar = fifsRegistrarContract.at(ens.owner(namehash('test')));
//
// var resolverContract = web3.eth.contract([
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "interfaceID",
//         "type": "bytes4"
//       }
//     ],
//     "name": "supportsInterface",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "node",
//         "type": "bytes32"
//       }
//     ],
//     "name": "addr",
//     "outputs": [
//       {
//         "name": "ret",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "node",
//         "type": "bytes32"
//       },
//       {
//         "name": "kind",
//         "type": "bytes32"
//       }
//     ],
//     "name": "has",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "node",
//         "type": "bytes32"
//       },
//       {
//         "name": "addr",
//         "type": "address"
//       }
//     ],
//     "name": "setAddr",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "node",
//         "type": "bytes32"
//       }
//     ],
//     "name": "content",
//     "outputs": [
//       {
//         "name": "ret",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "node",
//         "type": "bytes32"
//       },
//       {
//         "name": "hash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "setContent",
//     "outputs": [],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "name": "ensAddr",
//         "type": "address"
//       }
//     ],
//     "type": "constructor"
//   },
//   {
//     "payable": false,
//     "type": "fallback"
//   }
// ]);
// var publicResolver = resolverContract.at('0x4c641fb9bad9b60ef180c31f56051ce826d21a9a');
//
//
// var reverseRegistrarContract = web3.eth.contract([
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "owner",
//         "type": "address"
//       }
//     ],
//     "name": "claim",
//     "outputs": [
//       {
//         "name": "node",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "addr",
//         "type": "address"
//       }
//     ],
//     "name": "node",
//     "outputs": [
//       {
//         "name": "ret",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "rootNode",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "name": "ensAddr",
//         "type": "address"
//       },
//       {
//         "name": "node",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "type": "constructor"
//   }
// ]);
// var reverseRegistrar = reverseRegistrarContract.at(ens.owner(namehash('addr.reverse')));
//
// function getAddr(name) {
//   var node = namehash(name)
//   var resolverAddress = ens.resolver(node);
//   if (resolverAddress === '0x0000000000000000000000000000000000000000') {
//     return resolverAddress;
//   }
//   return resolverContract.at(resolverAddress).addr(node);
// }
//
// function getContent(name) {
//   var node = namehash(name)
//   var resolverAddress = ens.resolver(node);
//   if (resolverAddress === '0x0000000000000000000000000000000000000000') {
//     return "0x0000000000000000000000000000000000000000000000000000000000000000";
//   }
//   return resolverContract.at(resolverAddress).content(node);
// }
function ENS() {
  return web3().then(({ web3 }) => {
    return new ENSconstructor(web3, '0x112234455c3a32fd11230c42e7bccd4a84e02010')
  })
}

export default ENS
export {
//   getAddr,
//   getContent,
//   reverseRegistrar,
//   reverseRegistrarContract,
//   publicResolver,
//   resolverContract,
//   testRegistrar,
//   fifsRegistrarContract,
//   deedContract,
//   ethRegistrar,
//   auctionRegistrarContract,
   ens,
  // ensContract
   namehash,
}
