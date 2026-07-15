function Login() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
<div className="w-2/5 bg-slate-900 text-white flex flex-col justify-between p-10">

  {/* Logo */}
  <div>
    <h2 className="text-sm tracking-widest uppercase">
      DILIGENCE LEDGER
    </h2>
  </div>

  {/* Hero Text */}
  <div>
    <h1 className="text-5xl font-serif leading-tight">
      Every property tells a story.Verify it before you sign.
    </h1>

    <p className="mt-7 text-gray-300 text-sm leading-7 max-w-md">
      One address. Ownership, tax history, zoning,
      flood risks, permits and environmental records.
      Consolidated, secured and explainable.
    </p>
  </div>

  {/* Empty bottom space */}
  <div></div>

</div>
      
      {/* Right Section */}
      <div className="w-3/5 bg-stone-100"></div>
    </div>
  );
}

export default Login;