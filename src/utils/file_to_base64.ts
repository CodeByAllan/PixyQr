/**
 * Converts a file to a Base64-encoded string.
 * This function reads the provided file and returns its content as a Base64-encoded string.
 *
 * @param {File} file - The file to be converted to Base64.
 * @returns {Promise<string>} A Promise that resolves with the Base64-encoded string representing the file.
 * If an error occurs during the reading process, the Promise will be rejected with an Error.
 */
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Ensuring that the result is a string
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64'));
      }
    };
    reader.onerror = () => reject(new Error('Error occurred while reading the file')); // Reject with an Error object
    reader.readAsDataURL(file); // Converts the file to a Base64 string
  });
