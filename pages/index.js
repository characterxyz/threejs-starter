import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4">
      <Head>
        <title>Character.xyz's Three.js Starter Package</title>
        <meta
          name="description"
          content="A starter package for Three.js with character.xyz integration"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full text-center mt-8 mb-12">
        <h1 className="text-4xl font-bold text-white">
          {`character.xyz <> three.js`}
        </h1>
        <p className="text-2xl text-white">Starter Package</p>
      </header>

      <main className="flex-grow grid gap-4 items-start place-content-center px-8 max-w-screen-xl mx-auto lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {[
          "Playground 1",
          "Playground 2",
          "Playground 3",
          "Playground 4",
          "Playground 5",
          "Playground 6",
          "Playground 7",
          "Playground 8",
        ].map((playground, idx) => (
          <div key={idx} className="group w-64 h-72 flex flex-col">
            <a
              href={`./${playground.toLowerCase().replace(" ", "")}`}
              target="_blank"
              className="block h-full flex flex-col justify-center items-center p-6 border-4 border-yellow-400 rounded-lg shadow-md transition-transform bg-gradient-to-br from-red-500 via-purple-600 to-indigo-500 hover:opacity-75 transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400">
                {playground}
              </h2>
              <p>{playgroundDescriptions[idx]}</p>
            </a>
          </div>
        ))}
      </main>

      <footer className="mt-12 text-center">
        <a
          href="https://www.character.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
        >
          Powered by{" "}
          <span className="flex items-center justify-center">
            <Image
              src="https://www.character.xyz/_next/static/media/characterxyz.3c60088b.svg"
              alt="Character XYZ Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}

const playgroundDescriptions = [
  "Simplest Character.xyz's character integration + locomotion",
  "Playground 1 features + customizing controller for plug and play behavior modules",
  "Playground 2 features + third person follow camera",
  "Playground 3 features + AI Character Patrol",
  "Playground 3 features + custom input mappings",
  "Playground 5 features + configure visual styles",
  "Playground 6 features + Optimized multi character instances - stress testing",
  "Playground 7 features + Custom Character component + Sprite Text",
];
