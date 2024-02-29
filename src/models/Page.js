import { ref, push, equalTo, set, remove } from 'firebase/database';
import { db } from '../configs/firebaseConfig';
import Story from './Story'; 

class Page {
  constructor(data) {
    this.end = data.end || false;
    this.first = data.first || false;
    this.text = data.text || '';
    this.title = data.title || '';
    this.previousPageId = data.previousPageId || null;
    this.totalCharacters = data.totalCharacters || this.text.length || 0; 
  }
  // Static method to notify Story during operations on pages
  static async notifyStory(storyId) {
    await Story.updateStats(storyId);
  }
  // Method to save a new page to the database
  async save(storyId) {
    const pageData = {
      end: this.end,
      first: this.first,  
      text: this.text,
      title: this.title,
      previousPageId : this.previousPageId ,
      totalCharacters: this.text.length,
    };
    const pagesRef = ref(db, `pages/${storyId}`);
    if (this.id) {
      const pageRef = ref(pagesRef, this.id);
      await set(pageRef, pageData);
      await Page.notifyStory(storyId);
      return this.id;
    } else {
      const newPageRef = push(pagesRef);
      await set(newPageRef, pageData);
      await Page.notifyStory(storyId);
      return newPageRef.key;
    }
  }

    // Method to update a page in the database
  async update(storyId, pageId) {
    const pageRef = ref(db, `pages/${storyId}/${pageId}`);
    const pageData = {
      end: this.end,
      first: this.first,
      text: this.text,
      title: this.title,
      previousPageId: this.previousPageId,
      totalCharacters: this.text.length,
    };
    await set(pageRef, pageData);
    await Page.notifyStory(storyId);
  }
  
  // Method to delete a page from the database
  async delete(storyId, pageId) {
    const pageRef = ref(db, `pages/${storyId}/${pageId}`);
    await remove(pageRef);
    await Page.notifyStory(storyId);
  }
}

export default Page;
