import React from 'react';
import { Link } from 'react-router-dom';

function Home({ username }) {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        {username ? (
          <h1 style={styles.title}>Welcome, {username} to TravelPlanner!!</h1>
        ) : (
          <h1 style={styles.title}>Explore the World with TravelPlanner</h1>
        )}
        <p style={styles.subtitle}>
          Plan your dream trip with ease. Create itineraries, discover destinations, and travel smarter.
        </p>
        <Link
          to="/itinerary"
          style={styles.ctaButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#78909C')} // Slightly darker on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = '#B2DFDB')}  // Original pale teal
        >
          Start Planning
        </Link>
      </section>

      {/* Rest of your sections remain unchanged */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why TravelPlanner?</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Custom Itineraries</h3>
            <p style={styles.featureText}>
              Build personalized travel itineraries tailored to your interests and schedule.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Explore Destinations</h3>
            <p style={styles.featureText}>
              Discover top spots and hidden gems with our curated recommendations.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Travel Smart</h3>
            <p style={styles.featureText}>
              Stay organized with all your trip details in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section style={styles.destinations}>
        <h2 style={styles.sectionTitle}>Popular Destinations</h2>
        <div style={styles.destinationGrid}>
          <div style={styles.destinationCard}>
            <h3 style={styles.destinationName}>Paris</h3>
            <p style={styles.destinationText}>The City of Lights awaits with romance and culture.</p>
          </div>
          <div style={styles.destinationCard}>
            <h3 style={styles.destinationName}>Tokyo</h3>
            <p style={styles.destinationText}>Experience vibrant city life and ancient traditions.</p>
          </div>
          <div style={styles.destinationCard}>
            <h3 style={styles.destinationName}>New York</h3>
            <p style={styles.destinationText}>The city that never sleeps, full of energy and diversity.</p>
          </div>
          <div style={styles.destinationCard}>
            <h3 style={styles.destinationName}>Sydney</h3>
            <p style={styles.destinationText}>Enjoy stunning beaches and iconic landmarks.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={styles.whyChooseUs}>
        <h2 style={styles.sectionTitle}>Why Choose Us</h2>
        <div style={styles.whyChooseGrid}>
          <div style={styles.whyChooseItem}>
            <h3 style={styles.whyChooseTitle}>User-Friendly Design</h3>
            <p style={styles.whyChooseText}>
              Intuitive tools make creating your itinerary a breeze, even for beginners.
            </p>
          </div>
          <div style={styles.whyChooseItem}>
            <h3 style={styles.whyChooseTitle}>24/7 Support</h3>
            <p style={styles.whyChooseText}>
              Our team is here to assist you anytime, anywhere.
            </p>
          </div>
          <div style={styles.whyChooseItem}>
            <h3 style={styles.whyChooseTitle}>Community-Driven</h3>
            <p style={styles.whyChooseText}>
              Join a network of travelers sharing tips and inspiration.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section style={styles.travelTips}>
        <h2 style={styles.sectionTitle}>Travel Tips</h2>
        <div style={styles.tipsGrid}>
          <div style={styles.tipCard}>
            <h3 style={styles.tipTitle}>Pack Light</h3>
            <p style={styles.tipText}>
              Bring only essentials to travel comfortably and save on baggage fees.
            </p>
          </div>
          <div style={styles.tipCard}>
            <h3 style={styles.tipTitle}>Book Early</h3>
            <p style={styles.tipText}>
              Secure better rates on flights and hotels by planning ahead.
            </p>
          </div>
          <div style={styles.tipCard}>
            <h3 style={styles.tipTitle}>Stay Flexible</h3>
            <p style={styles.tipText}>
              Leave room in your itinerary for spontaneous adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={styles.testimonials}>
        <h2 style={styles.sectionTitle}>What Travelers Say</h2>
        <div style={styles.testimonialGrid}>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>
              "TravelPlanner made my Europe trip seamless and unforgettable!"
            </p>
            <p style={styles.testimonialAuthor}>- Sarah M.</p>
          </div>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>
              "The itinerary feature saved me hours of planning. Highly recommend!"
            </p>
            <p style={styles.testimonialAuthor}>- James T.</p>
          </div>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>
              "A game-changer for organizing my family vacation!"
            </p>
            <p style={styles.testimonialAuthor}>- Emily R.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>TravelPlanner</h3>
            <p style={styles.footerText}>
              Your go-to platform for planning unforgettable journeys.
            </p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <Link
              to="/"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Home
            </Link>
            <Link
              to="/itinerary"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Itinerary
            </Link>
            <Link
              to="/login"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Login
            </Link>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Contact Us</h3>
            <p style={styles.footerText}>
              Email:{' '}
              <a
                href="mailto:tripplanner@gmail.com"
                style={styles.footerLink}
                onMouseOver={(e) => (e.target.style.color = '#78909C')}
                onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
              >
                tripplanner@gmail.com
              </a>
            </p>
            <p style={styles.footerText}>Phone: +1-800-TRAVEL (Demo)</p>
            <p style={styles.footerText}>Address: 123 Wanderlust Lane, Globe City</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Stay Connected</h3>
            <p style={styles.footerText}>Follow us on social media:</p>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Instagram
            </a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerText}>
            © {new Date().getFullYear()} TravelPlanner. All rights reserved.
          </p>
          <div style={styles.footerBottomLinks}>
            <Link
              to="/privacy"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#F5F7FA',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  hero: {
    backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '100px 20px',
    textAlign: 'center',
    color: '#FFFFFF', // Changed to white for all text in hero section
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', // Darker shadow for better contrast
    color: '#FFFFFF', // Explicitly set to white
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#FFFFFF', // Changed to white
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)', // Shadow for readability
  },
  ctaButton: {
    backgroundColor: '#B2DFDB', // Pale teal background
    color: '#FFFFFF', // Changed to white for button text
    padding: '10px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    display: 'inline-block',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)', // Slight shadow for button text
  },
  features: {
    padding: '50px 20px',
    backgroundColor: '#F5F7FA',
  },
  sectionTitle: {
    color: '#37474F',
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  featureGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  featureCard: {
    backgroundColor: '#F5F7FA',
    border: '1px solid #B2DFDB',
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  featureTitle: {
    color: '#37474F',
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
  },
  featureText: {
    color: '#37474F',
    fontSize: '1rem',
  },
  destinations: {
    padding: '50px 20px',
    backgroundColor: '#E0F2F1',
  },
  destinationGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  destinationCard: {
    backgroundColor: '#F5F7FA',
    border: '1px solid #B2DFDB',
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
  },
  destinationName: {
    color: '#37474F',
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  destinationText: {
    color: '#37474F',
    fontSize: '1rem',
  },
  whyChooseUs: {
    padding: '50px 20px',
    backgroundColor: '#F5F7FA',
  },
  whyChooseGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  whyChooseItem: {
    backgroundColor: '#F5F7FA',
    border: '1px solid #B2DFDB',
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
  },
  whyChooseTitle: {
    color: '#37474F',
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
  },
  whyChooseText: {
    color: '#37474F',
    fontSize: '1rem',
  },
  travelTips: {
    padding: '50px 20px',
    backgroundColor: '#E0F2F1',
  },
  tipsGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  tipCard: {
    backgroundColor: '#F5F7FA',
    border: '1px solid #B2DFDB',
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
  },
  tipTitle: {
    color: '#37474F',
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
  },
  tipText: {
    color: '#37474F',
    fontSize: '1rem',
  },
  testimonials: {
    padding: '50px 20px',
    backgroundColor: '#F5F7FA',
  },
  testimonialGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  testimonialCard: {
    backgroundColor: '#F5F7FA',
    border: '1px solid #B2DFDB',
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  testimonialText: {
    color: '#37474F',
    fontSize: '1rem',
    fontStyle: 'italic',
    marginBottom: '0.75rem',
  },
  testimonialAuthor: {
    color: '#37474F',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#607D8B',
    padding: '40px 20px',
    color: '#F5F7FA',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px',
  },
  footerSection: {
    textAlign: 'center',
    maxWidth: '300px',
  },
  footerTitle: {
    color: '#F5F7FA',
    fontSize: '1.25rem',
    marginBottom: '1rem',
  },
  footerText: {
    color: '#F5F7FA',
    fontSize: '0.9rem',
    margin: '0.5rem 0',
  },
  footerLink: {
    color: '#B2DFDB',
    textDecoration: 'none',
    display: 'block',
    margin: '0.5rem 0',
    transition: 'color 0.3s',
  },
  footerBottom: {
    textAlign: 'center',
    borderTop: '1px solid #B2DFDB',
    paddingTop: '20px',
  },
  footerBottomLinks: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
};

export default Home;