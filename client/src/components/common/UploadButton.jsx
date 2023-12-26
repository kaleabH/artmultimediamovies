import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

function UploadButton() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8,  }}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <label htmlFor="upload-image">
          <Button variant="contained" component="span">
            Upload
          </Button>
          <input
            id="upload-image"
            hidden
            accept="video/*"
            type="file"
            onChange={handleFileUpload}
          />
        </label>
        {imageUrl && <img src={imageUrl} alt="Uploaded Image" height="300" />}
      </Stack>
    </Container>
  );
}

export default UploadButton;