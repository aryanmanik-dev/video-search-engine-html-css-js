
let startIndex = 1; 
let currentPage = 1;

function handleRequest(response) {
  document.getElementById("dummy-content").style.display = "none";
  let contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  for (let i = 0; i < response.items.length; i++) {
    console.log("Response", response);

    let item = response.items[i];
    if (item.link) {
      let anchorElement = document.createElement("div");
      anchorElement.className = "card";
      anchorElement.innerHTML = `
          <img style='height: 211px;width: 376px;' src=${item.pagemap.cse_thumbnail[0].src}>
          <div class="card-content">
          <a style='text-decoration:none' href=${item.link} target="_blank">
          <h3 class="card-title" style='color:black'>${item.title}</h3>
          </a>

            <p class="card-description">${item.displayLink}</p>
          </div>
        `;

      let thumbnailImage = item.pagemap.cse_thumbnail[0].src;
      anchorElement.addEventListener("click", function (event) {
        event.preventDefault();
        openVideoModal(thumbnailImage, item.link, item.title);
      });

      anchorElement.href = item.link;
      anchorElement.target = "_blank";

      let titleElement = document.createElement("h3");
      anchorElement.appendChild(document.createElement("br"));
      anchorElement.appendChild(titleElement);

      contentDiv.appendChild(anchorElement);
    }
  }

  // Update start index and current page for next page
  startIndex = response.queries.nextPage[0].startIndex;
  currentPage++;


  if (currentPage > 1) {
    document.getElementById("back-button").style.display = "block";
  } else {
    document.getElementById("back-button").style.display = "none";
  }


}

function executeSearch(start) {
  startIndex = start || 1;
  let apiKey = "AIzaSyCNln4tV_D2Fwj5v1jiK68C49g6rO2mZ3g";
  let cx = "45a02e82e7dda4b0d";
  let searchInput = document.getElementById("search-input").value;
  let scriptElement = document.createElement("script");
  scriptElement.src = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchInput}&siteSearch=youtube.com&sort=date&start=${startIndex}&callback=handleRequest`;

  document.body.appendChild(scriptElement);
}

function nextPage() {
  executeSearch(startIndex);
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    startIndex -= 10; 
    executeSearch(startIndex);
  }
}

function openVideoModal(thumbnailImage, videoLink, videoTitle) {
  console.log(videoLink);
  let videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = `<img style='margin:0px auto' src=${thumbnailImage} alt="Video Thumbnail">`;
  document.getElementById("modal-title").textContent = videoTitle;

  var nextButton = document.getElementById("visitBtn");
  nextButton.addEventListener("click", function () {
    window.open(videoLink, "_blank");
    modal.style.display = "none";
    videoContainer.innerHTML = "";
  });

  let modal = document.getElementById("videoModal");
  let closeBtn = document.getElementsByClassName("close")[0];
  let closeBtn2 = document.getElementsByClassName("close2")[0];

  modal.style.display = "block";

  closeBtn.onclick = function () {
    modal.style.display = "none";
    videoContainer.innerHTML = "";
  };

  closeBtn2.onclick = function () {
    modal.style.display = "none";
    videoContainer.innerHTML = "";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      videoContainer.innerHTML = "";
    }
  };
}
