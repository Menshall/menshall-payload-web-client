interface IFetchAltegio {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  userToken?: string;
  body?: any;
}

const USER_TOKEN = "b8dfee3983626fdd3b6861d4b8acf56a";

export const fetchAltegio = async (props: IFetchAltegio) => {
  const { url, method, body, userToken = USER_TOKEN } = props;
  const response = await fetch(`https://api.alteg.io/api/v1${url}`, {
    // method: method, // *GET, POST, PUT, DELETE, etc.
    method: method,
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer x9zgfare3njkfbtzmhgy, User ${userToken}`,
      Accept: "application/vnd.api.v2+json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (method === "DELETE" && response.ok) {
    return response.status;
  }

  const res = await response.json();

  const { success, data, meta } = res;

  if (response.ok) {
    return data;
  } else {
    throw new Error(meta.message);
  }
};
