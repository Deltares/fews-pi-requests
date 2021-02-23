import { splitUrl } from '../../../src/utils/requests'

describe("split url", function() {

  it("splits with single duplicate", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1')
    const urls = splitUrl(url)
    expect(urls[0].toString()).toMatch('https://example.com/base?b=1&verylongkey=1');
    expect(urls[1].toString()).toMatch('https://example.com/base?b=1&verylongkey=2');
  });


  it("splits with double duplicate", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj')
    const urls = splitUrl(url)
    expect(urls[0].toString()).toMatch('https://example.com/base?b=1&verylongkey=1&c=blah&c=jfkjldsafj');
    expect(urls[1].toString()).toMatch('https://example.com/base?b=1&verylongkey=2&c=blah&c=jfkjldsafj');
  });

  it("splits with triple duplicate", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&b=1&c=blah&c=jfkjldsafj&d=I&d=II')
    const urls = splitUrl(url)
    expect(urls[0].toString()).toMatch('https://example.com/base?b=1&verylongkey=1&c=blah&c=jfkjldsafj&d=I&d=II');
    expect(urls[1].toString()).toMatch('https://example.com/base?b=1&verylongkey=2&c=blah&c=jfkjldsafj&d=I&d=II');
  });


});
