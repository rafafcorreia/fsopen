const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const Note = require('../models/note');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially some notes', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');
    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map((n) => n.content);
    assert(contents.includes('HTML is easy'));
  });

  describe('adding a note', () => {
    test('with valid content succeeds with status code 201', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const notesAfter = await helper.notesInDb();
      assert.strictEqual(notesAfter.length, helper.initialNotes.length + 1);

      const contents = notesAfter.map((n) => n.content);
      assert(contents.includes('async/await simplifies making async calls'));
    });

    test('without content property fails with status code 400', async () => {
      const newNote = {
        important: true,
      };

      await api.post('/api/notes').send(newNote).expect(400);

      const notesAfter = await helper.notesInDb();

      assert.strictEqual(notesAfter.length, helper.initialNotes.length);
    });
  });

  describe('viewing a specific note', () => {
    test('with valid id succeeds with status code 200', async () => {
      const notesBefore = await helper.notesInDb();
      const noteToView = notesBefore[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId();
      await api.get(`/api/notes/${validNonExistingId}`).expect(404);
    });

    test('fails with status code 400 if id format is invalid', async () => {
      const invalidId = '123abc456def789ghi0j';
      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe('deleting a note', () => {
    test('with valid id succeeds with status code 204', async () => {
      const notesBefore = await helper.notesInDb();
      const noteToDelete = notesBefore[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAfter = await helper.notesInDb();
      const containsDeletedNoteId = notesAfter.some(
        (n) => n.id === noteToDelete.id,
      );
      assert(!containsDeletedNoteId);
      assert.strictEqual(notesAfter.length, helper.initialNotes.length - 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
