// Là je déclare des variables afin de cibler mes éléments, pour pouvoir les récuperer par la suite
document.addEventListener("DOMContentLoaded", () => {
  const articlesContainer = document.getElementById("span");
  const searchButton = document.getElementById("searchButton");
  const searchTermInput = document.getElementById("search_term");
  const resultsZone = document.getElementById("resultsZone");

  // Je crée une fonction asynchrone, pour pouvoir appeler mon API
  async function fetchArticles(url) {
    const response = await fetch(url); // j'attends les données
    const articles = await response.json(); // ici je récupère tous mes articles

    resultsZone.innerHTML = "";
    articles.forEach((article) => {
      // J'utilise une boucle afin de partcourir mles articles
      const date = new Date(article.published_at); // j'affiche la date de la publication de l'article
      const tags = article.tag_list.join(", "); //Je fais en sorte que la chaine de texte de mes tags soit correctement affichée avec des virgules pour séparer
      // Ici c'est mon bloc html (génératif) qui s'affichera lorsqu'on lancera une recherche,
      // avec les liens, les noms d'auteurs et toutes les infos des rticles recherchés
      const html = `
        <div>
          <a href="${article.url}" target="_blank">${article.title}</a><br>
          Auteur : ${article.user.name}<br>
          Date : ${date}<br>
          Tags : ${tags}
        </div><hr>
      `;
      resultsZone.innerHTML += html; // Ajoute tous les articles recherchés à ma page html
    });
  }

  // execute ce qu'il y a entre les curl braces lorsque l'on appuie sur le bouton
  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // évite le fait que la page se recharge

    const inputValue = searchTermInput.value.trim();
    articlesContainer.textContent = inputValue;
    resultsZone.style.display = "block";

    if (inputValue.length === 0) {
      resultsZone.innerHTML = "<p>Veuillez entrer un mot-clé.</p>";
      return;
    }

    const apiResult = `https://dev.to/api/articles?per_page=10&tag=${inputValue}`;
    fetchArticles(apiResult);
  });
});
