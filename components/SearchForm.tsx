import React, { useState } from "react";
import { Search, User, AlertCircle, Loader2, Github } from "lucide-react";
import type { ApiError } from "../types/api-error.types";

interface SearchFormProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
  error: ApiError | null;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isLoading = false,
  error,
}) => {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    onSearch(username.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-4 shadow-lg">
          <Github className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          GitHub User Search
        </h1>
        <p className="text-gray-600">
          Discover GitHub profiles and explore their repositories
        </p>
      </div>

      {/* Search Form */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`relative transition-all duration-300 ${
              isFocused ? "transform scale-105" : ""
            }`}
          >
            {/* Input Container */}
            <div
              className={`relative flex items-center bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                isFocused
                  ? "border-blue-500 shadow-blue-100 shadow-2xl"
                  : error
                  ? "border-red-300 shadow-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Search Icon */}
              <div className="absolute left-4 flex items-center">
                <Search
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isFocused ? "text-blue-500" : "text-gray-400"
                  }`}
                />
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter GitHub username..."
                className="flex-1 pl-12 pr-4 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                disabled={isLoading}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!username.trim() || isLoading}
                className={`m-2 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform ${
                  !username.trim() || isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </div>
                )}
              </button>
            </div>

            {/* Input hint */}
            <div className="absolute -bottom-6 left-4">
              <div
                className={`flex items-center space-x-1 text-xs transition-opacity duration-300 ${
                  isFocused && !username ? "opacity-100" : "opacity-0"
                }`}
              >
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400">
                  Try: octocat, torvalds, or gaearon
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8 flex flex-col items-center">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              Searching GitHub...
            </p>
            <p className="text-sm text-gray-500">This may take a moment</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg animate-in slide-in-from-left duration-300">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-semibold">
                  {error.status === 404 ? "User Not Found" : "Search Error"}
                </h3>
                <p className="text-red-700 text-sm mt-1">
                  {error.status === 404
                    ? `The user "${username}" doesn't exist on GitHub. Please check the username and try again.`
                    : `${error.message} (Status: ${error.status})`}
                </p>
                {error.status === 404 && (
                  <p className="text-red-600 text-xs mt-2">
                    💡 Tip: GitHub usernames are case-sensitive
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-4">
          Popular GitHub users to try:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["octocat", "torvalds", "gaearon", "sindresorhus", "addyosmani"].map(
            (user) => (
              <button
                key={user}
                onClick={() => {
                  setUsername(user);
                  onSearch(user);
                }}
                disabled={isLoading}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {user}
              </button>
            )
          )}
        </div>
      </div>

      {/* Features showcase */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">User Profiles</h3>
          <p className="text-sm text-gray-600">
            Explore detailed GitHub user information
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Github className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Repositories</h3>
          <p className="text-sm text-gray-600">
            Browse through user repositories
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Search className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Real-time Search</h3>
          <p className="text-sm text-gray-600">
            Instant results from GitHub API
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
