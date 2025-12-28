import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white">

      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-32 -left-32 w-[380px] h-[380px] bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-36 -right-36 w-[420px] h-[420px] bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-5 backdrop-blur bg-white/10 border-b border-white/20">
        <h1 className="text-2xl font-extrabold tracking-wide">WorkFlowPro</h1>
        <div className="space-x-4">
          <button onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full bg-white text-purple-700 font-semibold hover:scale-105 transition">
            Login
          </button>
          <button onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-full border border-white hover:bg-white hover:text-purple-700 transition">
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 flex flex-col md:flex-row items-center px-10 py-28">
        <div className="md:w-1/2">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-sm">
            Smart Employee Work Management
          </span>

          <h2 className="text-6xl font-extrabold leading-tight mb-6">
            Manage Work.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
              Assign Smarter.
            </span><br />
            Track Progress.
          </h2>

          <p className="text-lg text-white/90 mb-10 max-w-xl">
            WorkFlowPro helps organizations manage tasks, teams, and productivity
            with role-based dashboards and real-time updates.
          </p>

          <div className="space-x-4">
            <button onClick={() => navigate("/register")}
              className="px-10 py-4 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:scale-105 transition">
              Get Started Free
            </button>
            <button onClick={() => navigate("/login")}
              className="px-10 py-4 border border-white rounded-full hover:bg-white hover:text-purple-700 transition">
              Login
            </button>
          </div>

          <div className="flex gap-6 mt-10 text-sm text-white/80">
            <span>✔ Secure</span>
            <span>✔ Role-Based</span>
            <span>✔ Real-Time</span>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mt-16 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Team Work"
            className="rounded-3xl shadow-2xl w-[460px]"
          />
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="relative z-10 bg-white py-16 text-gray-700">
        <p className="text-center uppercase tracking-widest text-sm mb-8">
          Trusted by growing teams
        </p>
        <div className="flex flex-wrap justify-center gap-10 font-bold text-xl">
          <span>StartupX</span>
          <span>CodeLabs</span>
          <span>TechNova</span>
          <span>Cloudify</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 bg-white text-gray-800 py-24 px-10">
        <h3 className="text-4xl font-extrabold text-center mb-16">
          Why Choose WorkFlowPro?
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          <Feature icon="📋" title="Task Management"
            desc="Create, assign, and manage work efficiently." />
          <Feature icon="📊" title="Live Tracking"
            desc="Track progress with real-time status updates." />
          <Feature icon="🔐" title="Role Security"
            desc="Admin, Manager & Employee role separation." />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-24 px-10">
        <h3 className="text-4xl font-extrabold text-center mb-16">
          What Teams Say
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          <Testimonial name="Project Manager"
            text="WorkFlowPro helped us organize tasks and meet deadlines easily." />
          <Testimonial name="Startup Founder"
            text="Simple, fast, and exactly what growing teams need." />
          <Testimonial name="Team Lead"
            text="Role-based access makes collaboration smooth and secure." />
        </div>
      </section>

      {/* PRICING */}
      <section className="relative z-10 bg-white text-gray-800 py-24 px-10">
        <h3 className="text-4xl font-extrabold text-center mb-16">
          Simple Pricing
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <PriceCard title="Free" price="₹0" desc="For students & small teams" />
          <PriceCard title="Pro" price="₹199/mo" desc="For growing teams" highlight />
          <PriceCard title="Enterprise" price="Custom" desc="For organizations" />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-24 px-10">
        <h3 className="text-4xl font-extrabold text-center mb-16">
          Frequently Asked Questions
        </h3>

        <div className="max-w-3xl mx-auto space-y-6">
          <FAQ q="Is WorkFlowPro free?" a="Yes, basic features are free forever." />
          <FAQ q="Is my data secure?" a="Yes, we use authentication and role-based access." />
          <FAQ q="Can managers assign tasks?" a="Yes, managers can assign and track tasks." />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-600 py-20 text-center">
        <h3 className="text-4xl font-extrabold mb-6">
          Start Using WorkFlowPro Today
        </h3>
        <button onClick={() => navigate("/register")}
          className="px-12 py-4 bg-white text-purple-700 font-bold rounded-full hover:scale-105 transition">
          Create Free Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-black/30 py-8 text-center text-sm text-white/80">
        © {new Date().getFullYear()} WorkFlowPro · Built with ❤️ by Gautam Yadav
      </footer>
    </div>
  );
}

/* COMPONENTS */

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-gray-100 p-8 rounded-2xl shadow hover:shadow-xl transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Testimonial({ name, text }) {
  return (
    <div className="bg-white/10 backdrop-blur p-8 rounded-2xl shadow-lg">
      <p className="italic mb-4">“{text}”</p>
      <h4 className="font-bold">— {name}</h4>
    </div>
  );
}

function PriceCard({ title, price, desc, highlight }) {
  return (
    <div className={`p-10 rounded-3xl shadow text-center ${highlight ? "bg-purple-600 text-white scale-105" : "bg-gray-100"}`}>
      <h4 className="text-2xl font-bold mb-2">{title}</h4>
      <p className="text-4xl font-extrabold mb-4">{price}</p>
      <p>{desc}</p>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <details className="bg-white/10 backdrop-blur p-6 rounded-xl cursor-pointer">
      <summary className="font-semibold text-lg">{q}</summary>
      <p className="mt-4 text-white/80">{a}</p>
    </details>
  );
}
