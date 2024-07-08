export async function addRecord(payload) {
  let response = await fetch("http://localhost:8000/testimonial", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();

  // when Real api used
  /* 
  let response = await fetch("http://localhost:8000/testimonial", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: payload,
  });
  return await response.json();
  */
}

export async function getRecord() {
  let response = await fetch("http://localhost:8000/testimonial", {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });
  return await response.json();
}

export async function updateRecord(payload) {
  let response = await fetch(
    "http://localhost:8000/testimonial/" + payload.id,
    {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
}

// when real api is used
/*let response = await fetch("http://localhost:8000/testimonial/" + payload.get.('id'), {
    method: "put",
    headers: {
      // authrization
    },
    body: payload,
  });
  return await response.json();
} */

export async function deleteRecord(payload) {
  let response = await fetch(
    "http://localhost:8000/testimonial/" + payload.id,
    {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return await response.json();
}
