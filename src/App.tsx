import "./App.css";
import { useFetch } from "./hooks";

const URL = "https://fakestoreapi.com/products";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function App() {
  const { data: products, loading, error } = useFetch<Product[]>(URL);

  if (loading) return <div>Cargando…</div>;
  if (error)   return <div>Ups! Hay un error: {error.message}</div>;

  return (
    <main
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        padding: 16,
      }}
    >
      {(products ?? []).map((p) => (
        <article
          key={p.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 12,
            display: "grid",
            gap: 8,
          }}
          title={p.title}
        >
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: 160,
              background: "#fafafa",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='160'>
                       <rect width='100%' height='100%' fill='#f3f4f6'/>
                       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='14'>Imagen no disponible</text>
                     </svg>`
                  );
              }}
            />
          </div>

          <h3 style={{ margin: "4px 0", fontSize: 14, fontWeight: 700 }}>
            {p.title}
          </h3>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <strong>{currency.format(p.price)}</strong>
            <small style={{ color: "#6b7280" }}>{p.category}</small>
          </div>

          {p.rating && (
            <small style={{ color: "#6b7280" }}>
              ⭐ {p.rating.rate} ({p.rating.count})
            </small>
          )}

          <p style={{ color: "#4b5563", fontSize: 13, margin: 0 }}>
            {p.description.length > 120
              ? p.description.slice(0, 120) + "…"
              : p.description}
          </p>
        </article>
      ))}
    </main>
  );
}

export default App;
