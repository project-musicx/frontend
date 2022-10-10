import axios from "axios";

function ClientApi() {}
ClientApi.prototype = {
  logout: function () {
    axios
      .post("/api/auth/logout", { withCredentials: true })
      .then((response) => {});
  },
  checkLogin: function () {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/check-login", { withCredentials: true })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getPlayListTrack: function (id, token) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/my-playlist-track/${id}/${token}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  refreshToken: function () {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/refresh-token`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  connectToMusicsyncspace: function (id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/connect-to-musicsyncspace/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  retriveSongQueue: function (room) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/retrieve-this-room-queue/${room}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
