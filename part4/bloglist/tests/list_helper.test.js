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
describe('most blogs', () => {
  test('of an empty list returns an empty object', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {});
  });

  test('of a list with only one blog returns the author and blog count', () => {
    const blogs = [
      {
        _id: '6afd934b98807b60d0c70de2',
        title: 'Amaritudo cubitum absconditus admoveo volutabrum cur.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.info',
        likes: 42,
        __v: 0,
      },
    ];

    const expectedValue = {
      author: 'Ezekiel Senger',
      blogs: 1,
    };

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), expectedValue);
  });

  test('of a large list returns the top author and blog count', () => {
    const blogs = [
      {
        _id: '6afda3c0c702922b3781155f',
        title:
          'Cerno sollers curo natus varius conitor ascit subseco universe auctus.',
        author: 'Jerrell Kautzer',
        url: 'https://baggy-range.name/',
        likes: 186,
        __v: 0,
      },
      {
        _id: '6afd934b98807b60d0c70de2',
        title: 'Amaritudo cubitum absconditus admoveo volutabrum cur.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.info',
        likes: 42,
        __v: 0,
      },
      {
        _id: '6afd934b98807b60d0c70df3',
        title: 'Lorem Ipsum.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.test',
        likes: 99,
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
    ];

    const expectedValue = {
      author: 'Ezekiel Senger',
      blogs: 2,
    };

    const actualValue = listHelper.mostBlogs(blogs);

    assert.deepStrictEqual(actualValue, expectedValue);
  });

  test('of a list with many top authors returns the first top author found and blog count', () => {
    const blogs = [
      {
        _id: '6afda3c0c702922b3781155f',
        title:
          'Cerno sollers curo natus varius conitor ascit subseco universe auctus.',
        author: 'Jerrell Kautzer',
        url: 'https://baggy-range.name/',
        likes: 186,
        __v: 0,
      },
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
        _id: '6afd934b98807b60d0c70df3',
        title: 'Lorem Ipsum.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.test',
        likes: 99,
        __v: 0,
      },
      {
        _id: '6afd935f98807b60d0c70de3',
        title: 'Test title',
        author: 'Riley Johnson',
        url: 'https://alarmed-sustenance.test/',
        likes: 1_000,
        __v: 0,
      },
    ];

    const expectedValue = {
      author: 'Ezekiel Senger',
      blogs: 2,
    };

    const actualValue = listHelper.mostBlogs(blogs);

    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe('most likes', () => {
  test('of an empty list returns an empty object', () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), {});
  });

  test('of a list with only one blog returns the author and likes count', () => {
    const blogs = [
      {
        _id: '6afda3c0c702922b3781155f',
        title:
          'Cerno sollers curo natus varius conitor ascit subseco universe auctus.',
        author: 'Jerrell Kautzer',
        url: 'https://baggy-range.name/',
        likes: 186,
        __v: 0,
      },
    ];

    const expectedValue = {
      author: 'Jerrell Kautzer',
      likes: 186,
    };

    assert.deepStrictEqual(listHelper.mostLikes(blogs), expectedValue);
  });

  test('of a large list returns the most liked author and likes count', () => {
    const blogs = [
      {
        _id: '6afda3c0c702922b3781155f',
        title:
          'Cerno sollers curo natus varius conitor ascit subseco universe auctus.',
        author: 'Jerrell Kautzer',
        url: 'https://baggy-range.name/',
        likes: 186,
        __v: 0,
      },
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
        _id: '6afd934b98807b60d0c70df3',
        title: 'Lorem Ipsum.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.test',
        likes: 999,
        __v: 0,
      },
      {
        _id: '6afd935f98807b60d0c70de3',
        title: 'Test title',
        author: 'Riley Johnson',
        url: 'https://alarmed-sustenance.test/',
        likes: 1_000,
        __v: 0,
      },
    ];

    const expectedValue = {
      author: 'Ezekiel Senger',
      likes: 1041,
    };

    assert.deepStrictEqual(listHelper.mostLikes(blogs), expectedValue);
  });

  test('of a large list with many top authors returns the first top author found and likes count', () => {
    const blogs = [
      {
        _id: '6afda3c0c702922b3781155f',
        title:
          'Cerno sollers curo natus varius conitor ascit subseco universe auctus.',
        author: 'Jerrell Kautzer',
        url: 'https://baggy-range.name/',
        likes: 186,
        __v: 0,
      },
      {
        _id: '6afd935f98807b60d0c70de3',
        title: 'Vilis vito audacia.',
        author: 'Riley Johnson',
        url: 'https://alarmed-sustenance.com/',
        likes: 41,
        __v: 0,
      },
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
        title: 'Test title',
        author: 'Riley Johnson',
        url: 'https://alarmed-sustenance.test/',
        likes: 1_000,
        __v: 0,
      },
      {
        _id: '6afd934b98807b60d0c70df3',
        title: 'Lorem Ipsum.',
        author: 'Ezekiel Senger',
        url: 'https://artistic-freezing.test',
        likes: 999,
        __v: 0,
      },
    ];

    const expectedValue = {
      author: 'Riley Johnson',
      likes: 1041,
    };

    assert.deepStrictEqual(listHelper.mostLikes(blogs), expectedValue);
  });
});
