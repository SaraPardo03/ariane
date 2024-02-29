import { ref, push, set, remove } from 'firebase/database';
import { db } from '../configs/firebaseConfig';

class Page {
  constructor(data) {
    this.end = data.end || false;
    this.first = data.first || false;
    this.nbCharacters = data.nbCharacters || 0;
    this.previousNbCharacters = data.previousNbCharacters || 0;
    this.text = data.text || '';
    this.title = data.title || '';
    this.previousPageId = data.previousPageId || null;
  }

  // Method to save a new page to the database
  async save(storyId) {
    const pageData = {
      end: this.end,
      first: this.first,
      nbCharacters: this.nbCharacters,
      previousNbCharacters: this.previousNbCharacters,
      text: this.text,
      title: this.title,
      previousPageId : this.previousPageId 
    };
    const pagesRef = ref(db, `pages/${storyId}`);
    if (this.id) {
      const pageRef = ref(pagesRef, this.id);
      await set(pageRef, pageData);
      return this.id;
    } else {
      const newPageRef = push(pagesRef);
      await set(newPageRef, pageData);
      return newPageRef.key;
    }
  }

  // Method to update a page in the database
  async update(storyId, pageId) {
    const pageRef = ref(db, `pages/${storyId}/${pageId}`);
    await set(pageRef, this);
  }

  // Method to delete a page from the database
  async delete(storyId, pageId) {
    const pageRef = ref(db, `pages/${storyId}/${pageId}`);
    await remove(pageRef);
  }
}

export default Page;
