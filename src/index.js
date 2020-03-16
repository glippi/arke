const {Command, flags} = require('@oclif/command')
const {getRepoCreationDateFor, shiftDateOfOneDay, getFirstCommitUrlFor} = require('./utils')
const {cli} = require('cli-ux')

class EurekaCommand extends Command {
  async run() {
    const {flags} = this.parse(EurekaCommand)
    const fullName = flags.fullName

    if (isCliPrompt(fullName)) {
      const repoName = await cli.prompt('Enter repository name')
      const repoAuthor = await cli.prompt('Enter repository author')

      const creationDate = await getRepoCreationDateFor(repoAuthor, repoName)
      try{
	const creationDatePlusOneDay = shiftDateOfOneDay(creationDate)
      }
      catch {
	return
      }
      const firstCommitUrl = await getFirstCommitUrlFor(repoAuthor, repoName, creationDatePlusOneDay)

      printMesage(repoName, firstCommitUrl)
      return
    }

    const creationDate = await getRepoCreationDateFor(fullName)
    try{
      const creationDatePlusOneDay = shiftDateOfOneDay(creationDate)
    }
    catch {
      return
    }
    const firstCommitUrl = await getFirstCommitUrlFor(`${fullName}/${creationDatePlusOneDay}`)

    printMesage(fullName, firstCommitUrl)
  }
}

function isCliPrompt(fullName) {
  return typeof fullName === 'undefined'
}

function printMesage(name, commitUrl) {
  this.log(`Find out how everything started for ${name} here: ${commitUrl}`)
}

EurekaCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  fullName: flags.string({char: 'f', description: 'full_name (repo-author/repo-name)'}),
}

module.exports = EurekaCommand
