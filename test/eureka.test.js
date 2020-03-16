const {expect, test} = require('@oclif/test')
const cmd = require('..')

describe('eureka', () => {
  test
  .stdout()
  .do(() => cmd.run(['-fglippi/eureka']))
  .it('runs eureka', async ctx => {
    const stdout = await ctx.stdout
    expect(stdout).to.contain('Check out how everything started for glippi/eureka here: https://github.com/glippi/eureka/commit/f620e8b88ef042853fadb83e2d99ff8cce5dbf43\n')
  })
})
