// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Minigame {
    struct User {
        string _ID;
        address _VI;
    }
    
    event SM_emit_data(address _vi, string _id);
    
    User[] public userList;
    
    
    function register(string memory _id) public {
        User memory newUser = User(_id, msg.sender);
        userList.push(newUser);
        
        emit SM_emit_data(msg.sender, _id);
    }
}