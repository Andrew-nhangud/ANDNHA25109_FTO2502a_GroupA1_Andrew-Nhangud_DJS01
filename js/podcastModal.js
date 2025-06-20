// podcastModal.js

import { getGenreTitles } from "./utils.js"; // Import the getGenreTitles function

/**
 * Class representing a Podcast Modal.
 */
class PodcastModal {
  constructor(modalId, closeButtonClass) {
    this.modal = document.getElementById(modalId);
    this.closeButton = document.querySelector(`.${closeButtonClass}`);
    this.init();
  }

  init() {
    this.closeButton.addEventListener("click", () => this.close());
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }

  open(podcastData) {
    this.populateModal(podcastData);
    this.modal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
  }

  populateModal(podcastData) {
    document.getElementById("modalTitle").innerText = podcastData.title;
    document.getElementById("modalImage").src = podcastData.image;
    document.getElementById("modalDescription").innerText =
      podcastData.description;
    document
      .getElementById("modalLastUpdated")
      .querySelector("span").innerText = this.formatDate(podcastData.updated);

    const genresContainer = document.getElementById("modalGenres");
    genresContainer.innerHTML = this.createGenresHTML(podcastData.genres); // Use the genre titles

    const seasonsContainer = document.getElementById("modalSeasons");
    if (Array.isArray(podcastData.seasons)) {
      seasonsContainer.innerHTML = this.createSeasonsHTML(podcastData.seasons);
    } else {
      seasonsContainer.innerHTML = `<p>${podcastData.seasons} Seasons</p>`; // Display the number of seasons
    }
  }

  createGenresHTML(genreIds) {
    const genreTitles = getGenreTitles(genreIds); // Get the genre titles
    return genreTitles
      .map((title) => `<span class="podcast-categories-items">${title}</span>`)
      .join("");
  }

  createSeasonsHTML(seasons) {
    return seasons
      .map((season) => `<p>${season.title} - ${season.episodes} episodes</p>`)
      .join("");
  }

  formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  }
}

// Function to handle podcast card clicks
function handlePodcastCardClick(card, podcastModal, podcasts) {
  const podcastTitle = card.querySelector("h1").innerText;

  // Find the podcast data based on the title
  const podcastData = podcasts.find(
    (podcast) => podcast.title === podcastTitle
  );

  if (podcastData) {
    podcastModal.open(podcastData);
  } else {
    console.error("Podcast data not found for title:", podcastTitle);
  }
}

// Export the PodcastModal class and handlePodcastCardClick function
export { PodcastModal, handlePodcastCardClick };
