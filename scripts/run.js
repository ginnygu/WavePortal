const main = async () => {
    const wavesArray = new Array;
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to :", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    let waveTxn = await waveContract.wave();
    let sender = await waveTxn.wait();

    wavesArray.push(sender.from)

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    sender = await waveTxn.wait()

    wavesArray.push(sender.from)

    waveCount = await waveContract.getTotalWaves();
    console.log(wavesArray)
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

runMain();