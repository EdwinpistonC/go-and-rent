import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./style.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "components/atom/Button";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export default function ImageEditor({ itemData, setItemData }) {
  const [image, setImage] = useState(defaultSrc);
  const [, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const fileInput = React.useRef();
  const [btnDisabled, setBtnDisabled] = useState(true);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setBtnDisabled(false);
  };

  const getCropData = (e) => {
    e.preventDefault();

    if (typeof cropper !== "undefined") {
      setItemData([
        ...itemData,
        cropper.getCroppedCanvas().toDataURL("image/png"),
      ]);

      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ImageList sx={{ width: "100%" }} cols={4}>
        {itemData.map((item, i) => (
          <ImageListItem key={i}>
            <img src={item} alt={i} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInput.current.click()}
          >
            Cargar Imagen
          </Button>

          <input
            ref={fileInput}
            type="file"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            style={{ float: "right" }}
            onClick={getCropData}
            disabled={btnDisabled}
          >
            Capturar Imagen
          </Button>
        </Grid>
        <Grid item alignItems="center" justifyContent="center" xs={12}>
          <Cropper
            zoomTo={0.1}
            style={{
              width: "40%",
            }}
            initialAspectRatio={1}
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
