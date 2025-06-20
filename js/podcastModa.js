// podcastModal.js

/**
 * Class representing a Podcast Modal.
 */
class PodcastModal {
  /**
   * Create a PodcastModal.
   * @param {string} modalId - The ID of the modal element.
   * @param {string} closeButtonClass - The class of the close button.
   */
  constructor(modalId, closeButtonClass) {
    this.modal = document.getElementById(modalId);
    this.closeButton = document.querySelector(`.${closeButtonClass}`);
    this.init();
  }

  /**
   * Initialize the modal by setting up event listeners.
   */
  init() {
    this.closeButton.addEventListener("click", () => this.close());
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }

  /**
   * Open the modal and populate it with podcast data.
   * @param {Object} podcastData - The data of the podcast to display.
   */
  open(podcastData) {
    this.populateModal(podcastData);
    this.modal.style.display = "block";
  }

  /**
   * Close the modal.
   */
  close() {
    this.modal.style.display = "none";
  }

  /**
   * Populate the modal with podcast data.
   * @param {Object} podcastData - The data of the podcast to display.
   */
  populateModal(podcastData) {
    document.getElementById("modalTitle").innerText = podcastData.title;
    document.getElementById("modalImage").src = podcastData.image;
    document.getElementById("modalDescription").innerText =
      podcastData.description;
    document
      .getElementById("modalLastUpdated")
      .querySelector("span").innerText = podcastData.lastUpdated;

    // Set genres
    const genresContainer = document.getElementById("modalGenres");
    genresContainer.innerHTML = this.createGenresHTML(podcastData.genres);

    // Set seasons
    const seasonsContainer = document.getElementById("modalSeasons");
    seasonsContainer.innerHTML = this.createSeasonsHTML(podcastData.seasons);
  }

  /**
   * Create HTML for genres.
   * @param {Array} genres - The list of genres.
   * @returns {string} The HTML string for genres.
   */
  createGenresHTML(genres) {
    return genres
      .map((genre) => `<span class="podcast-categories-items">${genre}</span>`)
      .join("");
  }

  /**
   * Create HTML for seasons.
   * @param {Array} seasons - The list of seasons.
   * @returns {string} The HTML string for seasons.
   */
  createSeasonsHTML(seasons) {
    return seasons
      .map((season) => `<p>${season.title} - ${season.episodes} episodes</p>`)
      .join("");
  }
}

// Function to handle podcast card clicks
/**
 * Handle podcast card click event.
 * @param {HTMLElement} card - The podcast card element.
 * @param {PodcastModal} podcastModal - The instance of the PodcastModal class.
 */
function handlePodcastCardClick(card, podcastModal) {
  const podcastData = {
    title: card.querySelector("h1").innerText,
    image: card.querySelector("img").src,
    description: "Detailed description of the podcast goes here.", // Replace with actual description
    genres: ["Science", "Education"], // Replace with actual genres
    lastUpdated: "7 November 2025", // Replace with actual date
    seasons: [
      { title: "Season 1", episodes: 10 },
      { title: "Season 2", episodes: 8 },
    ], // Replace with actual seasons
  };

  podcastModal.open(podcastData);
}

// Export the PodcastModal class and handlePodcastCardClick function
export { PodcastModal, handlePodcastCardClick };
