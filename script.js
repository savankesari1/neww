const API_KEY = "SG_a7d65d4311acd225";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
  try {
    image.src = "load.gif";
    
    const data = {
      prompt: inputTxt.value,
      aspect_ratio: "1:1"
    };

    const response = await fetch(
      "https://api.segmind.com/v1/luma-photon-flash-txt-2-img",
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}

if (button) {
  button.addEventListener('click', async function () {
    if (inputTxt.value.trim() === '') {
      alert('Please enter a prompt.');
      return;
    }

    try {
      const response = await query();
      const objectURL = URL.createObjectURL(response);

      if (image) {
        image.src = objectURL;
      } else {
        console.error("Image element not found");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert('Error generating image. Please try again.');
    }
  });
} else {
  console.error("Button element not found");
}