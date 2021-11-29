import { sleep } from "k6";
import http from "k6/http";

import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

export const options = {};

export default function main() {
  let formData, response;

  // Request 1
  formData = new FormData();
  formData.boundary = "---boundary";
  formData.append("hello", "world");

  response = http.post("http://test.k6.io/value-pairs", formData.body(), {
    headers: {
      "content-type": "multipart/form-data; boundary=---boundary",
    },
  });

  // Request 2
  formData = new FormData();
  formData.boundary = "---boundary";
  formData.append("file", {
    data:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T",
    filename: "jpeg-quality-30.jpg",
    content_type: "image/jpeg",
  });

  response = http.post("http://test.k6.io/image", formData.body(), {
    headers: {
      "content-type": "multipart/form-data; boundary=---boundary",
    },
  });

  // Request 3
  formData = new FormData();
  formData.boundary = "---boundary";
  formData.append("hello", "`'\"world\"'`*!");

  response = http.post("http://test.k6.io/value-pairs-chars", formData.body(), {
    headers: {
      "content-type": "multipart/form-data; boundary=---boundary",
    },
  });

  // Request 4
  formData = new FormData();
  formData.boundary = "---boundary";
  formData.append("file", {
    data:
      "data:text/csv;base64,77u/ImZhciIsImhhcHBpbHkiLCJ3YXRjaCIsImNhcmVmdWxseSIsImdvdmVybm1lbnQiLCJzYX",
    filename: "random.csv",
    content_type: "text/csv",
  });

  response = http.post("http://test.k6.io/csv", formData.body(), {
    headers: {
      "content-type": "multipart/form-data; boundary=---boundary",
    },
  });

  // Request 5
  formData = new FormData();
  formData.boundary = "---boundary";
  formData.append("hello", "world");
  formData.append("hola", "amigo");
  formData.append("labas", "pasauli");

  response = http.post(
    "http://test.k6.io/multiple-value-pairs",
    formData.body(),
    {
      headers: {
        "content-type": "multipart/form-data; boundary=---boundary",
      },
    }
  );

  // Automatically added sleep
  sleep(1);
}
