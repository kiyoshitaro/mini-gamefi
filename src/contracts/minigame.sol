// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Minigame {
    User[] public arrUser;
    struct User {
        string _id;
        address _wallet;
    }

    event pushData(address wallet, string _id);

    function regist(string memory _id) public {
        User memory newUser = User(_id, msg.sender);
        arrUser.push(newUser);
        emit pushData(msg.sender, _id);
    }
}
