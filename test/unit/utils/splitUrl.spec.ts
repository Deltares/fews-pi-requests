import { mostValuesParameter, splitUrl } from '../../../src/utils/splitUrl'

import { describe, it, expect } from 'vitest';

describe("split url", function() {

  it('selects the parameter with the most comma-separated values', function () {
    const url = new URL('https://example.com/base?a=one,two,three&b=alpha,beta&c=single')
    const parameter = mostValuesParameter(url)
    expect(parameter).toBe('a')
  })

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

  it("splits on most frequent key that is not first in the list", function() {
    const url = new URL('https://example.com/base?verylongkey=1&verylongkey=2&longkeyb=a&longkeyb=b&longkeyb=c&d=I&d=II')
    const urls =  splitUrl(url, 80)
    expect(urls[0].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&d=I&d=II&longkeyb=a');
    expect(urls[1].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&d=I&d=II&longkeyb=b');
    expect(urls[2].toString()).toMatch('https://example.com/base?verylongkey=1&verylongkey=2&d=I&d=II&longkeyb=c');
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

  it('splits comma-separated values when strategy is configured', function () {
    const url = new URL('https://example.com/base?documentFormat=PI_JSON&taskRunIds=first,second')
    const urls = splitUrl(url, 68, 'taskRunIds', 'comma-separated-values')

    expect(urls).toHaveLength(2)
    expect(urls[0].toString()).toBe('https://example.com/base?documentFormat=PI_JSON&taskRunIds=first')
    expect(urls[1].toString()).toBe('https://example.com/base?documentFormat=PI_JSON&taskRunIds=second')
  })

  it('uses most-values parameter when comma-separated strategy has no explicit split parameter', function () {
    const url = new URL('https://example.com/base?a=1,2&taskRunIds=x,y,z')
    const singleChunkCandidate = new URL('https://example.com/base?a=1,2')
    singleChunkCandidate.searchParams.set('taskRunIds', 'x')
    const maxLength = singleChunkCandidate.toString().length
    const urls = splitUrl(url, maxLength, undefined, 'comma-separated-values')

    expect(urls.length).toBeGreaterThan(1)
    expect(urls.every((u) => u.searchParams.get('a') === '1,2')).toBe(true)
    const taskRunIds = urls.flatMap((u) => (u.searchParams.get('taskRunIds') ?? '').split(','))
    expect(taskRunIds).toStrictEqual(['x', 'y', 'z'])
  })

  it('does not split at exact max length but splits when one character shorter in comma-separated strategy', function () {
    const url = new URL('https://example.com/base?documentFormat=PI_JSON&taskRunIds=first,second')
    const exactLength = url.toString().length

    const exactFit = splitUrl(url, exactLength, 'taskRunIds', 'comma-separated-values')
    const oneShorter = splitUrl(url, exactLength - 1, 'taskRunIds', 'comma-separated-values')

    expect(exactFit).toHaveLength(1)
    expect(oneShorter).toHaveLength(2)
  })

  it('splits repeated params when repeat strategy is configured', function () {
    const url = new URL('https://example.com/base?documentFormat=PI_JSON&taskRunIds=first&taskRunIds=second')
    const urls = splitUrl(url, 69, 'taskRunIds', 'repeat-params')

    expect(urls).toHaveLength(2)
    expect(urls[0].toString()).toBe('https://example.com/base?documentFormat=PI_JSON&taskRunIds=first')
    expect(urls[1].toString()).toBe('https://example.com/base?documentFormat=PI_JSON&taskRunIds=second')
  })

  it('throws when comma-separated strategy cannot satisfy max length', function () {
    const url = new URL('https://example.com/base?documentFormat=PI_JSON&taskRunIds=verylongvalue')
    expect(() => splitUrl(url, 40, 'taskRunIds', 'comma-separated-values')).toThrow()
  })

});
