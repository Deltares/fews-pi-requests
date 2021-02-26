import { splitUrl } from '../../../src/utils/requests'

describe("split url", function() {

  it("do not split with single duplicate shorter than max length", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1')
    const urls = splitUrl(url)
    expect(urls[0].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&b=1');
  });

  it("splits with single duplicate", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1')
    const urls = splitUrl(url, 50)
    expect(urls[0].toString()).toMatch('https://example.com/base?b=1&verylongkey=1');
    expect(urls[1].toString()).toMatch('https://example.com/base?b=1&verylongkey=2');
  });

  it("throw error when max length cannot be satisfied", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1')
    expect(() => splitUrl(url, 40)).toThrow()
  });

  it("do not split with double duplicate shorter than max length", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj')
    const urls = splitUrl(url)
    expect(urls[0].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj');
  });

  it("splits with double duplicate", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj')
    const urls = splitUrl(url, 70)
    expect(urls[0].toString()).toMatch('https://example.com/base?b=1&c=blah&c=jfkjldsafj&verylongkey=1');
    expect(urls[1].toString()).toMatch('https://example.com/base?b=1&c=blah&c=jfkjldsafj&verylongkey=2');
  });

  it("splits with double duplicate by non default parameter", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj')
    const urls = splitUrl(url, 70, 'c')
    expect(urls[0].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah');
    expect(urls[1].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=jfkjldsafj');
  });

  it("do not split with triple duplicate shorter than max length", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj&d=I&d=II')
    const urls =  splitUrl(url)
    expect(urls[0].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj&d=I&d=II');
  });

  it("splits with triple duplicate", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj&d=I&d=II')
    const urls =  splitUrl(url, 80)
    expect(urls[0].toString()).toMatch('https://example.com/base?b=1&c=blah&c=jfkjldsafj&d=I&d=II&verylongkey=1');
    expect(urls[1].toString()).toMatch('https://example.com/base?b=1&c=blah&c=jfkjldsafj&d=I&d=II&verylongkey=2');
  });

  it("splits with triple duplicate by non default parameter 'c'", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj&d=I&d=II')
    const urls =  splitUrl(url, 80, 'c')
    expect(urls[0].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&b=1&d=I&d=II&c=blah');
    expect(urls[1].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&b=1&d=I&d=II&c=jfkjldsafj');
  });

  it("splits with triple duplicate by non default parameter 'd'", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj&d=I&d=II')
    expect(() => splitUrl(url, 80, 'd')).toThrow()
  });

  it("splits with triple duplicate by non default parameter 'd' reverse order", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj&d=II&d=I')
    expect(() => splitUrl(url, 80, 'd')).toThrow()
  });

});
