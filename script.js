// document.addEventListener("DOMContentLoaded", function () {
//   const videos = [
//     {
//       id: "QelN6Rhvg7E",
//       timestamps: [
//         { description: "new bookmark", timestamp: "00:00:26" },
//         { description: "new bookmark", timestamp: "00:00:51" },
//         { description: "new bookmark", timestamp: "00:01:01" },
//         // ... rest of the timestamps
//         { description: "new bookmark", timestamp: "00:10:13" },
//         { description: "new bookmark", timestamp: "00:10:33" },
//       ],
//       title: "Try not to laugh, impossible",
//     },
//   ];

//   const tableBody = document.querySelector("#timestampsTable tbody");
//   const modal = document.querySelector(".modal");
//   const modalTitle = document.querySelector("#modalTitle");
//   const modalTableBody = document.querySelector("#modalTable tbody");
//   const modalCloseBtn = document.querySelector(".close");
//   const jsonTextarea = document.querySelector("#jsonTextarea");
//   const populateBtn = document.querySelector("#populateBtn");
//   // Generate the video timestamps table
//   videos.forEach(function (video) {
//     const row = document.createElement("tr");
//     const titleCell = document.createElement("td");
//     const actionCell = document.createElement("td");
//     const toggleBtn = document.createElement("button");
//     const youtubeLink = document.createElement("a");
//     youtubeLink.href = `https://www.youtube.com/watch?v=${video.id}`;
//     youtubeLink.target = "_blank";
//     youtubeLink.textContent = video.title;
//     titleCell.appendChild(youtubeLink);

//     toggleBtn.textContent = "Show Timestamps";
//     toggleBtn.addEventListener("click", function () {
//       populateModal(video.title, video.timestamps);
//       modal.style.display = "block";
//     });

//     actionCell.appendChild(toggleBtn);
//     row.appendChild(titleCell);
//     row.appendChild(actionCell);
//     tableBody.appendChild(row);
//   });

//   // Populate the modal with timestamps
//   function populateModal(title, timestamps) {
//     modalTitle.textContent = title;
//     modalTableBody.innerHTML = "";

//     timestamps.forEach(function (timestamp) {
//       const row = document.createElement("tr");
//       const descriptionCell = document.createElement("td");
//       const timestampCell = document.createElement("td");

//       descriptionCell.textContent = timestamp.description;
//       timestampCell.textContent = timestamp.timestamp;

//       row.appendChild(descriptionCell);
//       row.appendChild(timestampCell);
//       modalTableBody.appendChild(row);
//     });
//   }

//   // Close the modal when the close button is clicked
//   modalCloseBtn.addEventListener("click", function () {
//     modal.style.display = "none";
//   });

//   // Close the modal when clicking outside the modal content
//   window.addEventListener("click", function (event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   });
// });

// populateBtn.addEventListener("click", function () {
//   const jsonData = jsonTextarea.value.trim();
//   if (jsonData) {
//     try {
//       const videos = JSON.parse(jsonData);
//       if (Array.isArray(videos)) {
//         tableBody.innerHTML = "";
//         videos.forEach(function (video) {
//           if (video.id && video.title && Array.isArray(video.timestamps)) {
//             const row = document.createElement("tr");
//             const titleCell = document.createElement("td");
//             const actionCell = document.createElement("td");
//             const toggleBtn = document.createElement("button");
//             const tooltip = document.createElement("span");
//             const tooltipText = document.createElement("span");

//             titleCell.classList.add("tooltip");
//             tooltipText.classList.add("tooltiptext");
//             tooltipText.textContent = video.title;
//             tooltip.appendChild(tooltipText);
//             titleCell.appendChild(document.createTextNode("Video Title"));
//             titleCell.appendChild(tooltip);

//             toggleBtn.textContent = "Show Timestamps";

//             toggleBtn.addEventListener("click", function () {
//               populateModal(video.title, video.timestamps);
//               modal.style.display = "block";
//             });

//             actionCell.appendChild(toggleBtn);
//             row.appendChild(titleCell);
//             row.appendChild(actionCell);
//             tableBody.appendChild(row);
//           }
//         });
//       } else {
//         alert("JSON data is not an array.");
//       }
//     } catch (error) {
//       alert("Invalid JSON data.");
//     }
//   } else {
//     alert("Please enter JSON data.");
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#timestampsTable tbody");
  const modal = document.querySelector(".modal");
  const modalTitle = document.querySelector("#modalTitle");
  const modalTableBody = document.querySelector("#modalTable tbody");
  const modalCloseBtn = document.querySelector(".close");
  const jsonTextarea = document.querySelector("#jsonTextarea");
  const populateBtn = document.querySelector("#populateBtn");

  populateBtn.addEventListener("click", function () {
    const jsonData = jsonTextarea.value.trim();
    if (jsonData) {
      try {
        const videos = JSON.parse(jsonData);
        if (Array.isArray(videos)) {
          tableBody.innerHTML = "";
          videos.forEach(function (video) {
            if (video.id && video.title && Array.isArray(video.timestamps)) {
              const row = document.createElement("tr");
              const titleCell = document.createElement("td");
              const actionCell = document.createElement("td");
              const toggleBtn = document.createElement("button");
              const youtubeLink = document.createElement("a");
              youtubeLink.href = `https://www.youtube.com/watch?v=${video.id}`;
              youtubeLink.target = "_blank";
              youtubeLink.textContent = video.title;
              titleCell.appendChild(youtubeLink);

              toggleBtn.textContent = "Show Timestamps";

              toggleBtn.addEventListener("click", function () {
                populateModal(video.title, video.timestamps);
                modal.style.display = "block";
              });

              actionCell.appendChild(toggleBtn);
              row.appendChild(titleCell);
              row.appendChild(actionCell);
              tableBody.appendChild(row);
            }
          });
          localStorage.setItem("videoData", jsonData);
          Toastify({
            text: "Populated table!",
            duration: 3000,
          }).showToast();
        } else {
          alert("JSON data is not an array.");
        }
      } catch (error) {
        // alert("Invalid JSON data.");
      }
    } else {
      alert("Please enter JSON data.");
    }
  });

  // Populate the modal with timestamps
  function populateModal(title, timestamps) {
    modalTitle.textContent = title;
    modalTableBody.innerHTML = "";

    timestamps.forEach(function (timestamp) {
      const row = document.createElement("tr");
      const descriptionCell = document.createElement("td");
      const timestampCell = document.createElement("td");

      descriptionCell.textContent = timestamp.description;
      timestampCell.textContent = timestamp.timestamp;

      row.appendChild(descriptionCell);
      row.appendChild(timestampCell);
      modalTableBody.appendChild(row);
    });
  }

  // Close the modal when the close button is clicked
  modalCloseBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // load saved data from local storage, click button
  const savedData = localStorage.getItem("videoData");
  if (savedData) {
    jsonTextarea.value = savedData;
    populateBtn.click();
  }
});
