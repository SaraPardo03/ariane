import { ref, push, set, remove } from 'firebase/database';
import { db } from '../configs/firebaseConfig';

class Choice {
  constructor(data) {
    this.pageId = data.pageId || null;
    this.title = data.title || '';
    this.sendToPageId = data.sendToPageId || null;
  }

  // Method to save a new choice to the database
  async save(choiceId) {
    const choiceData = {
        pageId: this.pageId,
        title: this.title,
        sendToPageId: this.sendToPageId
    };

    console.log("save", choiceData);
    const choicesRef = ref(db, `choices/${this.pageId}`);
    if (choiceId) {
        const choiceRef = ref(db, `choices/${this.pageId}/${choiceId}`);
        await set(choiceRef, choiceData);
        return choiceId;
    } else {
        const newChoiceRef = push(choicesRef);
        await set(newChoiceRef, choiceData);
        return newChoiceRef.key;
    }
  }

  // Method to update a choice in the database
  async update(choiceId) {
    if (!choiceId) throw new Error('Cannot update choice without an ID');
    const choiceRef = ref(db, `choices/${this.pageId}/${choiceId}`);
    await set(choiceRef, this);
  }

  // Method to delete a choice from the database
  async delete(choiceId) {
    if (!choiceId) throw new Error('Cannot delete choice without an ID');
    const choiceRef = ref(db, `choices/${this.pageId}/${choiceId}`);
    await remove(choiceRef);
  }
}

export default Choice;
