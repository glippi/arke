const {expect, test} = require('@oclif/test')
const {getRepoCreationDateFor, shiftDateOfOneDay, getFirstCommitUrlFor} = require('../src/utils')

describe('exec command with cli flags', () => {
  describe('getRepoCreationDateFor', () => {
    test
    .it('returns created_at field with value 2020-02-29T10:28:16Z', async () => {
      const creationDate = await getRepoCreationDateFor('glippi/eureka')

      expect(creationDate).to.equal('2020-02-29T10:28:16Z')
    })
  })

  describe('getFirstCommitUrlFor', () => {
    test
    .it('returns the url pointing to github with first commit', async () => {
      const url = await getFirstCommitUrlFor('glippi/eureka/2020-02-29T10:28:16Z')

      expect(url).to.equal('https://github.com/glippi/eureka/commit/f620e8b88ef042853fadb83e2d99ff8cce5dbf43')
    })
  })
})

describe('exec command with cli prompt', () => {
  describe('getRepoCreationDateFor', () => {
    test
    .it('returns created_at field with value 2020-02-29T10:28:16Z', async () => {
      const creationDate = await getRepoCreationDateFor('glippi', 'eureka')

      expect(creationDate).to.equal('2020-02-29T10:28:16Z')
    })
  })

  describe('getFirstCommitUrlFor', () => {
    test
    .it('returns the url pointing to github with first commit', async () => {
      const url = await getFirstCommitUrlFor('glippi', 'eureka', '2020-02-29T10:28:16Z')

      expect(url).to.equal('https://github.com/glippi/eureka/commit/f620e8b88ef042853fadb83e2d99ff8cce5dbf43')
    })
  })
})

describe('shiftDateOfOneDay', () => {
  test
  .it('add one day to original date', () => {
    const creationDate = shiftDateOfOneDay('2020-02-29T10:28:16Z')

    expect(creationDate).to.equal('2020-03-01T10:28:16.000Z')
  })
})
