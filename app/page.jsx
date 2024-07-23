import Link from "next/link";
function Homepage() {
  return (
    <div>
      <h1 className="text-3xl">Welcome </h1>
      <Link href="/properties">Show Property</Link>
    </div>
  );
}

export default Homepage;
