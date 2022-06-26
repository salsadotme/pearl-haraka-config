// get_mx.eth

const { ethers } = require("ethers");
const contractAddress = "0x0D0Ce610F0EbE2d3Fd46C1F6a65b4DdB6140674f";
const PEARL_CONTRACT = require("./pearl_abi.json");
const INFURA_ID = "a71874bbcb6a450398f24a7bbd436eda";
const provider = new ethers.providers.InfuraProvider("maticmum", INFURA_ID)
const contract = new ethers.Contract(contractAddress, PEARL_CONTRACT, provider);

exports.hook_capabilities = (next, connection) => {
    connection.relaying = true;
    next();
}

exports.hook_get_mx = async function (next, hmail, domain) {
    const toAddress = hmail.todo.rcpt_to[0].user;
    this.loginfo("resolving address: " + toAddress);

    const server = await contract.yampServers("0x06e6f7D896696167B2dA9281EbAF8a14580fbFCc");
    this.loginfo("resolved server: " + server);

    return next(OK, {
        priority: 0,
        exchange: server,
        port: 2555,
    });
}
