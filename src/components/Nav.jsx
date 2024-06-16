import logo from "../assets/img/svgexport-1.svg";

export default function Nav() {
  return (
    <nav className="flex fixed top-0  p-4  justify-start items-center gap-5  ">
      <img
        src={logo}
        alt="swap"
        className="h-10 w-10 object-cover rounded-full"
      />
      <h1 className="text-lg text-white font-semibold ">Swap</h1>
    </nav>
  );
}
