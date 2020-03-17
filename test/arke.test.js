const {expect, test} = require('@oclif/test')
const cmd = require('..')

describe('arke', () => {
  test
  .stdout()
  .do(() => cmd.run(['-fglippi/arke']))
  .it('runs arke', async ctx => {
    const stdout = await ctx.stdout
    expect(stdout).to.contain('Find out how everything started for glippi/arke here: https://github.com/glippi/arke/commit/f620e8b88ef042853fadb83e2d99ff8cce5dbf43\n')
  })
})
