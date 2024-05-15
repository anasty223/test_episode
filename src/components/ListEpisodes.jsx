import React, { useEffect, useState } from "react";
import { useLazyGetAllEpisodesQuery } from "@/services/testTaskservices";
import { useSelector } from "react-redux";
import Image from "next/image";
import SortComponent from "./SortComponent";
import FilterComponent from "./FilterComponent";
import ModalComponent from "./ModalComponent";

function ListEpisodes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterParams, setFilterParams] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [trigger, { data, error, isLoading }] = useLazyGetAllEpisodesQuery();
  const testState = useSelector((state) => state.test);

  useEffect(() => {
    fetchData();
  }, [currentPage, sortOrder, filterParams]);

  const fetchData = () => {
    trigger({
      incomeData: {
        page: currentPage,
        order: sortOrder,
        ...filterParams,
      },
    })
      .unwrap()
      .then((response) => {
        setNextPageUrl(response.info.next);
        setPrevPageUrl(response.info.prev);
      });
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleFilterChange = (filter) => {
    setFilterParams(filter);
  };

  const numPages = Math.ceil(data?.info?.count / 20);

  const openModal = (episode) => {
    setSelectedEpisode(episode);
  };

  const closeModal = () => {
    setSelectedEpisode(null);
  };

  return (
    <div>
      <SortComponent onSort={handleSortChange} />
      <FilterComponent onFilter={handleFilterChange} />
      <div className="flex flex-wrap justify-center">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data &&
          data.results.map((episode) => (
            <div
              key={episode.id}
              className="max-w-sm bg-gray-800 text-white mx-4 my-8 rounded-lg overflow-hidden shadow-lg"
              style={{ maxWidth: "600px", maxHeight: "370px" }}
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
                    <img
                      className="max-w-none"
                      src={episode?.image}
                      alt="..."
                    />
                  </div>
                </div>
                <div className="text-left">
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white-900 hover:text-orange-900">
                        {episode.name}
                      </h2>{" "}
                      <div className="flex gap-2  items-center mt-2">
                        <span>
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              backgroundColor:
                                episode?.status === "Dead"
                                  ? "red"
                                  : episode?.status === "Alive"
                                  ? "green"
                                  : "gray",
                              borderRadius: "50%",
                            }}
                          ></div>
                        </span>
                        <h3 className="text-sm text-white-700 ">
                          {episode?.status}
                          {episode?.typ && <span>-{episode?.type}</span>}
                        </h3>
                      </div>
                      <p className="mt-2 text-l text-gray-500 hover:text-orange-700 font-normal">
                        Last known location:
                      </p>
                      <p className="mt-1 text-xl text-white-500 hover:text-orange-700 font-medium">
                        {episode?.location?.name}
                      </p>
                      <p className="mt-2 text-l text-gray-500 hover:text-orange-700 font-normal">
                        First seen in:
                      </p>
                      <p className="mt-1 text-xl text-white-500 hover:text-orange-700 font-medium">
                        {episode?.species}
                      </p>
                      <button
                        onClick={() => openModal(episode)}
                        className="mt-6"
                      >
                        More Info...
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={prevPage}
          disabled={!prevPageUrl}
          className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Prev
        </button>

        {currentPage > 2 && (
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md mx-2">
            ...
          </button>
        )}
        {Array.from({ length: numPages > 1 ? numPages : 0 }, (_, i) =>
          i + 1 === 1 ||
          i + 1 === numPages ||
          Math.abs(currentPage - (i + 1)) <= 1 ? (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 bg-gray-600 text-white rounded-md mx-2 ${
                currentPage === i + 1 ? "bg-blue-500" : ""
              }`}
            >
              {i + 1}
            </button>
          ) : null
        )}
        {currentPage < numPages - 1 && (
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md mx-2">
            ...
          </button>
        )}

        <button
          onClick={nextPage}
          disabled={!nextPageUrl}
          className="px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Next
        </button>
      </div>

      {selectedEpisode && (
        <ModalComponent episode={selectedEpisode} onClose={closeModal} />
      )}
    </div>
  );
}

export default ListEpisodes;
