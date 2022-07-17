import React, { useEffect, useState } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";

const Files = (props) => {
  
  const [file, setFile] = useState();
  const [filename, setFileName] = useState();
  const [buttonnmae, Setbuttonname] = useState("Submit");
  const [content, setContent] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [err, setErr] = useState("");
  const userName = localStorage.getItem("userName");
  const config = {
    accessKeyId: "AKIAQMSLV63XPT4SBO3L",
    secretAccessKey: "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",
  };
  const BucketName = "file-uploader-pramod";
  const target = { Bucket: BucketName, Key: filename, Body: file };

  const handleUpload = (e) => {
    console.log("file upload", e.target.files[0]);
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
    setErr("");
  };

  const handleSubmit = () => {
    if (!file) {
      setErr("Please Upload file first");
      return;
    }
    Setbuttonname("Uploading..");
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: "us-east-1", credentials: config }),
        leavePartsOnError: false,
        params: target,
      });
      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
        Setbuttonname("File Uploaded");
        FetchDetails();
        setToggle(true);
      });
      parallelUploads3.done();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchDetails();
  }, []);

  const FetchDetails = () => {
    AWS.config.update({ region: "us-east-1", credentials: config });
    var s3 = new AWS.S3({});
    var bucketParams = {
      Bucket: "file-uploader-pramod",
    };
    s3.listObjectsV2(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        setContent(data.Contents);
        setToggle(false);
        setFileName("");
        Setbuttonname("Submit");
      }
    });
  };

  AWS.config.update(config);

  const handleDownload = (value) => {
    console.log("handle download", value);
    const s3 = new AWS.S3();

    const params = {
      Bucket: BucketName,
      Key: `${value}`,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data.Body);
        let blob = data.Body;
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", value);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      }
    });
  };

  return (
    <div className="wrap">
      <div className="tab">
        {userName ? <h1>Hi {userName}</h1> : null}

        <h1>Welcome to File upload page </h1>
        <label for="file-upload" class="custom-file-upload">
          Upload File
        </label>
        <input onChange={handleUpload} id="file-upload" type="file" />
        <br />
        <div style={{ marginTop: "2%" }}>
          {" "}
          <span>{filename}</span>
        </div>

        <br />

        <button onClick={handleSubmit} className="submit">
          {buttonnmae}
        </button>
        {err ? (
          <div>
            <br></br>
            <span style={{ color: "red" }}>{err}</span>
          </div>
        ) : null}

        {toggle ? (
          <div>
            {" "}
            <br />{" "}
            <button className="submit" style={{ width: "600px" }}>
              Refreshing List
            </button>
          </div>
        ) : null}
        <div style={{ justifyContent: "start", marginTop: "10%" }}>
          {content.length===0 ? <h1>Loding...</h1>:null }
          {content && content.map((data, index) => {
            return (
              <div style={{ justifyContent: "start" }}>
                <button
                  onClick={() => {
                    handleDownload(data.Key);
                  }}
                  className="content"
                  style={{ background: "blue", margin: "10px" }}
                >
                  {" "}
                  Download File {index}{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Files;
