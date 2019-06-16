import axios from "axios";

const serviceEndPoint = "https://svg-to-url-service.zillding.now.sh";

function sendReq(data) {
  return axios
    .post(serviceEndPoint, {
      data
    })
    .then(resp => resp.data)
    .catch(err => {
      throw new Error(err.response.data);
    });
}

export default sendReq;
