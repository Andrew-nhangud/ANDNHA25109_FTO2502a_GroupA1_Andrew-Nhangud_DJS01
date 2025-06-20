// main.js

import { PodcastModal, handlePodcastCardClick } from "./podcastModal.js";
import { podcasts } from "./data.js"; // Import the podcasts data
import { getGenreTitles, formatDate } from "./utils.js"; // Import utility functions

// Initialize the modal
const podcastModal = new PodcastModal("podcastModal", "close-button");

// Function to create podcast cards
function createPodcastCards() {
  const podcastCardContainer = document.querySelector(".podcast-card");
  podcastCardContainer.innerHTML = ""; // Clear existing cards

  podcasts.forEach((podcast) => {
    const card = document.createElement("section");
    card.classList.add("innerPodcast-card");
    card.innerHTML = `
      <img src="${podcast.image}" alt="${podcast.title} podcast cover" />
      <div class="podcast-card-info">
        <h1>${podcast.title}</h1>
        <div class="podcast-categories">
          ${getGenreTitles(podcast.genres)
            .map((genre) => `<p class="podcast-categories-items">${genre}</p>`)
            .join("")}
        </div>
        <div class="podcast-meta">
          <p class="season-info">${podcast.seasons} Seasons</p>
          <p class="date">Last updated ${formatDate(podcast.updated)}</p>
        </div>
      </div>
    `;
    // Pass the podcasts array to the handlePodcastCardClick function
    card.addEventListener("click", () =>
      handlePodcastCardClick(card, podcastModal, podcasts)
    );
    podcastCardContainer.appendChild(card);
  });
}

// Call the function to create podcast cards
createPodcastCards();
