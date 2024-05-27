import { API_URL } from '../configs/configBDD';
import { getToken } from '../helpers/authHelpers';

class Choice {
  constructor(data) {
    this.id = data.id || null;
    this.pageId = data.pageId || null;
    this.title = data.title || '';
    this.sendToPageId = data.sendToPageId || null;
  }

  // Method to save a new choice to the database
  async save(pageId) {
    const choiceData = {
      pageId: pageId,
      title: this.title,
      sendToPageId: this.sendToPageId,
    };

    try {
      let response;

      response = await fetch(`${API_URL}/choices/${pageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(choiceData),
      });

      if (!response.ok) {
        throw new Error(`Error saving choice: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choice) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      this.id = data.choice.id;
      return this.id;
    } catch (error) {
      console.error('Error saving choice:', error);
      throw error;
    }
  }

  // Method to update a choice in the database
  async update() {
    const choiceData = {
      title: this.title,
    };

    if (!this.id) throw new Error('Cannot update choice without an ID');
    try {
      const response = await fetch(`${API_URL}/choices/choice/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(choiceData),
      });

      if (!response.ok) {
        throw new Error(`Error updating choice: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choice) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      return data.choice
    } catch (error) {
      console.error('Error updating choice:', error);
      throw error;
    }
  }

  // Method to delete a choice from the database
  async delete() {
    if (!this.id) throw new Error('Cannot delete choice without an ID');

    try {
      const response = await fetch(`${API_URL}/choices/choice/${this.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error deleting choice: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting choice:', error);
      throw error;
    }
  }

  // Static method to fetch choices by pageId
  static async getChoicesByPageId(pageId) {
    try {
      const response = await fetch(`${API_URL}/choices/${pageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error getting choices: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choices) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      return data.choices.map(choice => new Choice(choice));
    } catch (error) {
      console.error('Error getting choices:', error);
      throw error;
    }
  }

  // Static method to fetch choices by sendToPageId
  static async getChoiceBySendToPageId(sendToPageId) {
    try {
      const response = await fetch(`${API_URL}/choice_send_to/${sendToPageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error getting choice: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choice) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      return data.choice
    } catch (error) {
      console.error('Error getting choices:', error);
      throw error;
    }
  }

  // Static method to delete choices by pageId
  static async deleteChoicesByPageId(pageId) {
    try {
      const response = await fetch(`${API_URL}/choices/${pageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting choices: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choices) {
        throw new Error(`Invalid Response Format: ${response.statusText}`);
      }

      return data.deleted_count;
    } catch (error) {
      console.error('Error deleting choices:', error);
      throw error;
    }
  }
}

export default Choice;
