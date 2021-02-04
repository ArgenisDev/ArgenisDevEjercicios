import Config from 'react-native-config'

export async function fetchCreateOrder (token, crust, flavor, size, numOrders) {
  try {
    const response = await fetch(`${Config.API_URL}orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Crust: crust,
        Flavor: flavor,
        Size: size,
        Table_No: numOrders + 1,
      }),
    })
    return response
  } catch (e) {
    return e
  }
}
