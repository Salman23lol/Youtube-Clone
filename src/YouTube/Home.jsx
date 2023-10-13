import React, { useEffect, useState } from "react";

function Home() {
  const [videos, setVideos] = useState([]); // State to store video data
  const [currentVideo, setCurrentVideo] = useState(null); // State to store the ID of the currently playing video

  // const apiKey = `AIzaSyB99aVRyaeU_LjrbR8oVrSRptBvxkXVzc4`; // Replace with your YouTube API key
  // const searchQuery = "random";

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAdix3Bit0QC0EVaCbNQYyfVZ0-Yhxex9k&part=snippet&q=bilal567&maxresults=100`;

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVideos(data.items); // Set the video data to the state
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    }
    fetchVideos();
  }, [apiUrl]);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  // Function to handle video card click
  function handleVideoClick(videoId) {
    setCurrentVideo(videoId);
  }

  return (
    <div className="bg-orange-400 auto">
      <div className="mx-auto w-full p-4 flex flex-wrap">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 md:p-2 lg:p-2"
            onClick={() => handleVideoClick(video.id.videoId)}
          >
            <div className="bg-red-500 text-center rounded shadow-md h-[300px]">
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover rounded-t-md img"
              />
              <div className="p-4">
                <h3 className="text-md md:text-xl font-semibold text-black title">
                  {truncateText(video.snippet.title, 40)}
                </h3>
                <p className="text-gray-900 text-xs dec">
                  {truncateText(video.snippet.description, 15)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentVideo && (
        <div className="fixed inset-0 bg-gray-700 z-50">
          <h1 className="text-xl text-white">Hello wolrd</h1>
          <div className="absolute inset-0 flex justify-center items-center">
            <iframe
              class="rounded"
              title="YouTube Video"
              width="50%"
              height="50%"
              src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&rel=0`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <button
            className="absolute top-4 right-4 text-white bg-red-500 px-1 py-1 rounded cursor-pointer"
            onClick={() => setCurrentVideo(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
