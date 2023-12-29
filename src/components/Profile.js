import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Image, Col, Container, Alert, Modal, Row } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import appStyles from "../App.module.css";

function Profile() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const imageFile = useRef();
  const [profileData, setProfileData] = useState({ name: "", image: "" });
  const { name, image } = profileData;
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id !== null) {
        try {
          const { data } = await axiosReq.get(`/profiles/${currentUser.profile_id}/`);
          setProfileData({ name: data.name, image: data.image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${currentUser.profile_id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      setShowModal(true);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.goBack();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          as="input"
          value={name}
          onChange={handleChange}
          name="name"
          className={appStyles.TextAlignLeft}
          aria-label="Name input"
        />
      </Form.Group>

      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}

      <Button className={`${appStyles.Button}`} type="submit">Save</Button>
      <Button className={`${appStyles.Button}`} onClick={() => history.goBack()}>Cancel</Button>
    </>
  );

  return (
    <Row className="justify-content-center">
      <Col className={`${appStyles.AutoMargin} py-2 p-0 p-lg-2`} lg={8}>
        <Form onSubmit={handleSubmit}>
          {showModal && (
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>Profile updated successfully!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              </Modal.Footer>
            </Modal>
          )}

          <div className={appStyles.Form}>
            <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
              <Container className={`${appStyles.Content} d-flex flex-column justify-content-center`}>
                <div className={`${appStyles.TextAlignCenter} ${appStyles.AutoMargin}`}>
                  <h1 className={appStyles.DarkText}>Edit Profile</h1>
                </div>
                <div className={appStyles.TextAlignCenter}>
                  <Form.Group>
                    {image && <figure><Image src={image} fluid aria-label="Profile image" /></figure>}
                    {errors?.image?.map((message, idx) => (
                      <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}

                    <Form.File 
                      id="image-upload" 
                      label="Profile Image" 
                      custom
                      ref={imageFile}
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <hr />
                    <div>{textFields}</div>
                  </Form.Group>
                </div>
              </Container>
            </Col>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Profile;
