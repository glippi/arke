const fetch = require('node-fetch');

async function getRepoCreationDateFor(author, repo) {
  if (arguments.length > 1) {
    const response = await fetch(`https://api.github.com/repos/${author}/${repo}`)
    const { status } = response

    switch(status)
    {
      case 200:
	const { created_at } = await response.json()
	return created_at
      case 403:
	console.error("👮️ API rate limit exceeded for your IP address.\nFor more details please check: https://developer.github.com/v3/#rate-limiting") 
	break
      case 404:
	console.error("😅 Can't find what you are looking for. Probably there's a mispelling of the author, the repository or both")
	break
      default:
	console.error("🤦 Something went wrong!")
    }
  }
  else {
    const [ author, repo ] = arguments[0].split('/')
    return await getRepoCreationDateFor(author, repo)
  }
}

function shiftDateOfOneDay(isoStringDate) {
  const date = new Date(isoStringDate)
  date.setDate(date.getDate() + 1)
  return new Date(date).toISOString()
}

async function getFirstCommitUrlFor(author, repo, date) {
  if (arguments.length > 1) {
    const response = await fetch(`https://api.github.com/repos/${author}/${repo}/commits?until=${date}`)
    try {
      const commits = await response.json()
      const firstCommit = commits.slice(-1)[0] 
      return firstCommit.html_url
    }
    catch {
      console.error("😭 No commits found")
    }
  }
  else {
    const [ author, repo, date ] = arguments[0].split('/')
    return await getFirstCommitUrlFor(author, repo, date)
  }
}

module.exports = {
  getRepoCreationDateFor,
  shiftDateOfOneDay,
  getFirstCommitUrlFor,
}
