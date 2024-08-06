const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

const postData = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  if (!url.startsWith('http')) {
    url = SERVER + url;
  }

  const finalOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, finalOptions);
  if (!response.ok) {
    const errorData: {
      message: string;
    } = await response.json();
    throw new Error(`${response.status} : ${errorData.message}`);
  }

  const responseData: T = await response.json();
  return responseData;
};

export default postData;
