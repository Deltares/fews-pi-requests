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

});
