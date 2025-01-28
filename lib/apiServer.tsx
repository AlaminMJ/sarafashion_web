import { cookies } from "next/headers";
import { api, ApiRequestOptions, ApiResponse } from "./api";

const serverApi = async <T, R>({
  method,
  url,
  body,
}: ApiRequestOptions<T>): Promise<ApiResponse<R | null>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return api({
    method,
    url,
    body,
    token,
  });
};

export { serverApi };
