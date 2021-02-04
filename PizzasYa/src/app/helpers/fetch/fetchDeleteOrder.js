import Config from 'react-native-config'

export async function fetchDeleteOrder (item) {
  try {
    const response = await fetch(`${Config.API_URL}orders/${item}`, {
      method: 'DELETE',
    })
    return response
  } catch {}
}
