import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./style.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "components/atom/Button";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import DemoImage from "./demo.jpg";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export default function ImageEditor({ itemData, setItemData }) {
  const [image, setImage] = useState(DemoImage);
  const [, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const fileInput = React.useRef();
  const [btnDisabled, setBtnDisabled] = useState(true);

  console.log(itemData);

  React.useEffect(() => {
    const getBase64Image = (url) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        console.log(dataURL);
        return dataURL;
      };
      img.src = url;
    };

    ///

    function getURLBase64(url) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          if (this.status === 200) {
            var blob = this.response;
            var fileReader = new FileReader();
            fileReader.onloadend = function (e) {
              var result = e.target.result;
              resolve(result);
            };
            fileReader.readAsDataURL(blob);
          }
        };
        xhr.onerror = function (e, msg) {
          reject(msg);
        };
        xhr.send();
      });
    }

    const cargarImagenes = async () => {
      if (itemData.length > 0) {
        let nuevasImagenes = [];
        await itemData.forEach(async (element) => {
          let url = process.env.REACT_APP_API_IMG + element.photo;
          console.log(url);
          console.log(getURLBase64(url));
          console.log(await getBase64Image(url));

          nuevasImagenes.push(await getBase64Image(url));
        });
        console.log(nuevasImagenes);
      }
    };
    cargarImagenes();
  }, []);
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
              width: "100%",
            }}
            initialAspectRatio={16 / 9}
            aspectRatio={16 / 9}
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
