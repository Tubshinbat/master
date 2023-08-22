import fetcher from "fetcher";
import base from "./base";
export const revalidate = 60;

export const getWebInfo = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/webinfo`);
    return { info: result.data };
  } catch (error) {
    return { error };
  }
};
