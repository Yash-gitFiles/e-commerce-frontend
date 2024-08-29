const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

async function cloudinaryImages(images) {
  const formData = new FormData();
  formData.append("file", images);
  formData.append("upload_preset", "eCommerce");

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });

  return dataResponse.json();
}

export default cloudinaryImages;
