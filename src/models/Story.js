import { ref, push, set, remove, update, get, child} from 'firebase/database';
import { db } from '../configs/firebaseConfig';
import {getAuth } from 'firebase/auth';

class Story {
  constructor(data) {
    this.id = data.id || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.totalCharacters = data.totalCharacters || 0;
    this.totalEnd = data.totalEnd || 0;
    this.totalPages = data.totalPages || 0;
    this.totalOpenNode = data.totalOpenNode || 0;
    this.summary = data.summary || '';
    this.title = data.title || '';
  }

  static async getTitleById(storyId) {
    try {
      const auth = getAuth();
      const storyRef = ref(db, `stories/${auth.currentUser.uid}/${storyId}`);
      const snapshot = await get(storyRef);
      
      if (snapshot.exists()) {
        const storyData = snapshot.val();
        return storyData.title;
      } else {
        return null; 
      }
    } catch (error) {
      console.error('Error:', error);
      return null; 
    }
  }

  static async getAllPagesFromStory(storyId) {
    const auth = getAuth();
    const pagesRef = ref(db, `pages/${auth.currentUser.uid}/${storyId}`);
    try {
      const snapshot = await get(pagesRef);
      
      if (snapshot.exists()) {
        const pages = [];
        snapshot.forEach((childSnapshot) => {
          pages.push(childSnapshot.val());
        });
        return pages;
      } else {
        return [];
      }
    } catch (error) {
      return [];  
    }
  }

  static async updateStats(storyId) {
    const auth = getAuth();
    const pages = await Story.getAllPagesFromStory(storyId);

    let totalCharacters = 0;
    let totalPages = 0;
    let totalEnd = 0;
    let totalOpenNode = 0;

    pages.forEach(page => {
      totalCharacters += page.totalCharacters;
      totalPages++;
      if (page.end) totalEnd++;
      //if (!page.end && Object.keys(page.choices).length > 0) totalOpenNode++;
    });

    const storyRef = ref(db, `stories/${auth.currentUser.uid}/${storyId}`);
    await update(storyRef, {
      totalCharacters: totalCharacters,
      totalEnd: totalEnd,
      totalPages: totalPages,
      totalOpenNode: totalOpenNode
    });
  }

  // Method to save a new story to the database
  async save() {
    const auth = getAuth();
    const storyData = {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      totalCharacters : this.totalCharacters,
      totalEnd : this.totalEnd,
      totalPages: this.totalPages,
      totalEnd : this.totalEnd,
      totalOpenNode :this.totalOpenNode,
      summary: this.summary,
      title: this.title,
    };

    if (this.id) {
      await set(ref(db, `stories/${auth.currentUser.uid}/${this.id}`), storyData);
      return this.id;
    } else {
      const newStoryRef = push(ref(db, `stories/${auth.currentUser.uid}`));
      await set(newStoryRef, storyData);
      return newStoryRef.key;
    }
  }

  // Method to update a story in the database
  async update() {
    const auth = getAuth();
    if (!this.id) throw new Error('Cannot update story without an ID');
    const storyRef = ref(db, `stories/${auth.currentUser.uid}/${this.id}`);
    await set(storyRef, this);
  }

  // Method to delete a story from the database
  async delete() {
    const auth = getAuth();
    if (!this.id) throw new Error('Cannot delete story without an ID');
    const storyRef = ref(db, `stories/${auth.currentUser.uid}/${this.id}`);
    await remove(storyRef);
  }
  
  // Method to delete all pages from a story
  async deleteAllPagesFromStory() {
    const auth = getAuth();
    if (!this.id) throw new Error('Cannot delete pages from story without an ID');
    const pageRef = ref(db, `pages/${auth.currentUser.uid}/${this.id}`);
    await remove(pageRef);
  }

  async deleteAllChoicesFromStory() {
    const auth = getAuth();
    if (!this.id) throw new Error('Cannot delete pages from story without an ID');
    const pageRef = ref(db, `choices/${auth.currentUser.uid}/${this.id}`);
    await remove(pageRef);
  }
}
export default Story;