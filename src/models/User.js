import { API_URL } from '../configs/configBDD';

class User {
  constructor(data) {
    this.id = data.id || null;
    this.email = data.email || '';
    this.password = data.password || '';
    this.salt = data.salt|| '';
    this.token = data.token || null;
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.userName = data.userName || '';
  }

  // Method to sign up a new user
  static async signUp(userData) {
    try {
      const response = await fetch(`${API_URL}sign_up/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`Error signing up: ${response.statusText}`);
      }

      const data = await response.json();
      if(!data.user){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return new User(data.user); 
      
    } catch (error) {
        console.error('Error signing up:', error);
      //throw error;
    }
  }

  // Method to sign in a user
  static async signIn(userData) {
    try {
      const response = await fetch(`${API_URL}/sign_in/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error signing in: ${response.statusText}`);
      }


      const data = await response.json();
      if(!data.user){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return new User(data.user);

    } catch (error) {
      console.error('Error signing in:', error);
      //throw error;
    }
  }

  // Method to get all users
  static async getAllUsers() {
    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error getting all users: ${response.statusText}`);
      }

      const data = await response.json();
      if(!data.users){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return data.users.map(user => new User(user));
    } catch (error) {
      console.error('Error getting all users:', error);
      //throw error;
    }
  }

  // Method to get a user by ID
  static async getUserById(userId) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error getting user by ID: ${response.statusText}`);
      }

      const data = await response.json();
      if(!data.user){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      return new User(data.user);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      //throw error;
    }
  }

  // Method to update a user's information
  async update(userData) {
    try {
      const response = await fetch(`/users/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }

      if(!data.user){
        throw new Error(`Invalid Response Format Error: ${response.statusText}`);
      }

      const data = await response.json();
      Object.assign(this, data.user);
      return this;
    } catch (error) {
      console.error('Error updating user:', error);
      //throw error;
    }
  }

  // Method to delete a user
  async delete() {
    try {
      const response = await fetch(`/users/${this.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      //throw error;
    }
  }
}

export default User;
