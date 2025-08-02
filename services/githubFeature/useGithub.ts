// services/github.service.ts
import { useGenericQuery } from "../../lib/react-query";
import axiosInstance from "../../lib/axios";
import type { GithubRepo, GithubUser } from "../../types/github.types";
import type { ApiError } from "../../types/api-error.types";
import type { UseQueryResult } from "@tanstack/react-query";

interface GithubProfile {
  user: GithubUser;
  repos: GithubRepo[];
}

export const useGithubProfile = (
  username: string | null
): {
  data: GithubProfile | null;
  isLoading: boolean;
  error: ApiError | null;
} => {
  const { data, isLoading, error }: UseQueryResult<GithubProfile, ApiError> =
    useGenericQuery(
      ["githubProfile", username || ""],
      async () => {
        const [userRes, reposRes] = await Promise.all([
          axiosInstance.get<GithubUser>(`/users/${username}`),
          axiosInstance.get<GithubRepo[]>(`/users/${username}/repos`),
        ]);

        return {
          user: userRes.data,
          repos: reposRes.data,
        };
      },
      {
        queryKey: ["githubProfile", username || ""],
        enabled: Boolean(username),
        retry: false,
      }
    );

  return { data: data ?? null, isLoading, error };
};
