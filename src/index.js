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
      const creationDatePlusOneDay = shiftDateOfOneDay(creationDate)
      const firstCommitUrl = await getFirstCommitUrlFor(repoAuthor, repoName, creationDatePlusOneDay)

      this.log(`Find out how everything started for ${repoName} here: ${firstCommitUrl}`)
      return
    }

    const creationDate = await getRepoCreationDateFor(fullName)
    const creationDatePlusOneDay = shiftDateOfOneDay(creationDate)
    const firstCommitUrl = await getFirstCommitUrlFor(`${fullName}/${creationDatePlusOneDay}`)
    this.log(`Check out how everything started for ${fullName} here: ${firstCommitUrl}`)
  }
}

function isCliPrompt(fullName) {
  return typeof fullName === 'undefined'
}

EurekaCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  fullName: flags.string({char: 'f', description: 'full_name (repo-author/repo-name)'}),
}

module.exports = EurekaCommand
