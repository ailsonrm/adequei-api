import axios from 'axios'

const ipLocationAPIUrl = 'https://ipapi.co/json'

export const getIpLocationData = async () => {
  return await axios.get(ipLocationAPIUrl)
    .then(
      resp => {
        const { ip, city, country, latitude, longitude, org } = resp.data
        const ipLocationData = {
          ip,
          city,
          region: resp.data.region_code,
          country,
          latitude,
          longitude,
          org
        }

        return ipLocationData
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
}
