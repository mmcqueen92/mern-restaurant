export default function Contact() {
  return (
    <div className="contact-us-page">
      <h1 className="contact-us-title">Contact Us</h1>
      <div className="contact-info">
        <p className="contact-address">Address: 1337 Burgers St.</p>
        <p className="contact-phone">
          Phone: <a href="tel:555-555-5555">555-555-5555</a>
        </p>
        <p className="contact-email">
          Email:{" "}
          <a href="mailto:burgerbunandbeyond@email.com">
            burgerbunandbeyond@email.com
          </a>
        </p>
      </div>
    </div>
  );
}
