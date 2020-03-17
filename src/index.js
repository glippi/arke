const {Command, flags} = require('@oclif/command')
const {getRepoCreationDateFor, shiftDateOfOneDay, getFirstCommitUrlFor} = require('./utils')
const {cli} = require('cli-ux')

class ArkeCommand extends Command {
  async run() {
    const {flags} = this.parse(ArkeCommand)
    const fullName = flags.fullName
    let creationDatePlusOneDay
    let creationDate
    let firstCommitUrl

    if (isCliPrompt(fullName)) {
      const repoName = await cli.prompt('Enter repository name')
      const repoAuthor = await cli.prompt('Enter repository author')

      creationDate = await getRepoCreationDateFor(repoAuthor, repoName)
      try{
	creationDatePlusOneDay = shiftDateOfOneDay(creationDate)
      }
      catch {
	return
      }
      firstCommitUrl = await getFirstCommitUrlFor(repoAuthor, repoName, creationDatePlusOneDay)

  this.log(`Find out how everything started for ${repoName} here: ${firstCommitUrl}`)
      return
    }

    creationDate = await getRepoCreationDateFor(fullName)
    try{
      creationDatePlusOneDay = shiftDateOfOneDay(creationDate)
    }
    catch {
      return
    }
    firstCommitUrl = await getFirstCommitUrlFor(`${fullName}/${creationDatePlusOneDay}`)

  this.log(`Find out how everything started for ${fullName} here: ${firstCommitUrl}`)
  }
}

function isCliPrompt(fullName) {
  return typeof fullName === 'undefined'
}

ArkeCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  fullName: flags.string({char: 'f', description: 'full_name (repo-author/repo-name)'}),
}

module.exports = ArkeCommand
