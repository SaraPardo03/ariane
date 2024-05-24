import { ref, push, set, remove, update, get, child} from 'firebase/database';
import { db } from '../configs/firebaseConfig';
import {getAuth } from 'firebase/auth';

import { API_URL } from '../configs/configBDD';
import { getToken, setToken, removeToken, isTokenValid } from '../helpers/authHelpers';

class Story {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId || null
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.totalCharacters = data.totalCharacters || 0;
    this.totalEnd = data.totalEnd || 0;
    this.totalPages = data.totalPages || 0;
    this.totalOpenNode = data.totalOpenNode || 0;
    this.summary = data.summary || '';
    this.title = data.title || '';
  }

  static async getStoriesByUserId(userId) {
    try {
      const response = await fetch(`${API_URL}/stories/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error getting stories: ${response.statusText}`);
      }
      
      const data = await response.json();
      if(!data.stories){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return data.stories.map(story => new Story(story));

    } catch (error) {
      console.error('Error getting  stories:', error);
      //throw error;
    }
  }
  // Method to save a new story to the database
  async save(userId) {
    const storyData = {
      userId: userId,
      createdAt:this.createdAt.toISOString(), 
      updatedAt: this.updatedAt.toISOString(), 
      totalCharacters : this.totalCharacters,
      totalEnd : this.totalEnd,
      totalPages: this.totalPages,
      totalEnd : this.totalEnd,
      totalOpenNode :this.totalOpenNode,
      summary: this.summary,
      title: this.title,
    };

    try {
      const response = await fetch(`${API_URL}stories/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(storyData),
      });
      
      if (!response.ok) {
        throw new Error(`Error saving story up: ${response.statusText}`);
      }

      const data = await response.json();
      if(!data.story){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return data.story
      
    } catch (error) {
        console.error('Error signing up:', error);
      //throw error;
    }
  }

  // Method to update a story in the database
  async update() {
    console.log("update", this.createdAt, typeof this.createdAt);
    const storyData = {
      updatedAt: this.updatedAt, 
      totalCharacters : this.totalCharacters,
      totalEnd : this.totalEnd,
      totalPages: this.totalPages,
      totalEnd : this.totalEnd,
      totalOpenNode :this.totalOpenNode,
      summary: this.summary,
      title: this.title,
    };
    
    if (!this.id) throw new Error('Cannot update story without an ID');
    try {
      const response = await fetch(`${API_URL}stories/${this.userId}/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(storyData),
      });
      
      if (!response.ok) {
        throw new Error(`Error updapting up: ${response.statusText}`);
      }

      const data = await response.json();
      if(!data.story){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return data.story.id
      
    } catch (error) {
        console.error('Error updating up:', error);
      //throw error;
    }
  }

  // Method to delete a story from the database
  async delete() {
    try {
      const response = await fetch(`${API_URL}stories/${this.userId}/${this.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting up: ${response.statusText}`);
      }
      const data = await response.json();

      return data
      
    } catch (error) {
        console.error('Error deleting up:', error);
      //throw error;
    }
  }

  static async getTitleById(storyId) {
    try {
      const response = await fetch(`${API_URL}/stories/${userId}/${storyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error getting stories: ${response.statusText}`);
      }
      
      const data = await response.json();
      if(!data.stories){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return storyData.title;

    } catch (error) {
      console.error('Error getting  stories:', error);
      //throw error;
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