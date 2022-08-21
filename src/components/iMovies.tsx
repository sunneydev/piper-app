import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import imoviesLogo from "../assets/imovies-logo.svg";
import SearchModal from "./SearchModal";
import useImovies from "../lib/hooks/useImovies";
import SeasonDropdown from "./SeasonDropdown";
import EpisodeDropdown from "./EpisodeDropdown";
import { Episode } from "../typings";

type MovieEpisode = {
  season: number;
  episode: Episode;
};

const IMovies: React.FC<{
  modal?: boolean;
  onEpisode: (episode: MovieEpisode) => void;
}> = ({ modal = false, onEpisode }) => {
  const [episode, setEpisode] = useState<Partial<MovieEpisode>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [movieId, setMovieId] = useState<string>();
  const movie = useImovies(movieId);

  useEffect(() => {
    if (episode?.episode && episode?.season) {
      onEpisode(episode as MovieEpisode);
    }
  }, [episode]);

  return (
    <div className="flex flex-row items-center gap-4">
      <SearchModal
        visible={modalVisible}
        onSelect={setMovieId}
        onClose={() => setModalVisible(false)}
      />
      <button
        onClick={() => setModalVisible(modal)}
        className="bg-[#009C7C] p-3 rounded-xl cursor-pointer outline-none"
      >
        <Image src={imoviesLogo} height="16px" />
      </button>
      {movie && (
        <>
          <SeasonDropdown
            seasons={movie}
            onSelect={(season) => setEpisode((prev) => ({ ...prev, season }))}
          />
          {episode?.season && movie[episode?.season - 1] && (
            <EpisodeDropdown
              episodes={movie[episode?.season - 1].episodes}
              onSelect={(episode) =>
                setEpisode((prev) => ({
                  ...prev,
                  episode,
                }))
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(IMovies);
