import { getAuth } from 'firebase/auth';
import { API_URL } from '../configs/configBDD';
import { getToken } from '../helpers/authHelpers';
import Story from './Story';

class Page {
  constructor(data) {
    this.id = data.id || null;
    this.storyId = data.storyId || null;
    this.end = data.end || false;
    this.first = data.first || false;
    this.text = data.text || '';
    this.title = data.title || '';
    this.previousPageId = data.previousPageId || null;
    this.totalCharacters = data.totalCharacters || this.text.length || 0;
    this.choiceTitle = data.choiceTitle || "";
    this.image = data.image || "";
  }

  // Static method to notify Story during operations on pages
  static async notifyStory(storyId) {
    await Story.updateStats(storyId);
  }

  // Method to save a new page to the database
  async save(storyId) {
    const pageData = {
      storyId:storyId,
      previousPageId: this.previousPageId || null,
      end: this.end,
      first: this.first,
      text: this.text,
      title: this.title,
      totalCharacters: this.text.length,
      image:this.image,
    };

    if(this.previousPageId != null){
      pageData['previousPageId'] = this.previousPageId;
    }

    try {
      let response;
      
      response = await fetch(`${API_URL}pages/${storyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(pageData),
      });
      

      if (!response.ok) {
        throw new Error(`Error saving page: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.page) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      this.id = data.page.id;
      await Page.notifyStory(storyId);
      return this.id;
    } catch (error) {
      console.error('Error saving page:', error);
      throw error;
    }
  }

  // Method to update a story in the database
  async update(storyId) {
    const pageData = {
      end: this.end,
      first: this.first,
      text: this.text,
      title: this.title,
      totalCharacters: this.text.length,
      image:this.image
    };
    
    if (!this.id) throw new Error('Cannot update page without an ID');
    try {
      const response = await fetch(`${API_URL}pages/page/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(pageData),
      });
      
      if (!response.ok) {
        throw new Error(`Error updapting up: ${response.statusText}`);
      }

      const data = await response.json();
      if(!data.page){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }
      await Page.notifyStory(storyId);
      return data.page.id
      
    } catch (error) {
        console.error('Error updating up:', error);
      //throw error;
    }
  }
  
  // Method to delete a page from the database
  async delete() {
    if (!this.id) throw new Error('Cannot delete page without an ID');

    try {
      const response = await fetch(`${API_URL}pages/page/${this.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error deleting page: ${response.statusText}`);
      }

      await Page.notifyStory(storyId);
      return data.deleted_count;
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }

  // Static method to fetch pages by storyId
  static async getPagesByStoryId(storyId) {
    try {
      const response = await fetch(`${API_URL}pages/${storyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error getting pages: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.pages) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      return data.pages.map(page => new Page(page));
    } catch (error) {
      console.error('Error getting pages:', error);
      throw error;
    }
  }

  // Static method to delete pages by storyId
  static async deletePagesByStoryId(storyId) {
    try {
      const response = await fetch(`${API_URL}pages/${storyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting pages: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.pages) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      return data.pages
    } catch (error) {
      console.error('Error getting pages:', error);
      throw error;
    }
  }
}

export default Page;
