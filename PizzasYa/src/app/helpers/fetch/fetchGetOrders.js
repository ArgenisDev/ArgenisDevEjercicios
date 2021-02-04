import Config from 'react-native-config'

export async function fetchGetOrders () {
  try {
    const response = await fetch(`${Config.API_URL}orders`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  } catch (e) {
    return e
  }
}
