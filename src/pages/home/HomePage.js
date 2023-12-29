import React, { useState } from "react";
import { Card, Button, Row, Col, Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/HomePage.module.css";
import {
  useCurrentUser
} from "../../contexts/CurrentUserContext";

function ControlledCarousel() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.carouselImage}`}
          src="https://res.cloudinary.com/df8bd97ok/image/upload/ar_16:9,c_fill,g_auto,h_200,q_70,w_400/v1701808579/landing_1_hsqtnw.jpg"
          alt="First slide"
          loading="lazy"          
        />
        <Carousel.Caption className="custom-caption">
          <h3>Work</h3>
          <p>Boost your professional productivity with powerful task management tools. Stay organized, set priorities, and achieve your career goals efficiently.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.carouselImage}`}
          src="https://res.cloudinary.com/df8bd97ok/image/upload/t_Banner 16:9/v1703325843/64f043b633c0fb9f9feb577e_best-ai-productivity-tools_teszni.jpg" 
          alt="Second slide" 
          loading="lazy" 
        />
        <Carousel.Caption className="custom-caption">
          <h3>Study</h3>
          <p>Unlock your academic potential with our smart study tools. Manage your study sessions, track progress, and conquer your academic challenges with ease.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
           className={`d-block w-100 ${styles.carouselImage}`}
          src="https://res.cloudinary.com/df8bd97ok/image/upload/c_scale,h_235,w_600/v1701808769/landing_2_woi6xe.png"
          alt="Third slide"
          loading="lazy" 
          
        />
        <Carousel.Caption className="custom-caption">
          <h3>Fitness</h3>
          <p>
          Elevate your fitness journey with personalized workout plans and goal tracking. Achieve a healthier lifestyle, one step at a time, and embrace the power of a fit and active routine.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const Homepage = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <ControlledCarousel />
      <Row className={`text-center ${styles.HomepageBackground}`}>
      <Col sm={12}>
          <Container className={styles.HomepageBoxPos}>
            <Card className={styles.HomepageCard}>
              <Card.Body>
                <Card.Title>
                  <h1 className="mb-4">Welcome to Anto-Productivity-App!</h1>
                </Card.Title>
                <Card.Text className="font-weight-bold">
                  Enhance your productivity and manage your tasks efficiently.
                  <br />
                  Ready to take control of your time?
                </Card.Text>
              </Card.Body>
              {!currentUser && (
              <Card.Body>
                <Link to="/signin">
                  <Button className={`${appStyles.Button} mb-3`}>
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className={`${appStyles.Button} mb-3`}>
                    Sign up
                  </Button>
                </Link>
              </Card.Body>
              ) }
            </Card>
          </Container>
        </Col>
      </Row>
      <Container fluid className={styles.Footer}>
        <footer className="d-flex justify-content-between align-items-center py-3">
          <div className={styles.ContactInfo}>
            <p>Contact us: info@antoproductivity.com</p>
          </div>
          <div>
            <a
              href="https://twitter.com/yourprofile"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.facebook.com/yourprofile"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/yourprofile"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </footer>
      </Container>
    </>
  );
};

export default Homepage;