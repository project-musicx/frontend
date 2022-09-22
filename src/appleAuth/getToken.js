import axios from "axios";

async function getToken() {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("/api/appleMusicToken", { withCredentials: true })
        .then((response) => {
          resolve(response.data.token);
        });
    } catch (err) {
      reject(err);
    }
  });
}
export default getToken;
