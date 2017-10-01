const Now = require('now-client')
const { sleep } = require('sleep')

const now = new Now(process.env.NOW_TOKEN)
const deploymentName = process.env.DEPLOYMENT_NAME

const checkStatus = async () => {
  let deployments
  const data = await now.getDeployments()
  if (deploymentName) {
    deployments = data
      .filter(deployment => deployment.name === deploymentName)
  } else {
    deployments = data
  }
  const sortedDeployments = deployments.sort((a, b) => b.created - a.created)
  const latestDeployment = sortedDeployments[0]
  if (['BUILD_ERROR', 'DEPLOYMENT_ERROR'].includes(latestDeployment.state)) {
    return new Error(`Deployment failed for ${latestDeployment.name} at ${latestDeployment.url}`)
  }
  if (latestDeployment.state !== 'READY') {
    console.log(`Deploying ${latestDeployment.name} at ${latestDeployment.url}`)
    sleep(5)
    checkStatus()
  }
  return console.log(`Deployed ${latestDeployment.name} at ${latestDeployment.url}`)
}

checkStatus()
