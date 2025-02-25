import { Button } from "primereact/button";

export default function HomePage() {
  function handleLogin() {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "lucicd@hotmail.com",
        password: "Secret!123",
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
        });
      } else {
        alert("Failed to login.");
      }
    });
  }

  return (
    <div className="card">
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">One-Stop Shop</span>
            <div className="text-6xl text-primary font-bold mb-3">
              for all your web development needs
            </div>
            <p className="mt-0 mb-4 text-700 line-height-3">
              I am a professional, full-stack web application developer
              excelling in crafting dynamic digital experiences using languages
              like HTML, CSS, and JavaScript, and libraries like React,
              Bootstrap, and Tailwind. My expertise extends to backend
              development for which I use .NET Core framework, ensuring
              applications are not only visually appealing but also efficient
              and secure.
            </p>

            <Button
              label="Learn More"
              type="button"
              className="mr-3 p-button-raised"
            />

            <Button
              label="Contact Me"
              type="button"
              className="mr-3 p-button-outlined"
            />

            <Button
              label="Login"
              onClick={handleLogin}
              type="button"
              className="p-button-outlined"
            />
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img
            src="hero-1.png"
            alt="Decorative Hero Image"
            className="responsive-hero-image"
          />
        </div>
      </div>
    </div>
  );
}
