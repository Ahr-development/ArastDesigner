

export function generateRandomStringwithWord(length = 6) {
    // Combine lowercase letters, uppercase letters, and numbers for a more secure mix
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
    }
  
    return randomString;
  }