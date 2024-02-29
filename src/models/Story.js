import { ref, push, set, remove, onValue } from 'firebase/database';
import { db } from '../configs/firebaseConfig';

class Story {
  constructor(data) {
    this.id = data.id || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.nbCharacters = data.nbCharacters || 0;
    this.nbEnd = data.nbEnd || 0;
    this.nbPages = data.nbPages || 0;
    this.openNode = data.openNode || 0;
    this.summary = data.summary || '';
    this.text = data.text || '';
    this.title = data.title || '';
  }

  // Method to save a new story to the database
  async save() {
    const storyData = {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nbCharacters : this.nbCharacters,
      nbEnd : this.nbEnd,
      nbPages: this.nbPages,
      nbEnd : this.nbEnd,
      openNode :this.openNode,
      summary: this.summary,
      text: this.text,
      title: this.title,
    };
    if (this.id) {
      await set(ref(db, `stories/${this.id}`), storyData);
      return this.id;
    } else {
      const newStoryRef = push(ref(db, 'stories/'));
      await set(newStoryRef, storyData);
      return newStoryRef.key;
    }
  }

  // Method to update a story in the database
  async update() {
    if (!this.id) throw new Error('Cannot update story without an ID');
    const storyRef = ref(db, `stories/${this.id}`);
    await set(storyRef, this);
  }

  // Method to delete a story from the database
  async delete() {
    if (!this.id) throw new Error('Cannot delete story without an ID');
    const storyRef = ref(db, `stories/${this.id}`);
    await remove(storyRef);
  }
  
  // Method to delete all pages from a story
  async deleteAllPagesFromStory() {
    if (!this.id) throw new Error('Cannot delete pages from story without an ID');
    const pageRef = ref(db, `pages/${this.id}`);
    await remove(pageRef);
  }

  async deleteAllChoicesFromStory() {
    if (!this.id) throw new Error('Cannot delete pages from story without an ID');
    const pageRef = ref(db, `choices/${this.id}`);
    await remove(pageRef);
  }

}

export default Story;