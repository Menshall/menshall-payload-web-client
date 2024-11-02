interface fetchProps {
  url: string;
  body?: any;
  onBefore?: () => void;
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
  onFinally?: () => void;
}

export const fetchLocalEndpoint = async ({
  url,
  body,
  onBefore,
  onSuccess,
  onFailure,
  onFinally,
}: fetchProps) => {
  onBefore && onBefore();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept-Language": "uk-UA" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }
      onSuccess && onSuccess(res);
    })
    .catch((reason) => {
      onFailure && onFailure(reason);
    })
    .finally(() => {
      onFinally && onFinally();
    });
};
