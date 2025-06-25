import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/businesses"; // your backend

const SourceFilter = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const counties = [...new Set(businesses.map((b) => b.county))];

  const locations =
    selectedCounty !== ""
      ? [...new Set(businesses.filter((b) => b.county === selectedCounty).map((b) => b.location))]
      : [];

  const filteredBusinesses = businesses.filter((b) => {
    const matchCounty = selectedCounty === "" || b.county === selectedCounty;
    const matchLocation = selectedLocation === "" || b.location === selectedLocation;
    return matchCounty && matchLocation;
  });

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Browse Businesses by County & Location</h2>

      {/* County filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          onClick={() => {
            setSelectedCounty("");
            setSelectedLocation("");
          }}
          className={`px-4 py-2 rounded-full ${
            selectedCounty === "" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          } hover:bg-blue-200 transition text-sm font-medium`}
        >
          All Counties
        </button>
        {counties.map((county, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedCounty(county);
              setSelectedLocation("");
            }}
            className={`px-4 py-2 rounded-full ${
              selectedCounty === county ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
            } hover:bg-blue-200 transition text-sm font-medium`}
          >
            {county}
          </button>
        ))}
      </div>

      {/* Location filter */}
      {selectedCounty && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setSelectedLocation("")}
            className={`px-4 py-2 rounded-full ${
              selectedLocation === "" ? "bg-green-600 text-white" : "bg-green-100 text-green-700"
            } hover:bg-green-200 transition text-sm font-medium`}
          >
            All Locations
          </button>
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => setSelectedLocation(location)}
              className={`px-4 py-2 rounded-full ${
                selectedLocation === location ? "bg-green-600 text-white" : "bg-green-100 text-green-700"
              } hover:bg-green-200 transition text-sm font-medium`}
            >
              {location}
            </button>
          ))}
        </div>
      )}

      {/* Business cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((biz, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={biz.image || "https://via.placeholder.com/400x200?text=Business"}
                alt={biz.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{biz.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{biz.county} - {biz.location}</p>
                <p className="text-gray-700 text-sm line-clamp-3">{biz.description}</p>
                {biz.url && (
                  <a
                    href={biz.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline mt-3 inline-block"
                  >
                    Visit Business
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No businesses found for this filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default SourceFilter;

