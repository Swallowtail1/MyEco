import LandingActions from "./LandingActions";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center relative overflow-hidden rounded-[40px] border border-green-400/20 bg-green-500/10 p-16">
        <div className="absolute inset-0 bg-green-400/5 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-6">
            Ready To Start Your Eco Journey?
          </h2>

          <p className="text-gray-300 mb-10 text-lg">
            Bergabunglah dengan MyEco hari ini dan buatlah perubahan bagi planet ini.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <LandingActions />
          </div>
        </div>
      </div>
    </section>
  );
}