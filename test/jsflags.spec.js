var expect = require('chai').expect
var sinon = require('sinon')

var launcher = require('../index')

describe('isJSFlags()', function () {
  var isJSFlags = launcher.test.isJSFlags

  it('should return true if flag begins with --js-flags=', function () {
    expect(isJSFlags('--js-flags=--expose-gc')).to.be.eql(true)
    expect(isJSFlags('--js-flags="--expose-gc"')).to.be.eql(true)
    expect(isJSFlags("--js-flags='--expose-gc'")).to.be.eql(true)
  })

  it('should return false if flag does not begin with --js-flags=', function () {
    expect(isJSFlags(' --js-flags=--expose-gc')).to.be.eql(false)
    expect(isJSFlags('--js-flags"--expose-gc"')).to.be.eql(false)
    expect(isJSFlags('--jsflags="--expose-gc"')).to.be.eql(false)
  })
})

describe('sanitizeJSFlags()', function () {
  var sanitizeJSFlags = launcher.test.sanitizeJSFlags

  it('should do nothing if flags are not contained in quotes', function () {
    expect(sanitizeJSFlags('--js-flags=--expose-gc')).to.be.eql('--js-flags=--expose-gc')
  })

  it('should symmetrically remove single or double quote if wraps all flags', function () {
    expect(sanitizeJSFlags("--js-flags='--expose-gc'")).to.be.eql('--js-flags=--expose-gc')
    expect(sanitizeJSFlags('--js-flags="--expose-gc"')).to.be.eql('--js-flags=--expose-gc')
  })

  it('should NOT remove anything if the flags are not contained within quote', function () {
    expect(sanitizeJSFlags('--js-flags=--expose-gc="true"')).to.be.eql('--js-flags=--expose-gc="true"')
    expect(sanitizeJSFlags("--js-flags=--expose-gc='true'")).to.be.eql("--js-flags=--expose-gc='true'")
  })
})
