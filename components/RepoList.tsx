import { useState } from "react";
import {
  Star,
  GitFork,
  Eye,
  Calendar,
  User,
  Globe,
  Lock,
  Unlock,
  AlertCircle,
  Loader2,
  ExternalLink,
  Code,
  BookOpen,
  Settings,
  Archive,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";
import type { GithubRepo } from "../types/github.types";
import type { ApiError } from "../types/api-error.types";

type Props = {
  repositories: GithubRepo[];
  isLoading: boolean;
  error: ApiError | null;
};

const RepoList = ({ repositories, isLoading, error }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortBy, setSortBy] = useState("updated");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-400",
      Python: "bg-blue-500",
      Java: "bg-red-500",
      TypeScript: "bg-blue-600",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      PHP: "bg-purple-500",
      Ruby: "bg-red-600",
      "C++": "bg-pink-500",
      C: "bg-gray-600",
      Swift: "bg-orange-500",
      Kotlin: "bg-purple-600",
      default: "bg-gray-400",
    };
    return colors[language] || colors.default;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  // Filter and sort repositories
  const filteredRepos = repositories
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage =
        !languageFilter || repo.language === languageFilter;
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "name":
          return a.name.localeCompare(b.name);
        case "updated":
        default:
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
      }
    });

  // Get unique languages for filter
  const uniqueLanguages = [
    ...new Set(repositories.map((repo) => repo.language).filter(Boolean)),
  ];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium text-lg">
            Loading repositories...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching data from GitHub API
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-semibold text-lg">
                Error Loading Repositories
              </h3>
              <p className="text-red-700 mt-1">
                {error.message} (Status: {error.status})
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No repositories found
          </h3>
          <p className="text-gray-500">
            This user doesn't have any public repositories yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Repositories</h1>
            <p className="text-gray-600">
              Explore and discover GitHub repositories ({repositories.length}{" "}
              total)
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Language Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Languages</option>
                {uniqueLanguages.map((lang) => (
                  <option key={lang} value={lang || ""}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Repository Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    className="w-10 h-10 rounded-full ring-2 ring-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1"
                        >
                          <span className="truncate">{repo.name}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                      </h2>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <User className="w-3 h-3" />
                      <span>{repo.owner.login}</span>
                      {repo.private ? (
                        <Lock className="w-3 h-3 text-red-500" />
                      ) : (
                        <Unlock className="w-3 h-3 text-green-500" />
                      )}
                      <span className="capitalize text-xs">
                        {repo.visibility}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  {repo.fork && (
                    <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                      Fork
                    </span>
                  )}
                  {repo.archived && (
                    <Archive className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </div>

              {/* Description */}
              {repo.description && (
                <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              )}

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium hover:bg-blue-100 cursor-pointer transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 5 && (
                    <span className="text-gray-500 text-xs px-2 py-1">
                      +{repo.topics.length - 5} more
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center space-x-4 mb-4 text-sm">
                <div className="flex items-center space-x-1 text-gray-600 hover:text-yellow-600 transition-colors">
                  <Star className="w-4 h-4" />
                  <span className="font-medium">
                    {formatNumber(repo.stargazers_count)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <GitFork className="w-4 h-4" />
                  <span className="font-medium">
                    {formatNumber(repo.forks_count)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">
                    {formatNumber(repo.watchers_count)}
                  </span>
                </div>
                {repo.open_issues_count > 0 && (
                  <div className="flex items-center space-x-1 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">
                      {repo.open_issues_count}
                    </span>
                  </div>
                )}
              </div>

              {/* Language and dates */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-3">
                  {repo.language && (
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getLanguageColor(
                          repo.language
                        )}`}
                      ></div>
                      <span className="font-medium">{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>
                </div>

                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>

              {/* Features */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  {repo.has_issues && (
                    <div className="flex items-center space-x-1 bg-gray-50 text-gray-600 px-2 py-1 rounded-md">
                      <AlertCircle className="w-3 h-3" />
                      <span>Issues</span>
                    </div>
                  )}
                  {repo.has_projects && (
                    <div className="flex items-center space-x-1 bg-gray-50 text-gray-600 px-2 py-1 rounded-md">
                      <Settings className="w-3 h-3" />
                      <span>Projects</span>
                    </div>
                  )}
                  {repo.has_wiki && (
                    <div className="flex items-center space-x-1 bg-gray-50 text-gray-600 px-2 py-1 rounded-md">
                      <BookOpen className="w-3 h-3" />
                      <span>Wiki</span>
                    </div>
                  )}
                  {repo.has_pages && (
                    <div className="flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-1 rounded-md">
                      <Globe className="w-3 h-3" />
                      <span>Pages</span>
                    </div>
                  )}
                </div>

                {repo.archived && (
                  <div className="flex items-center space-x-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs">
                    <Archive className="w-3 h-3" />
                    <span>Archived</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      {filteredRepos.length !== repositories.length && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Showing {filteredRepos.length} of {repositories.length} repositories
          </p>
        </div>
      )}

      {filteredRepos.length === 0 && repositories.length > 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No repositories match your filters
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default RepoList;
