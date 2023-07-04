export const fetchFromApi = async <T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<{
  data: Record<string, T>;
}> => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/${path}`, options);

  if (!response.ok) {
    throw new Error(`Could not fetch ${path}`);
  }

  return response.json();
};
