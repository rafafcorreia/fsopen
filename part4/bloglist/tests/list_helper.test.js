const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '6afd934b98807b60d0c70de2',
        title: 'Amaritudo cubitum absconditus admoveo volutabrum cur.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.info',
        likes: 42,
        __v: 0,
      },
    ];

    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 42);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '6afd934b98807b60d0c70de2',
        title: 'Amaritudo cubitum absconditus admoveo volutabrum cur.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.info',
        likes: 42,
        __v: 0,
      },
      {
        _id: '6afd935f98807b60d0c70de3',
        title: 'Vilis vito audacia.',
        author: 'Riley Johnson',
        url: 'https://alarmed-sustenance.com/',
        likes: 4_054,
        __v: 0,
      },
    ];

    assert.strictEqual(listHelper.totalLikes(blogs), 4_096);
  });
});

describe('favorite blog', () => {
  test('of empty list is an empty object', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), {});
  });

  test('when list has only one blog returns that blog', () => {
    const expectedBlog = {
      _id: '6afd934b98807b60d0c70de2',
      title: 'Amaritudo cubitum absconditus admoveo volutabrum cur.',
      author: 'Ezekiel Senger',
      url: 'https://artistic-freezing.info',
      likes: 42,
      __v: 0,
    };

    const listWithOneBlog = [expectedBlog];

    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithOneBlog),
      expectedBlog,
    );
  });

  test('of a bigger list returns the one with most likes', () => {
    const expectedBlog = {
      _id: '6afd9ea339b088e9ec73cd5d',
      title:
        'Adamo tabernus vulticulus civis perspiciatis triumphus maxime voluptates.',
      author: 'Weston Borer',
      url: 'https://windy-meadow.name',
      likes: 4_054,
      __v: 0,
    };

    const blogs = [
      {
        _id: '6afd934b98807b60d0c70de2',
        title: 'Amaritudo cubitum absconditus admoveo volutabrum cur.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.info',
        likes: 42,
        __v: 0,
      },
      expectedBlog,
      {
        _id: '6afd935f98807b60d0c70de3',
        title: 'Vilis vito audacia.',
        author: 'Riley Johnson',
        url: 'https://alarmed-sustenance.com/',
        likes: 0,
        __v: 0,
      },
    ];

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), expectedBlog);
  });

  test('of a list with multiple favorites returns the one found first', () => {
    const expectedBlog = {
      _id: '6afd9ea339b088e9ec73cd5d',
      title:
        'Adamo tabernus vulticulus civis perspiciatis triumphus maxime voluptates.',
      author: 'Weston Borer',
      url: 'https://windy-meadow.name',
      likes: 4_054,
      __v: 0,
    };

    const blogs = [
      expectedBlog,
      {
        _id: '6afd935f98807b60d0c70de3',
        title: 'Vilis vito audacia.',
        author: 'Riley Johnson',
        url: 'https://alarmed-sustenance.com/',
        likes: 4_054,
        __v: 0,
      },
    ];

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), expectedBlog);
  });
});
