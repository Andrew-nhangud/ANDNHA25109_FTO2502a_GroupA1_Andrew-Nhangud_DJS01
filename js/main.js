import { PodcastModal, handlePodcastCardClick } from "./podcastModal.js";

// Initialize the modal
const podcastModal = new PodcastModal("podcastModal", "close-button");

// Attach click event listeners to podcast cards
const podcastCards = document.querySelectorAll(".innerPodcast-card");
podcastCards.forEach((card) => {
  card.addEventListener("click", () =>
    handlePodcastCardClick(card, podcastModal)
  );
});
