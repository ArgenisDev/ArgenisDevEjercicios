import Config from 'react-native-config'

export async function fetchLogin (username, password) {
  try {
    const response = await fetch(`${Config.API_URL}auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password: password,
      }),
    })
    return response.json()
  } catch (e) {
    return e
  }
}
