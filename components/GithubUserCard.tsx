import React from "react";
import type { GithubUser } from "../types/github.types";

interface GithubUserCardProps {
  user: GithubUser;
}

const GithubUserCard: React.FC<GithubUserCardProps> = ({ user }) => {
  return (
    <div className="max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col items-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm"
        >
          @{user.login}
        </a>
        <p className="text-gray-600 text-center mt-2">{user.bio}</p>
        <div className="mt-4 flex justify-around w-full bg-gray-100 py-2 rounded-lg">
          <div className="text-center">
            <p className="font-bold">{user.followers}</p>
            <p className="text-xs text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.following}</p>
            <p className="text-xs text-gray-600">Following</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.public_repos}</p>
            <p className="text-xs text-gray-600">Repos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubUserCard;
