<h1>Shopper is a Responsive E-commerce website designed for a clothing store.</h1>
Tech Stack - MERN Stack
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2-Column Image List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .image-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* 2 columns */
      gap: 16px; /* Space between items */
      padding: 16px;
    }

    .image-item {
      position: relative;
      overflow: hidden;
      border: 2px solid #ddd;
      border-radius: 8px;
    }

    .image-item img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .image-item:hover {
      border-color: #007BFF; /* Change border color on hover */
    }
  </style>
</head>
<body>
  <div class="image-list">
    <div class="image-item">
      <img src="https://drive.google.com/file/d/1onzmSqaHOvaek-ryKFh08qFf6wCpLlv-/view?usp=drive_link" alt="Image 1">
    </div>
    <div class="image-item">
      <img src="" alt="Image 2">
    </div>
    <div class="image-item">
      <img src="" alt="Image 3">
    </div>
    <div class="image-item">
      <img src="" alt="Image 4">
    </div>
    <div class="image-item">
      <img src="" alt="Image 5">
    </div>
    <div class="image-item">
      <img src="" alt="Image 6">
    </div>
    <div class="image-item">
      <img src="" alt="Image 7">
    </div>
  </div>
</body>
</html>
