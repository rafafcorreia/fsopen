const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  const listWithMultipleBlogs = [
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
      likes: 0,
      __v: 0,
    },
    {
      _id: '6afd9c45679fa5d1ca08246f',
      title: 'Confido aegre pecus atavus modi nam cena pecco tui.',
      author: 'Armando Kozey DVM',
      url: 'https://tepid-wallaby.name',
      likes: 1,
      __v: 0,
    },
    {
      _id: '6afd9ea339b088e9ec73cd5d',
      title:
        'Adamo tabernus vulticulus civis perspiciatis triumphus maxime voluptates.',
      author: 'Weston Borer',
      url: 'https://windy-meadow.name',
      likes: 4_054,
      __v: 0,
    },
  ];

  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test('when list has only one blog equals the like of that', () => {
    const blogs = [listWithMultipleBlogs[0]];
    assert.strictEqual(listHelper.totalLikes(blogs), blogs[0].likes);
  });

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(listWithMultipleBlogs), 4_097);
  });
});
