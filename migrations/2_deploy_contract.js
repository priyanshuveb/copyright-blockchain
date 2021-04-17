const Copyright = artifacts.require("Copyright");
// const Label = artifacts.require('Label')
module.exports = async function(deployer) {
  // await deployer.deploy(Label)
  // const label = await Label.deployed()

  await deployer.deploy(Copyright)
  const copyright = await Copyright.deployed()
};
  
