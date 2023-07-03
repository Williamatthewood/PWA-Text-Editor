import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Test put method
export const putDb = async (content) => {
console.log('PUT info into the database');

const editorDb = await openDB('editor', 1);

const tx = editorDb.transaction('editor', 'readwrite');

const store = tx.objectStore('editor');

const request = store.put(content);

const result = await request;

console.log('data saved to the database', result);


}


export const getDb = async () => {
  console.log('GET from the database');

  const editorDb = await openDB('editor', 1);

  const tx = editorDb.transaction('editor', 'readonly');

  const store = tx.objectStore('editor');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
