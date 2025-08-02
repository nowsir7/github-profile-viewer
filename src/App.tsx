import "./App.css";
import { useState } from "react";
import SearchForm from "../components/SearchForm";
import GithubUserCard from "../components/GithubUserCard";
import RepoList from "../components/RepoList";
import { useGithubProfile } from "../services/githubFeature/useGithub";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useGithubProfile(searchQuery);
  const handleSearch = (username: string) => {
    setSearchQuery(username);
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          GitHub User Search
        </h1>
        <SearchForm
          onSearch={handleSearch}
          isLoading={isLoading}
          error={error}
        />
        {data && (
          <div>
            {data.user && <GithubUserCard user={data.user} />}
            {data.repos && (
              <RepoList
                repositories={data.repos}
                isLoading={isLoading}
                error={error}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
