import { ButtonComponent } from "./ButtonComponent";


export default function Vistas({ treatments = [] }) { // Destructuring with default value
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Relajate y rejuvenecete en Spa SentirseBien
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover a tranquil oasis where you can indulge in a variety of
            rejuvenating treatments and services to nourish your mind, body, and
            soul.
          </p>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {treatments.map((treatment, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg">
              <img
                src={treatment.image}
                alt={treatment.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">{treatment.name}</h3>
                <p className="text-muted-foreground">{treatment.description}</p>
                <ButtonComponent size="sm">Conoce Mas</ButtonComponent>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
